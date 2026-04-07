import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useAuth }     from './hooks/useAuth';
import { useProfiles } from './hooks/useProfiles';
import { useToast }    from './hooks/useToast';

import { Navbar }  from './components/layout/Navbar';
import { Footer }  from './components/layout/Footer';

import { HomePage }          from './components/pages/HomePage';
import { ExplorePage }       from './components/pages/ExplorePage';
import { AuthPage }          from './components/pages/AuthPage';
import { PublicProfilePage } from './components/pages/PublicProfilePage';
import { DashboardPage }     from './components/dashboard/DashboardPage';
import { JobBoardPage }      from './components/pages/JobBoardPage';
// 1. IMPORTAMOS LA NUEVA PÁGINA PARA PUBLICAR PROYECTOS:
import { PostJobPage }       from './components/pages/PostJobPage';

import { ToastContainer } from './components/ui/ToastContainer';
import { Spinner }        from './components/ui';

import { PAGES } from './constants';

export default function App() {
  const [page, setPage]                       = useState(PAGES.HOME);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const { user, userData, loading, authError, login, register, logout, resetPassword } = useAuth();
  const { profiles } = useProfiles();
  const { toasts, showToast, dismissToast }   = useToast();

  const navigateToProfile = (profile) => {
    setSelectedProfile(profile);
    setPage(PAGES.PROFILE);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Spinner size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30">
      <Navbar user={user} setPage={setPage} logout={logout} />

      <AnimatePresence mode="wait">
        {page === PAGES.HOME && (
          <HomePage
            key="home"
            profiles={profiles}
            setPage={setPage}
            navigateToProfile={navigateToProfile}
          />
        )}

        {page === PAGES.EXPLORE && (
          <ExplorePage
            key="explore"
            profiles={profiles}
            navigateToProfile={navigateToProfile}
          />
        )}

        {/* BLOQUE PARA VER LA BOLSA DE TRABAJO */}
        {page === PAGES.JOBS && (
          <motion.div key="jobs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <JobBoardPage />
          </motion.div>
        )}

        {/* 2. NUEVO BLOQUE PARA EL FORMULARIO DE PUBLICAR UN PROYECTO */}
        {page === PAGES.POST_JOB && (
          <motion.div key="postjob" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PostJobPage setPage={setPage} />
          </motion.div>
        )}

        {page === PAGES.PROFILE && selectedProfile && (
          <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PublicProfilePage profile={selectedProfile} showToast={showToast} />
          </motion.div>
        )}

        {page === PAGES.DASHBOARD && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <DashboardPage user={user} userData={userData} />
          </motion.div>
        )}

        {(page === PAGES.LOGIN || page === PAGES.REGISTER) && (
          <AuthPage
            key="auth"
            mode={page}
            setPage={setPage}
            login={login}
            register={register}
            resetPassword={resetPassword}
            authError={authError}
          />
        )}
      </AnimatePresence>

      <Footer />
      <ToastContainer toasts={toasts} dismissToast={dismissToast} />
    </div>
  );
}