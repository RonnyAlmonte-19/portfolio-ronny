import { useState, useRef } from 'react';
// Agregué Users y ChevronUp para la nueva pestaña
import { Briefcase, Mail, Trash2, Camera, User, Loader2, Check, ChevronDown, Layers, Users, ChevronUp } from 'lucide-react';
import { Button, Card } from '../ui';
import { AddProjectModal } from '../ui/AddProjectModal';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
// Importamos el hook de los trabajos de la empresa
import { useCompanyJobs } from '../../hooks/useCompanyJobs';

const CATEGORIAS_PROFESIONALES = [
  { id: 'cine',      label: 'Cine / Cortos' },
  { id: 'comercial', label: 'Comercial' },
  { id: 'fotografo', label: 'Fotógrafo' },
  { id: 'musica',    label: 'Videos Musicales' },
  { id: 'boda',      label: 'Eventos / Bodas' },
  { id: 'post',      label: 'Post-producción' },
  { id: 'drone',     label: 'Drone' },
];

// ── Tab: Perfil ───────────────────────────────────────────────────────────────
export const ProfileTab = ({ profile, setProfile, saveProfile, isSaving, saveSuccess, user }) => {
  const fileInputRef = useRef(null);
  const [photoURL, setPhotoURL] = useState(profile.photoURL || null);
  const [savingPhoto, setSavingPhoto] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert('La imagen es muy pesada. Por favor sube una foto de menos de 1MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      setPhotoURL(base64);
      setProfile((p) => ({ ...p, photoURL: base64 }));

      // Guardar foto inmediatamente en Firestore
      if (user && !user.isAnonymous) {
        setSavingPhoto(true);
        try {
          await updateDoc(
            doc(db, 'artifacts', 'framehire-v1', 'public', 'data', 'profiles', user.uid),
            { photoURL: base64 }
          );
        } catch (err) {
          console.error('Error guardando foto:', err);
        } finally {
          setSavingPhoto(false);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-5xl mx-auto text-white">
      <div className="flex flex-col lg:flex-row gap-12">

        {/* Avatar */}
        <div className="flex flex-col items-center gap-6 w-full lg:w-1/3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div
            onClick={() => fileInputRef.current.click()}
            className="relative w-40 h-40 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center cursor-pointer overflow-hidden group hover:border-indigo-500 transition-all shadow-2xl"
          >
            {photoURL ? (
              <img src={photoURL} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={64} className="text-zinc-700" />
            )}
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {savingPhoto
                ? <Loader2 className="animate-spin text-white" size={28} />
                : <>
                    <Camera className="text-white mb-1" size={28} />
                    <span className="text-[10px] text-white font-bold uppercase tracking-widest">Cambiar foto</span>
                  </>
              }
            </div>
          </div>
          <div className="text-center px-4">
            <h3 className="text-zinc-400 font-bold uppercase text-xs tracking-widest mb-1">Tu imagen profesional</h3>
            <p className="text-zinc-600 text-[11px]">Foto clara o logo de tu productora. Máx 1MB.</p>
          </div>
        </div>

        {/* Formulario */}
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-3xl font-black text-white mb-1">Configura tu perfil</h2>
            <p className="text-zinc-500 text-sm">Completa tu información para que los clientes te encuentren.</p>
          </div>

          <form onSubmit={saveProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Nombre artístico</label>
                <input
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Ej: Roony Films"
                  value={profile.name || ''}
                  onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Ubicación</label>
                <input
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Ej: Santo Domingo, RD"
                  value={profile.location || ''}
                  onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Biografía profesional</label>
              <textarea
                rows={4}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                placeholder="Describe tu experiencia, equipo y visión creativa..."
                value={profile.bio || ''}
                onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Especialidad */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                  <Layers size={14} /> Especialidad
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                    value={profile.categoria || 'cine'}
                    onChange={(e) => setProfile((p) => ({ ...p, categoria: e.target.value }))}
                  >
                    {CATEGORIAS_PROFESIONALES.map((cat) => (
                      <option key={cat.id} value={cat.id} className="bg-zinc-900">{cat.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={18} />
                </div>
              </div>

              {/* Precio */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Precio base ($)</label>
                <input
                  type="number"
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="500"
                  value={profile.basePrice || ''}
                  onChange={(e) => setProfile((p) => ({ ...p, basePrice: e.target.value }))}
                />
              </div>

              {/* Disponibilidad */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Disponibilidad</label>
                <div className="relative">
                  <select
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                    value={profile.availability || 'Freelance'}
                    onChange={(e) => setProfile((p) => ({ ...p, availability: e.target.value }))}
                  >
                    <option value="Freelance" className="bg-zinc-900">Freelance</option>
                    <option value="Disponible" className="bg-zinc-900">Disponible ahora</option>
                    <option value="Ocupado" className="bg-zinc-900">Ocupado</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className={`w-full py-5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${
                saveSuccess
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-500/20'
                  : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20'
              }`}
            >
              {isSaving
                ? <Loader2 className="animate-spin" size={24} />
                : saveSuccess
                  ? <><Check size={24} strokeWidth={3} /> Perfil actualizado correctamente</>
                  : 'Guardar perfil'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// ── Tab: Portafolio ───────────────────────────────────────────────────────────
export const PortfolioTab = ({ projects, addProject, deleteProject }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Mi portafolio</h2>
        <Button onClick={() => setShowModal(true)} icon={Briefcase}>
          Añadir proyecto
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <Card key={proj.id} className="group relative">
            <img src={proj.image} className="w-full h-48 object-cover" alt={proj.title} />
            <div className="p-4 flex justify-between items-center">
              <h4 className="text-white font-medium">{proj.title}</h4>
              <button
                onClick={() => deleteProject(proj.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </Card>
        ))}
        {projects.length === 0 && (
          <div className="col-span-2 py-20 text-center border-2 border-dashed border-white/10 rounded-3xl">
            <Briefcase className="mx-auto text-gray-600 mb-4" size={40} />
            <p className="text-gray-500">Aún no has subido ningún proyecto.</p>
          </div>
        )}
      </div>

      {showModal && (
        <AddProjectModal onConfirm={addProject} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

// ── Tab: Solicitudes ──────────────────────────────────────────────────────────
export const RequestsTab = ({ requests }) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-white">Solicitudes de contratación</h2>
    <div className="space-y-4">
      {requests.map((req) => (
        <Card key={req.id} className="p-6 bg-white/5 hover:bg-white/10 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-white font-bold text-lg">{req.clientName}</h4>
              <p className="text-indigo-400 text-sm">{req.projectType}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500">
                {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : '—'}
              </span>
              <div className="font-bold text-white mt-1">${req.budget}</div>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-4 bg-black/30 p-4 rounded-lg italic">
            "{req.message}"
          </p>
          <Button variant="outline" className="text-xs py-1.5 px-4">
            Contactar: {req.clientEmail}
          </Button>
        </Card>
      ))}
      {requests.length === 0 && (
        <div className="py-20 text-center text-gray-600">
          <Mail className="mx-auto mb-4" size={40} />
          <p>No tienes solicitudes nuevas.</p>
        </div>
      )}
    </div>
  </div>
);

// ── Tab: Empresa (Mis Proyectos) ──────────────────────────────────────────────
export const CompanyJobsTab = ({ user }) => {
  const { myJobs, loading, getApplicationsForJob } = useCompanyJobs(user?.uid);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [applications, setApplications] = useState({});
  const [loadingApps, setLoadingApps] = useState(false);

  // Función para abrir/cerrar las solicitudes de un trabajo
  const toggleJobDetails = async (jobId) => {
    if (expandedJobId === jobId) {
      setExpandedJobId(null);
      return;
    }

    setExpandedJobId(jobId);
    
    if (!applications[jobId]) {
      setLoadingApps(true);
      const apps = await getApplicationsForJob(jobId);
      setApplications(prev => ({ ...prev, [jobId]: apps }));
      setLoadingApps(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Cargando tus proyectos...</div>;
  }

  if (myJobs.length === 0) {
    return (
      <div className="bg-[#111] border border-white/10 rounded-2xl p-12 text-center">
        <Briefcase size={48} className="mx-auto text-gray-600 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Aún no has publicado proyectos</h3>
        <p className="text-gray-400">Tus anuncios de trabajo aparecerán aquí.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Mis Proyectos Publicados</h2>

      {myJobs.map(job => (
        <div key={job.id} className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
          {/* Cabecera del trabajo */}
          <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">{job.title}</h3>
              <p className="text-sm text-gray-400 mt-1 line-clamp-1">{job.description}</p>
            </div>
            
            <button 
              onClick={() => toggleJobDetails(job.id)}
              className="flex items-center gap-2 bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20 px-4 py-2 rounded-lg transition-colors font-medium text-sm whitespace-nowrap"
            >
              <Users size={16} />
              Ver Propuestas
              {expandedJobId === job.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* Área desplegable con las solicitudes */}
          {expandedJobId === job.id && (
            <div className="bg-black/50 border-t border-white/5 p-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
                Propuestas Recibidas
              </h4>

              {loadingApps ? (
                <p className="text-gray-500 text-sm">Cargando propuestas...</p>
              ) : applications[job.id]?.length === 0 ? (
                <p className="text-gray-500 text-sm italic">Nadie ha aplicado a este proyecto todavía.</p>
              ) : (
                <div className="space-y-4">
                  {applications[job.id]?.map(app => (
                    <div key={app.id} className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5">
                      <p className="text-gray-300 text-sm whitespace-pre-wrap">{app.message}</p>
                      
                      <div className="mt-3 pt-3 border-t border-white/5 flex justify-end">
                         <span className="text-xs text-gray-500">ID del Filmmaker: {app.applicantId}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};