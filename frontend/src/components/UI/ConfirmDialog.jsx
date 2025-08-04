// src/components/UI/ConfirmDialog.jsx
import React, { useEffect } from 'react';
import { RiErrorWarningLine, RiCheckLine, RiCloseLine } from 'react-icons/ri';
import './ConfirmDialog.css';

const ConfirmDialog = ({
  title = 'Confirmar ação',
  message = 'Tem certeza que deseja continuar?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  type = 'default', // 'default', 'danger', 'warning', 'success'
  loading = false,
  closeOnOverlayClick = true
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && onCancel) {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  useEffect(() => {
    // Prevent body scroll when dialog is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick && onCancel) {
      onCancel();
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <RiErrorWarningLine className="confirm-dialog__icon--danger" />;
      case 'warning':
        return <RiErrorWarningLine className="confirm-dialog__icon--warning" />;
      case 'success':
        return <RiCheckLine className="confirm-dialog__icon--success" />;
      default:
        return <RiErrorWarningLine className="confirm-dialog__icon--default" />;
    }
  };

  const getConfirmButtonClass = () => {
    switch (type) {
      case 'danger':
        return 'btn btn--danger';
      case 'warning':
        return 'btn btn--warning';
      case 'success':
        return 'btn btn--success';
      default:
        return 'btn btn--primary';
    }
  };

  return (
    <div 
      className="confirm-dialog__overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
    >
      <div className="confirm-dialog">
        <div className="confirm-dialog__header">
          <div className="confirm-dialog__icon">
            {getIcon()}
          </div>
          <button
            className="confirm-dialog__close"
            onClick={onCancel}
            aria-label="Fechar dialog"
            disabled={loading}
          >
            <RiCloseLine />
          </button>
        </div>

        <div className="confirm-dialog__content">
          <h2 id="confirm-dialog-title" className="confirm-dialog__title">
            {title}
          </h2>
          <p id="confirm-dialog-message" className="confirm-dialog__message">
            {message}
          </p>
        </div>

        <div className="confirm-dialog__actions">
          <button
            className="btn btn--secondary"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            className={`${getConfirmButtonClass()} ${loading ? 'btn--loading' : ''}`}
            onClick={onConfirm}
            disabled={loading}
            autoFocus
          >
            {!loading && confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;