import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Camera, Image } from 'lucide-react';
import { Button, Input } from './index';
 
/**
 * Modal para añadir un proyecto al portafolio.
 * Permite subir imagen desde el dispositivo (galería/PC) o pegar una URL.
 */
export const AddProjectModal = ({ onConfirm, onClose }) => {
  const [title, setTitle]         = useState('');
  const [imageUrl, setImageUrl]   = useState('');
  const [preview, setPreview]     = useState(null);
  const [useFile, setUseFile]     = useState(true);
  const fileInputRef              = useRef(null);
 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
 
    if (file.size > 2 * 1024 * 1024) {
      alert('La imagen es muy pesada. Máximo 2MB.');
      return;
    }
 
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setImageUrl('');
    };
    reader.readAsDataURL(file);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const finalImage = preview || imageUrl.trim() || null;
    onConfirm({ title: title.trim(), imageUrl: finalImage });
    onClose();
  };
 
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
          <X size={20} />
        </button>
 
        <h2 className="text-2xl font-bold text-white mb-6">Nuevo proyecto</h2>
 
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Título */}
          <Input
            label="Título del proyecto"
            placeholder="Ej: Campaña Nike 2024"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
 
          {/* Selector de método */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setUseFile(true)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                useFile ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              Subir desde dispositivo
            </button>
            <button
              type="button"
              onClick={() => setUseFile(false)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                !useFile ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              Pegar URL
            </button>
          </div>
 
          {/* Subir desde dispositivo */}
          {useFile && (
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    className="w-full h-48 object-cover rounded-xl"
                    alt="preview"
                  />
                  <button
                    type="button"
                    onClick={() => { setPreview(null); fileInputRef.current.value = ''; }}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="w-full h-48 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-indigo-500 transition-colors"
                >
                  <Camera size={32} className="text-gray-600" />
                  <p className="text-gray-500 text-sm">Clic para seleccionar imagen</p>
                  <p className="text-gray-600 text-xs">JPG, PNG, WEBP — máx 2MB</p>
                </div>
              )}
            </div>
          )}
 
          {/* Pegar URL */}
          {!useFile && (
            <div className="space-y-3">
              <Input
                label="URL de imagen"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  className="w-full h-40 object-cover rounded-xl"
                  alt="preview"
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
            </div>
          )}
 
          <Button
            type="submit"
            className="w-full mt-2"
            disabled={!title.trim() || (useFile && !preview) && (!useFile && !imageUrl.trim())}
          >
            Añadir proyecto
          </Button>
        </form>
      </motion.div>
    </div>
  );
};
 