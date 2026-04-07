export const PAGES = {
  HOME: 'HOME',
  EXPLORE: 'EXPLORE',
  PROFILE: 'PROFILE',
  DASHBOARD: 'DASHBOARD',
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  JOBS: 'JOBS',
  POST_JOB: 'POST_JOB', // <-- AÑADE ESTA LÍNEA
};
// ─── CATEGORÍAS ───────────────────────────────────────────────────────────────
export const CATEGORIES = [
  'Todos',
  'Comerciales',
  'Videos Musicales',
  'Bodas',
  'Retrato',
  'Documental',
  'Cine',
  'Publicidad',
];

// ─── DISPONIBILIDAD ───────────────────────────────────────────────────────────
export const AVAILABILITY = ['Disponible', 'Ocupado', 'Freelance'];

// ─── TIPO DE PROYECTO (formulario de contratación) ────────────────────────────
export const PROJECT_TYPES = [
  'Comercial',
  'Boda / Evento',
  'Video Musical',
  'Fotografía de Retrato',
  'Documental',
  'Publicidad',
];

// ─── PERFILES DEMO (solo para desarrollo / sin datos en Firestore) ─────────────
export const MOCK_PROFILES = [
  {
    id: 'mock-1',
    name: 'Marco Valez',
    location: 'Barcelona, ES',
    basePrice: 450,
    categories: ['Comerciales', 'Videos Musicales'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    cover:  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
    bio: 'Cineasta apasionado por contar historias visuales que impacten en la audiencia.',
    availability: 'Disponible',
    rating: '5.0',
  },
  {
    id: 'mock-2',
    name: 'Elena Santos',
    location: 'Madrid, ES',
    basePrice: 320,
    categories: ['Bodas', 'Retrato'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    cover:  'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800',
    bio: 'Fotógrafa especializada en capturar momentos efímeros y naturales.',
    availability: 'Disponible',
    rating: '4.9',
  },
  {
    id: 'mock-3',
    name: 'Julián Arango',
    location: 'Ciudad de México, MX',
    basePrice: 600,
    categories: ['Documental', 'Cine'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    cover:  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800',
    bio: 'Director de fotografía con 10 años de experiencia en producciones internacionales.',
    availability: 'Ocupado',
    rating: '5.0',
  },
];
