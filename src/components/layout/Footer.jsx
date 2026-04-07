import { Video } from 'lucide-react';

export const Footer = () => (
  <footer className="border-t border-white/5 py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <Video className="text-indigo-500" size={24} />
        <span className="text-2xl font-bold tracking-tighter">
          FRAME<span className="text-indigo-500">HIRE</span>
        </span>
      </div>
      <div className="flex gap-8 text-gray-500 text-sm">
        <a href="#" className="hover:text-white transition-colors">Términos</a>
        <a href="#" className="hover:text-white transition-colors">Privacidad</a>
        <a href="#" className="hover:text-white transition-colors">Soporte</a>
      </div>
      <p className="text-gray-600 text-sm">
        © {new Date().getFullYear()} FrameHire Inc. Todos los derechos reservados.
      </p>
    </div>
  </footer>
);
