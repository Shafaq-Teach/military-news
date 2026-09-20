import React, { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Tactical System Runtime Error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          dir="rtl"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#040d14',
            color: '#f0fdff',
            padding: '24px',
            fontFamily: 'sans-serif',
          }}
        >
          <div
            style={{
              maxWidth: '520px',
              width: '100%',
              backgroundColor: '#071722',
              border: '1px solid rgba(244, 63, 94, 0.5)',
              borderRadius: '16px',
              padding: '28px',
              textAlign: 'center',
              boxShadow: '0 0 30px rgba(244, 63, 94, 0.2)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'rgba(244, 63, 94, 0.15)',
                color: '#ff2a5f',
                fontSize: '28px',
                marginBottom: '16px',
              }}
            >
              ⚠
            </div>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#fff1f2',
                marginBottom: '12px',
              }}
            >
              ھەربىي سىستېمىدا تاسادىپىي كاشىلا كۆرۈلدى
            </h2>
            <p
              style={{
                fontSize: '13px',
                color: '#94a3b8',
                lineHeight: '1.6',
                marginBottom: '20px',
              }}
            >
              توركۆرگۈچ كونا كەش ياكى مەشغۇلات سەۋەبىدىن قوزغىلىشتا توختاپ قالدى.
              تۆۋەندىكى تۈگمىنى بېسىپ سىستېمىنى يېڭىلاپ قايتا قوزغىتىڭ.
            </p>
            {this.state.error && (
              <div
                dir="ltr"
                style={{
                  padding: '10px 14px',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: '#fda4af',
                  textAlign: 'left',
                  marginBottom: '20px',
                  overflowX: 'auto',
                }}
              >
                {this.state.error.message}
              </div>
            )}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={this.handleReset}
                style={{
                  padding: '10px 22px',
                  backgroundColor: '#00f2fe',
                  color: '#040d14',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 0 15px rgba(0, 242, 254, 0.4)',
                }}
              >
                قايتا يېڭىلاپ قوزغىتىش (Restart)
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
