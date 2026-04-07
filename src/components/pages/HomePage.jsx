import { motion } from 'framer-motion';
import { Search, Briefcase } from 'lucide-react'; 
import { Button } from '../ui';
import { TalentCard } from '../TalentCard';
import { PAGES } from '../../constants';

// 1. IMPORTAMOS EL HOOK DE TRABAJOS Y LA TARJETA
import { useJobs } from '../../hooks/useJobs';
import { JobCard } from '../ui/JobCard';

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = ({ setPage }) => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
    <div className="absolute inset-0 z-0">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700" />
    </div>

    <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-sm font-medium mb-6">
          🎬 La Red de Creativos Visuales más Exclusiva
        </span>
        <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight mb-8 leading-[1.1]">
          Captura el Futuro con <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Talento de Élite.
          </span>
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          FrameHire conecta a los mejores cineastas y fotógrafos del mundo con marcas y proyectos
          visionarios. Donde la técnica se encuentra con la pasión.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => setPage(PAGES.EXPLORE)}
            className="w-full sm:w-auto text-lg py-4 px-8"
            icon={Search}
          >
            Explorar talentos
          </Button>
          <Button
            onClick={() => setPage(PAGES.REGISTER)}
            variant="secondary"
            className="w-full sm:w-auto text-lg py-4 px-8"
          >
            Crear mi perfil
          </Button>
          <Button
            onClick={() => setPage(PAGES.POST_JOB)}
            variant="outline" 
            className="w-full sm:w-auto text-lg py-4 px-8 border-gray-600 text-gray-300 hover:text-white hover:bg-white/5"
            icon={Briefcase} 
          >
            Publicar un proyecto
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

// ── HomePage ──────────────────────────────────────────────────────────────────
export const HomePage = ({ profiles, setPage, navigateToProfile }) => {
  // 2. TRAEMOS LOS TRABAJOS DESDE FIREBASE
  const { jobs, loadingJobs } = useJobs();

  return (
    <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Hero setPage={setPage} />

      {/* SECCIÓN DE TALENTOS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">Talentos destacados</h2>
            <p className="text-gray-500">Los creativos más solicitados de este mes</p>
          </div>
          <Button variant="outline" onClick={() => setPage(PAGES.EXPLORE)}>
            Ver todos
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {profiles.slice(0, 3).map((p) => (
            <TalentCard key={p.id} profile={p} onClick={navigateToProfile} />
          ))}
        </div>
      </section>

      {/* 3. NUEVA SECCIÓN DE PROYECTOS RECIENTES */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">Proyectos recientes</h2>
            <p className="text-gray-500">Últimas oportunidades para creativos</p>
          </div>
          <Button variant="outline" onClick={() => setPage(PAGES.JOBS)}>
            Ver bolsa de trabajo
          </Button>
        </div>

        {loadingJobs ? (
          <div className="text-center text-gray-500 py-10">Cargando proyectos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length === 0 ? (
              <p className="text-gray-500 col-span-full">No hay proyectos disponibles aún.</p>
            ) : (
              // Usamos slice(0, 3) para mostrar solo los 3 más recientes en el Home
              jobs.slice(0, 3).map(job => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  // Si le dan a aplicar en el Home, los mandamos a la Bolsa de Trabajo
                  onApply={() => setPage(PAGES.JOBS)} 
                />
              ))
            )}
          </div>
        )}
      </section>
      
    </motion.div>
  );
};