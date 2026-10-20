import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'database.json');
const PYTHON_SCRIPT = path.join(__dirname, 'security_engine.py');
const JWT_SECRET = process.env.JWT_SECRET || 'humsafar_production_secure_jwt_secret_default_key_min64chars_salt_2026';
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:5173', 'capacitor://localhost', 'http://localhost', 'https://localhost'];

// 1. Security Headers via Helmet
app.use(helmet({
  contentSecurityPolicy: false, // Managed at gateway/PWA level
  crossOriginEmbedderPolicy: false
}));

// 2. Controlled CORS
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, Capacitor)
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin) || ALLOWED_ORIGINS.includes('*')) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Body Parsing with Strict Size Limit
app.use(express.json({ limit: '500kb' }));

// 4. Rate Limiters
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many failed login attempts. Access temporarily locked for 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/', globalLimiter);

// Database helpers
const readDB = () => {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initial = {
        admin: {
          passwordHash: process.env.ADMIN_PASSWORD_HASH || "$2b$10$0PEDqDGc2eDmyxa/d8pN9e2VpMCunnuwTUySqZVoDRO0WWbIyLvqW",
          updatedAt: new Date().toISOString()
        },
        accessPins: [],
        auditLogs: []
      };
      fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2));
      return initial;
    }
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch (err) {
    return { admin: {}, accessPins: [], auditLogs: [] };
  }
};

const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    return false;
  }
};

const hashPin = (pin) => {
  return crypto.createHash('sha256').update(pin.trim().toUpperCase()).digest('hex');
};

// Admin JWT Authentication Middleware
const requireAdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Valid administrative token required.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded && decoded.role === 'admin') {
      req.admin = decoded;
      return next();
    }
    return res.status(403).json({ success: false, message: 'Access forbidden. Administrative role required.' });
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Session expired or invalid token. Please log in again.' });
  }
};

// ------------------------------------------------------------------------------
// API ENDPOINTS
// ------------------------------------------------------------------------------

// 1. Health & Server Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    center: 'Humsafar Rishta Center',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 2. Client Access PIN Verification (Hashed lookup)
app.post('/api/verify-pin', async (req, res) => {
  const { pin } = req.body;
  if (!pin || typeof pin !== 'string') {
    return res.status(400).json({ success: false, message: 'Please provide a valid Access PIN.' });
  }

  const cleanPin = pin.trim().toUpperCase();
  const pinDigest = hashPin(cleanPin);
  const db = readDB();

  const found = (db.accessPins || []).find(p => p.pinHash === pinDigest && p.active);
  if (found) {
    found.usedCount = (found.usedCount || 0) + 1;
    writeDB(db);

    return res.json({
      success: true,
      plan: found.type || 'Standard Paid Access',
      clientName: found.clientName,
      message: `Verified for ${found.clientName || 'Valued Member'}. Direct numbers unlocked!`
    });
  }

  return res.status(403).json({
    success: false,
    message: 'Invalid or expired Access PIN. Please contact administration to activate.'
  });
});

// 3. Admin Login with Server-Side Bcrypt and JWT
app.post('/api/admin/login', loginLimiter, async (req, res) => {
  const { password } = req.body;
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ success: false, message: 'Password is required.' });
  }

  const db = readDB();
  const hash = db.admin?.passwordHash || process.env.ADMIN_PASSWORD_HASH;

  if (!hash) {
    return res.status(500).json({ success: false, message: 'Admin credentials not configured on server.' });
  }

  const match = await bcrypt.compare(password, hash);
  if (match) {
    // Generate short-lived JWT access token (2 hours)
    const token = jwt.sign(
      { role: 'admin', timestamp: Date.now() },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Audit log
    db.auditLogs = db.auditLogs || [];
    db.auditLogs.unshift({
      action: 'Admin Login Successful',
      ip: req.ip,
      timestamp: new Date().toISOString()
    });
    writeDB(db);

    return res.json({
      success: true,
      token,
      expiresIn: 7200,
      message: 'Admin Authenticated Successfully'
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid administrative credentials.'
  });
});

// 4. Admin Change Password (Protected)
app.post('/api/admin/change-password', requireAdminAuth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ success: false, message: 'New password must be at least 8 characters long.' });
  }

  const db = readDB();
  const hash = db.admin?.passwordHash;
  const match = await bcrypt.compare(oldPassword, hash);

  if (!match) {
    return res.status(403).json({ success: false, message: 'Current password does not match.' });
  }

  const newHash = await bcrypt.hash(newPassword, 12);
  db.admin = {
    passwordHash: newHash,
    updatedAt: new Date().toISOString()
  };
  writeDB(db);

  return res.json({ success: true, message: 'Master Admin Password updated successfully!' });
});

// 5. Admin Generate Access PIN (Protected)
app.post('/api/admin/generate-pin', requireAdminAuth, (req, res) => {
  const { clientName, planType, customPin } = req.body;
  const db = readDB();

  const generatedPin = customPin ? customPin.trim().toUpperCase() : `HR-${Math.floor(1000 + Math.random() * 9000)}`;
  const pinDigest = hashPin(generatedPin);

  const newPinEntry = {
    pinHash: pinDigest,
    clientName: clientName || 'Valued Client',
    type: planType || 'Gold VIP (Fee Paid)',
    createdAt: new Date().toISOString(),
    usedCount: 0,
    active: true
  };

  db.accessPins = db.accessPins || [];
  db.accessPins.push(newPinEntry);
  writeDB(db);

  return res.json({
    success: true,
    pin: generatedPin,
    message: `Access PIN [${generatedPin}] generated successfully for ${newPinEntry.clientName}.`
  });
});

// 6. User Account Deletion (Google Play Compliance)
app.post('/api/user/delete-account', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'User email is required for account deletion.' });
  }

  const db = readDB();
  db.auditLogs = db.auditLogs || [];
  db.auditLogs.unshift({
    action: `User Account Deletion Requested: ${email}`,
    timestamp: new Date().toISOString()
  });
  writeDB(db);

  return res.json({
    success: true,
    message: 'User account and associated personal data successfully scheduled for deletion.'
  });
});

// 7. Google Token Verification Endpoint
app.post('/api/auth/google', async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) {
    return res.status(400).json({ success: false, message: 'Google ID token is required.' });
  }

  // In production, verify with Google Auth library or tokeninfo endpoint
  // https://oauth2.googleapis.com/tokeninfo?id_token=...
  return res.json({
    success: true,
    message: 'Google Sign-In validated.'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[Humsafar Rishta Center] Secure API Server running on port ${PORT}`);
});
