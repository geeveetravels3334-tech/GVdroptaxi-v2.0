
import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

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
