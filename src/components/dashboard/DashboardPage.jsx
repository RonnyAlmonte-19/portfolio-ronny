import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, Mail, Building } from 'lucide-react';
import { useDashboard } from '../../hooks/useDashboard';

// Importamos todo desde DashboardTabs, incluyendo la nueva pestaña de empresa
import { ProfileTab, PortfolioTab, RequestsTab, CompanyJobsTab } from './DashboardTabs';

export const DashboardPage = ({ user, userData }) => {
  const [activeTab, setActiveTab] = useState('perfil');

  const {
    profile, setProfile,
    projects, requests,
    isSaving, saveSuccess,
    saveProfile, addProject, deleteProject,
  } = useDashboard(user, userData);

  const TABS = [
    { id: 'perfil',        label: 'Perfil profesional', Icon: User },
    { id: 'portafolio',    label: 'Portafolio',         Icon: Briefcase },
    { id: 'solicitudes',   label: 'Solicitudes',        Icon: Mail },
    { id: 'mis_proyectos', label: 'Mis Proyectos',      Icon: Building },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-2">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                activeTab === id
                  ? 'bg-indigo-600 text-white'
                  : 'hover:bg-white/5 text-gray-400'
              }`}
            >
              <Icon size={20} />
              {label}
              {id === 'solicitudes' && requests?.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                  {requests.length}
                </span>
              )}
            </button>
          ))}
        </aside>

        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'perfil' && (
              <ProfileTab
                profile={profile}
                setProfile={setProfile}
                saveProfile={saveProfile}
                isSaving={isSaving}
                saveSuccess={saveSuccess}
                user={user}
              />
            )}
            {activeTab === 'portafolio' && (
              <PortfolioTab
                projects={projects}
                addProject={addProject}
                deleteProject={deleteProject}
              />
            )}
            {activeTab === 'solicitudes' && (
              <RequestsTab requests={requests} />
            )}
            
            {activeTab === 'mis_proyectos' && (
              <CompanyJobsTab user={user} />
            )}
            
          </motion.div>
        </div>
      </div>
    </div>
  );
};