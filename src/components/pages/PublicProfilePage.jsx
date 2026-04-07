import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Mail, X, Briefcase } from 'lucide-react';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db, APP_ID } from '../../lib/firebase';
import { Card, Badge, Button, Input, Textarea, Select } from '../ui';
import { PROJECT_TYPES } from '../../constants';

const EMPTY_FORM = {
  clientName:  '',
  clientEmail: '',
  projectType: PROJECT_TYPES[0],
  budget:      '',
  message:     '',
};

export const PublicProfilePage = ({ profile, showToast }) => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]           = useState(EMPTY_FORM);
  const [sending, setSending]     = useState(false);
  const [projects, setProjects]   = useState([]);

  // Cargar proyectos reales del usuario desde Firestore
  useEffect(() => {
    if (!profile?.id) return;

    const unsub = onSnapshot(
      collection(db, 'artifacts', APP_ID, 'users', profile.id, 'projects'),
      (snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setProjects(data);
      },
      (err) => console.error('Error cargando portafolio:', err)
    );

    return () => unsub();
  }, [profile?.id]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleHire = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await addDoc(
        collection(db, 'artifacts', APP_ID, 'users', profile.id, 'hires'),
        { ...form, createdAt: new Date().toISOString() }
      );
      showToast('¡Solicitud enviada con éxito!');
      setShowModal(false);
      setForm(EMPTY_FORM);
    } catch (err) {
      console.error('hire error:', err);
      showToast('No se pudo enviar la solicitud.', 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Cover */}
      <div className="relative h-96 w-full">
        <img
          src={
            profile.cover ||
            'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1600'
          }
          className="w-full h-full object-cover"
          alt="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-8 sticky top-32">
              <div className="text-center mb-8">
                <img
                  src={
                    profile.photoURL ||
                    profile.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || 'User')}&background=random`
                  }
                  className="w-32 h-32 rounded-2xl mx-auto border-4 border-indigo-600 shadow-2xl object-cover mb-4"
                  alt={profile.name}
                />
                <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
                <p className="text-indigo-400 font-medium">{profile.location}</p>
                <div className="flex justify-center gap-4 mt-4">
                  <Badge color="green">{profile.availability || 'Disponible'}</Badge>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span className="font-bold">{profile.rating || '5.0'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-bold mb-2 text-sm uppercase tracking-wider">
                    Sobre mí
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{profile.bio}</p>
                </div>
                <div className="flex items-center justify-between py-4 border-y border-white/5">
                  <span className="text-gray-400">Tarifa base</span>
                  <span className="text-white font-bold text-xl">
                    ${profile.basePrice || 0}
                    <span className="text-xs font-normal text-gray-500"> / día</span>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={() => setShowModal(true)} className="w-full">
                    Contratar
                  </Button>
                  <Button variant="secondary" className="w-full" icon={Mail} />
                </div>
              </div>
            </Card>
          </div>

          {/* Portafolio real */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <button className="px-6 py-2 bg-white/10 rounded-full text-white font-medium">
                Portafolio
              </button>
              <span className="text-gray-500 text-sm">
                {projects.length} {projects.length === 1 ? 'proyecto' : 'proyectos'}
              </span>
            </div>

            {projects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <motion.div key={proj.id} whileHover={{ scale: 1.02 }}>
                    <Card className="group relative overflow-hidden">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={proj.image}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          alt={proj.title}
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600';
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-white font-medium">{proj.title}</h4>
                        {proj.createdAt && (
                          <p className="text-gray-500 text-xs mt-1">
                            {new Date(proj.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-white/10 rounded-3xl">
                <Briefcase className="mx-auto text-gray-600 mb-4" size={40} />
                <p className="text-gray-500">Este profesional aún no ha subido proyectos.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de contratación */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">
              Contratar a {profile.name}
            </h2>
            <form onSubmit={handleHire} className="space-y-4">
              <Input required placeholder="Tu nombre"       value={form.clientName}  onChange={set('clientName')} />
              <Input required type="email" placeholder="Tu email" value={form.clientEmail} onChange={set('clientEmail')} />
              <Select options={PROJECT_TYPES} value={form.projectType} onChange={set('projectType')} />
              <Input required type="number" placeholder="Presupuesto estimado ($)" value={form.budget} onChange={set('budget')} />
              <Textarea required className="h-32" placeholder="Describe tu proyecto..." value={form.message} onChange={set('message')} />
              <Button type="submit" className="w-full py-4 text-lg" disabled={sending}>
                {sending ? 'Enviando...' : 'Enviar propuesta'}
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
