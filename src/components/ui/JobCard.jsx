import React from 'react';
import { Briefcase, DollarSign, Info } from 'lucide-react';

export const JobCard = ({ job, onApply }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between h-full relative group">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 leading-tight">{job.title}</h3>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-2">
              <Briefcase size={16} /> {job.companyName}
            </p>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
            job.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
          }`}>
            {job.status === 'open' ? 'Abierto' : 'Cerrado'}
          </span>
        </div>
        
        {/* Descripción truncada para la tarjeta */}
        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
          {job.description}
        </p>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm font-medium text-gray-700">
          {job.budget ? (
            <span className="flex items-center gap-1">
              <DollarSign size={16} className="text-gray-400"/> {job.budget}
            </span>
          ) : (
            <span className="text-gray-400 text-xs italic">A convenir</span>
          )}
        </div>
        
        {/* BOTÓN FLOTANTE / DE ACCIÓN */}
        <button 
          onClick={() => onApply(job)}
          className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-all active:scale-95 shadow-lg flex items-center gap-2"
        >
          <Info size={16} />
          Ver anuncio completo
        </button>
      </div>
    </div>
  );
};