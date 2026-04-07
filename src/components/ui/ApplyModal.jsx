import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react'; // Añadí Info para un toque visual

export const ApplyModal = ({ isOpen, onClose, job, onSubmit }) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(message);
    setIsSubmitting(false);
    setMessage(''); // Limpiamos el campo
    onClose();      // Cerramos el modal
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl"
        >
          {/* Cabecera */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-gray-900">Detalles y Propuesta</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition-colors">
              <X size={24} />
            </button>
          </div>
          
          {/* Información Básica */}
          <div className="bg-indigo-50 p-4 rounded-lg mb-4 border border-indigo-100 text-left">
            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">Empresa / Proyecto</p>
            <p className="font-bold text-gray-900 text-lg leading-tight">{job?.title}</p>
            <p className="text-sm text-indigo-600 font-medium">{job?.companyName}</p>
          </div>

          {/* ── NUEVA SECCIÓN: ANUNCIO COMPLETO ── */}
          <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100 max-h-48 overflow-y-auto text-left">
            <div className="flex items-center gap-2 mb-2">
              <Info size={14} className="text-gray-400" />
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Descripción detallada</h4>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {job?.description}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6 text-left">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Tu propuesta para la empresa
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none shadow-sm"
                placeholder="Cuéntales por qué eres el ideal, menciona tu equipo o adjunta links a trabajos similares..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <button 
                type="button"
                onClick={onClose}
                className="w-1/3 px-4 py-3 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cerrar
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-2/3 bg-black text-white px-4 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all flex justify-center items-center disabled:opacity-70 active:scale-[0.98] shadow-lg shadow-black/10"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};