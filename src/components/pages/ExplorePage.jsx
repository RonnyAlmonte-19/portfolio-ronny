import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { TalentCard } from '../TalentCard';
import { CATEGORIES } from '../../constants';

export const ExplorePage = ({ profiles, navigateToProfile }) => {
  const [query, setQuery]       = useState('');
  const [category, setCategory] = useState('Todos');

  const filtered = useMemo(() => {
    return profiles.filter((p) => {
      const matchText =
        !query ||
        (p.name?.toLowerCase() || '').includes(query.toLowerCase()) ||
        (p.location?.toLowerCase() || '').includes(query.toLowerCase());

      const matchCat =
        category === 'Todos' || (p.categories || []).includes(category);

      return matchText && matchCat;
    });
  }, [profiles, query, category]);

  return (
    <motion.div
      key="explore"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 px-6 max-w-7xl mx-auto pb-20"
    >
      {/* Header + buscador */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <h1 className="text-4xl font-bold">Descubrir talentos</h1>
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-4 py-3
              outline-none focus:border-indigo-500 transition-colors"
            placeholder="Buscar por nombre o ciudad..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filtros de categoría */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              category === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de perfiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map((p) => (
          <TalentCard key={p.id} profile={p} onClick={navigateToProfile} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-600">
            No se encontraron talentos para ese filtro.
          </div>
        )}
      </div>
    </motion.div>
  );
};
