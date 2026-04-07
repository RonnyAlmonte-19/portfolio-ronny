import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

/**
 * Renderiza las notificaciones flotantes en la esquina inferior derecha.
 * Props recibidas de useToast().
 */
export const ToastContainer = ({ toasts, dismissToast }) => (
  <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
    <AnimatePresence>
      {toasts.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 60, scale: 0.9 }}
          className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl
            border shadow-2xl backdrop-blur-md max-w-xs
            ${t.type === 'error'
              ? 'bg-red-950/80 border-red-500/30 text-red-300'
              : 'bg-[#111]/90 border-indigo-500/30 text-white'
            }`}
        >
          {t.type === 'error'
            ? <XCircle size={18} className="text-red-400 shrink-0" />
            : <CheckCircle size={18} className="text-indigo-400 shrink-0" />
          }
          <span className="text-sm flex-1">{t.message}</span>
          <button
            onClick={() => dismissToast(t.id)}
            className="text-gray-500 hover:text-white ml-1"
          >
            <X size={14} />
          </button>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);
