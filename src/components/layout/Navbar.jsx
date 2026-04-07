import { useState } from 'react';
import { Video, User, LogOut, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../ui';
import { PAGES } from '../../constants';

export const Navbar = ({ user, setPage, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = user && !user.isAnonymous;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setPage(PAGES.HOME)}
        >
          <div className="bg-indigo-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <Video className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">
            FRAME<span className="text-indigo-500">HIRE</span>
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => setPage(PAGES.EXPLORE)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Explorar
          </button>

          {!isLoggedIn ? (
            <>
              <button
                onClick={() => setPage(PAGES.LOGIN)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Iniciar sesión
              </button>
              <Button onClick={() => setPage(PAGES.REGISTER)}>Unirse</Button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPage(PAGES.DASHBOARD)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <User size={18} />
                <span>Panel</span>
              </button>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-6 right-6 bg-black border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl"
          >
            <button
              onClick={() => { setPage(PAGES.EXPLORE); setIsOpen(false); }}
              className="text-left text-lg py-2 border-b border-white/5"
            >
              Explorar
            </button>
{/* Botón de Explorar que ya tienes... */}
<button 
  onClick={() => setPage(PAGES.EXPLORE)} 
  className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
>
  Explorar
</button>

{/* NUEVO BOTÓN: Bolsa de Trabajo */}
<button 
  onClick={() => setPage(PAGES.JOBS)} 
  className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
>
  Bolsa de Trabajo
</button>
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => { setPage(PAGES.LOGIN); setIsOpen(false); }}
                  className="text-left text-lg py-2 border-b border-white/5"
                >
                  Iniciar sesión
                </button>
                <Button onClick={() => { setPage(PAGES.REGISTER); setIsOpen(false); }}>
                  Crear perfil
                </Button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setPage(PAGES.DASHBOARD); setIsOpen(false); }}
                  className="text-left text-lg py-2 border-b border-white/5"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="text-left text-lg py-2 text-red-400"
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
<button onClick={() => setPage(PAGES.JOBS)}>
  Bolsa de Trabajo
</button>