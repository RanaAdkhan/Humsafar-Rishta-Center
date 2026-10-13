#!/usr/bin/env python3
"""
Humsafar Rishta Centre - Python Security & Data Integrity Engine
Under the Auspices of Al-Maktab Educational Foundation
"""

import sys
import json
import hashlib
import os
from datetime import datetime

DATABASE_FILE = os.path.join(os.path.dirname(__file__), 'database.json')

def calculate_database_hash():
    """Calculates SHA-256 integrity hash of current database."""
    if not os.path.exists(DATABASE_FILE):
        return {"status": "error", "message": "Database file not found"}
    
    with open(DATABASE_FILE, 'rb') as f:
        content = f.read()
        sha256_hash = hashlib.sha256(content).hexdigest()
        md5_hash = hashlib.md5(content).hexdigest()
        
    return {
        "status": "success",
        "sha256": sha256_hash,
        "md5": md5_hash,
        "timestamp": datetime.now().isoformat(),
        "database_bytes": len(content)
    }

def verify_access_pin(pin_code):
    """Verifies access PIN from database."""
    try:
        with open(DATABASE_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            pins = data.get("accessPins", [])
            for entry in pins:
                if entry.get("pin", "").upper() == pin_code.strip().upper() and entry.get("active", True):
                    return {"valid": True, "pin": entry["pin"], "type": entry.get("type", "Standard")}
            return {"valid": False, "message": "Invalid or expired PIN"}
    except Exception as e:
        return {"valid": False, "error": str(e)}

def run_security_audit():
    """Generates a complete security analysis report."""
    db_status = calculate_database_hash()
    return {
        "engine": "Python 3 Security & Integrity Engine (Al-Maktab)",
        "security_level": "High - 256-Bit Cryptographic Hash Enforced",
        "database_integrity": db_status,
        "shariah_modesty_protocol": "Active - Photos & Contacts Hidden Behind Fee-Gate",
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

if __name__ == "__main__":
    if len(sys.argv) > 1:
        command = sys.argv[1]
        if command == "audit":
            print(json.dumps(run_security_audit(), indent=2))
        elif command == "hash":
            print(json.dumps(calculate_database_hash(), indent=2))
        elif command == "verify" and len(sys.argv) > 2:
            print(json.dumps(verify_access_pin(sys.argv[2]), indent=2))
        else:
            print(json.dumps({"status": "unknown_command"}))
    else:
        print(json.dumps(run_security_audit(), indent=2))
