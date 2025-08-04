// src/components/ErrorBoundary/ErrorBoundary.jsx
import React from 'react';
import { RiErrorWarningLine, RiRefreshLine } from 'react-icons/ri';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error para monitoramento (se disponível)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Aqui você pode enviar o erro para um serviço de monitoramento
    // como Sentry, LogRocket, etc.
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__container">
            <div className="error-boundary__icon">
              <RiErrorWarningLine />
            </div>
            
            <h1 className="error-boundary__title">
              Ops! Algo deu errado
            </h1>
            
            <p className="error-boundary__message">
              Ocorreu um erro inesperado na aplicação. Nosso time foi notificado 
              e está trabalhando para resolver o problema.
            </p>

            <div className="error-boundary__actions">
              <button 
                className="btn btn--primary"
                onClick={this.handleReload}
              >
                <RiRefreshLine />
                Recarregar Página
              </button>
              
              <button 
                className="btn btn--secondary"
                onClick={this.handleReset}
              >
                Tentar Novamente
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="error-boundary__details">
                <summary>Detalhes do erro (desenvolvimento)</summary>
                <div className="error-boundary__error-info">
                  <h3>Error:</h3>
                  <pre>{this.state.error && this.state.error.toString()}</pre>
                  
                  <h3>Stack Trace:</h3>
                  <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;