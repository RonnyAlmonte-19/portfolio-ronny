import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card, Badge } from './ui';
 
const DEFAULT_COVER =
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800';
 
export const TalentCard = ({ profile, onClick }) => {
  const avatarSrc =
    profile.photoURL ||
    profile.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || 'User')}&background=random`;
 
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
      onClick={() => onClick(profile)}
    >
      <Card className="h-full flex flex-col bg-[#161616] border-white/5 hover:border-indigo-500/50 transition-all duration-500">
        {/* Cover image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={profile.cover || DEFAULT_COVER}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            alt={profile.name}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
 
          {/* Avatar + nombre */}
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            <img
              src={avatarSrc}
              className="w-12 h-12 rounded-full border-2 border-white/20 object-cover shadow-xl"
              alt={profile.name}
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || 'User')}&background=random`;
              }}
            />
            <div>
              <h3 className="text-white font-bold leading-none">{profile.name}</h3>
              <span className="text-xs text-gray-400">{profile.location}</span>
            </div>
          </div>
        </div>
 
        {/* Body */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.categories?.slice(0, 2).map((cat) => (
              <Badge key={cat}>{cat}</Badge>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
            <div className="text-sm">
              <span className="text-gray-500">Desde</span>
              <span className="text-white font-bold ml-1">${profile.basePrice || 0}</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              <Star size={14} fill="currentColor" />
              <span>{profile.rating || '5.0'}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};