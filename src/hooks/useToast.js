import { useState, useCallback } from 'react';

/**
 * Sistema de notificaciones interno.
 * Reemplaza todos los alert() y window.prompt() del proyecto original.
 *
 * Uso:
 *   const { toasts, showToast } = useToast();
 *   showToast('Guardado con éxito', 'success');
 *   showToast('Hubo un error', 'error');
 *
 * Renderiza <ToastContainer toasts={toasts} /> en App.jsx
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, showToast, dismissToast };
}
