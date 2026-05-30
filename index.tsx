
import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Intercept and suppress annoying Google Maps Billing or Auth warning alert boxes and console errors
if (typeof window !== 'undefined') {
  const originalAlert = window.alert;
  window.alert = function (message) {
    const msg = String(message || '');
    if (
      msg.includes('Google Maps') || 
      msg.includes('BillingNotEnabledMapError') || 
      msg.includes('billing') || 
      msg.includes('Google Cloud Project') ||
      msg.includes('Places API error') ||
      msg.includes('ApiNotActivatedMapError')
    ) {
      console.warn("Intercepted and suppressed Google Maps billing/key warning alert window:", message);
      return;
    }
    return originalAlert.apply(this, arguments as any);
  };

  const originalConsoleError = console.error;
  console.error = function (...args) {
    const errorString = args.map(arg => String(arg)).join(' ');
    if (
      errorString.includes('BillingNotEnabledMapError') ||
      errorString.includes('billing') ||
      errorString.includes('gmp-get-started') ||
      errorString.includes('Places API error') ||
      errorString.includes('ApiNotActivatedMapError')
    ) {
      (window as any).__gm_auth_failed = true;
      console.warn("Google Maps API activation or billing issue detected. Local search fallback activated.", errorString);
      return;
    }
    return originalConsoleError.apply(console, args);
  };

  // Pre-emptively register gm_authFailure to gracefully fall back
  (window as any).gm_authFailure = () => {
    console.warn("Google Maps Auth/Billing Failure hook called. Silent fallback initiated.");
    (window as any).__gm_auth_failed = true;
  };

  // Handle window level errors from Google Maps SDK scripts
  window.addEventListener('error', (event) => {
    const msg = String(event.message || '');
    if (msg.includes('Google Maps') || msg.includes('BillingNotEnabledMapError') || msg.includes('Places API error') || msg.includes('billing')) {
      (window as any).__gm_auth_failed = true;
      event.preventDefault(); // Silences default browser error reporting
      console.warn("Suppressing external Google Maps script error safely:", msg);
    }
  }, true);

  // Handle unhandled Promise rejections from dynamic module load failures
  window.addEventListener('unhandledrejection', (event) => {
    const reason = String(event.reason || '');
    if (reason.includes('Google Maps') || reason.includes('BillingNotEnabledMapError') || reason.includes('Places API error') || reason.includes('billing')) {
      (window as any).__gm_auth_failed = true;
      event.preventDefault(); // Prevents trace dump in test environments
      console.warn("Suppressing dynamic Google Maps loader rejection safely:", reason);
    }
  });
}

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'white', backgroundColor: '#020408', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h1 style={{ color: '#C5A059', fontSize: '3rem', fontWeight: '900', letterSpacing: '-0.05em' }}>SYSTEM HALT.</h1>
          <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '20px 0' }}>{this.state.error?.message}</p>
          <pre style={{ textAlign: 'left', backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', maxWidth: '80%', overflow: 'auto', fontSize: '10px', color: '#64748b', border: '1px solid rgba(255,255,255,0.05)' }}>
            {this.state.error?.stack}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: '40px', padding: '15px 40px', backgroundColor: '#C5A059', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', letterSpacing: '0.2em' }}>RE-INITIALIZE PROTOCOL</button>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
