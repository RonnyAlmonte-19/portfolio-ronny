import React, { useState } from 'react';
import { useJobs } from '../../hooks/useJobs';
import { useAuth } from '../../hooks/useAuth'; // 1. IMPORTACIÓN REAL DESCOMENTADA
import { JobCard } from '../ui/JobCard';
import { ApplyModal } from '../ui/ApplyModal';

// Si ya tienes un useToast, impórtalo aquí si lo quieres usar luego
// import { useToast } from '../../hooks/useToast';

export const JobBoardPage = () => {
  const { jobs, loadingJobs, applyToJob } = useJobs();
  
  // 2. AHORA USAMOS EL USUARIO REAL DE FIREBASE
  const { user } = useAuth(); 

  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Abrir el modal cuando hacen clic en "Aplicar"
  const handleOpenModal = (job) => {
    if (!user) {
      alert("Debes iniciar sesión para aplicar.");
      return;
    }
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  // Enviar la propuesta a Firebase
  const handleApplicationSubmit = async (message) => {
    // Verificación de seguridad
    if (!user) return;

    const response = await applyToJob(selectedJob.id, user.uid, message);
    if (response.success) {
      alert("¡Solicitud enviada con éxito a " + selectedJob.companyName + "!");
    } else {
      alert("Hubo un error al enviar la solicitud.");
    }
  };

  // Pantalla de carga mientras trae los datos de Firebase
  if (loadingJobs) {
    return (
      <div className="flex justify-center items-center h-screen bg-transparent">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Bolsa de Trabajo</h1>
          <p className="text-gray-400 mt-2 text-lg">Encuentra tu próximo proyecto audiovisual.</p>
        </div>
        {/* El botón de prueba temporal ha sido eliminado */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-[#111] rounded-2xl border border-white/10">
            <p className="text-gray-400 text-lg">No hay ofertas disponibles en este momento.</p>
          </div>
        ) : (
          jobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onApply={handleOpenModal}
            />
          ))
        )}
      </div>

      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
        onSubmit={handleApplicationSubmit}
      />
    </div>
  );
};