import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Humsafar App Critical Error:", error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('humsafar_client_user');
    } catch (e) {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
          backgroundColor: '#047857',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          direction: 'rtl'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>
            ہمسفر رشتہ سینٹر
          </h2>
          <p style={{ fontSize: '16px', marginBottom: '20px', maxWidth: '400px' }}>
            ایپ لوڈ کرنے کے دوران عارضی مسئلہ پیش آیا ہے۔ دوبارہ لوڈ کرنے کے لیے نیچے بٹن دبائیں۔
          </p>
          <button
            onClick={this.handleReset}
            style={{
              backgroundColor: '#ffffff',
              color: '#047857',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '9999px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ایپ ری سیٹ اور ری لوڈ کریں
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </React.StrictMode>,
)

// Register PWA Service Worker for Mobile App Installation
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('Humsafar PWA Service Worker registered:', reg.scope))
      .catch((err) => console.log('Humsafar PWA Service Worker registration failed:', err));
  });
}
