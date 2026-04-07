import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building, FileText, DollarSign, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useJobs } from '../../hooks/useJobs';
import { PAGES } from '../../constants';
import { Button } from '../ui'; // Asumiendo que tienes tu componente Button aquí

export const PostJobPage = ({ setPage }) => {
  const { user } = useAuth(); // Verificamos si hay sesión iniciada
  const { createJob } = useJobs();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    title: '',
    description: '',
    budget: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const response = await createJob(
      user.uid,
      formData.companyName,
      formData.title,
      formData.description,
      formData.budget
    );

    setIsSubmitting(false);

    if (response.success) {
      alert("¡Proyecto publicado con éxito!"); // Cámbialo por tu showToast si prefieres
      setPage(PAGES.JOBS); // Los mandamos a la cartelera para que vean su anuncio
    } else {
      alert("Error al publicar el proyecto.");
    }
  };

  // ── SI NO HAY USUARIO LOGUEADO ──────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#111] border border-white/10 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl"
        >
          <div className="w-16 h-16 bg-indigo-600/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Acceso para Empresas</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Para publicar un proyecto y contactar con el talento de élite de FrameHire, necesitas crear una cuenta o iniciar sesión.
          </p>
          <div className="flex flex-col gap-3">
            <Button onClick={() => setPage(PAGES.REGISTER)} className="w-full py-3">
              Crear cuenta de Empresa
            </Button>
            <Button onClick={() => setPage(PAGES.LOGIN)} variant="outline" className="w-full py-3 border-gray-700 text-gray-300">
              Ya tengo una cuenta
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── SI EL USUARIO ESTÁ LOGUEADO MUESTRA EL FORMULARIO ───────────────
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-white mb-2">Publicar un Proyecto</h1>
        <p className="text-gray-400 mb-10 text-lg">Describe lo que necesitas y encuentra al creativo ideal.</p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-[#111] p-8 rounded-2xl border border-white/5 shadow-2xl">
          
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Building size={16} className="text-indigo-400"/> Nombre de la Empresa o Productora
            </label>
            <input
              type="text"
              name="companyName"
              required
              placeholder="Ej. VISUAL R STUDIOS"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Briefcase size={16} className="text-indigo-400"/> Título del Proyecto
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="Ej. Director de Fotografía para Comercial de TV"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <FileText size={16} className="text-indigo-400"/> Descripción y Requisitos
            </label>
            <textarea
              name="description"
              required
              rows={6}
              placeholder="Detalla las responsabilidades, fechas de rodaje, equipo requerido (ej. RED Komodo, Sony FX3) y cualquier otra información vital..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <DollarSign size={16} className="text-indigo-400"/> Presupuesto (Opcional)
            </label>
            <input
              type="text"
              name="budget"
              placeholder="Ej. $1,500 USD o 'A convenir'"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="pt-4">
            <Button type="submit" disabled={isSubmitting} className="w-full py-4 text-lg">
              {isSubmitting ? 'Publicando...' : 'Publicar Proyecto'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};