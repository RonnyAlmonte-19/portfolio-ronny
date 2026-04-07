import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase'; // Asegúrate de que esta ruta apunte a tu config de Firebase

// El appId que usas en tu estructura de Firebase
const APP_ID = 'framehire'; 

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  // 1. Escuchar los trabajos publicados en tiempo real
  useEffect(() => {
    const jobsRef = collection(db, 'artifacts', APP_ID, 'jobs');
    // Ordenamos para que los más recientes salgan primero
    const q = query(jobsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setJobs(jobsData);
      setLoadingJobs(false);
    });

    // Limpiamos el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  // 2. Función para que una Empresa publique un anuncio
  const createJob = async (companyId, companyName, title, description, budget) => {
    try {
      const jobsRef = collection(db, 'artifacts', APP_ID, 'jobs');
      await addDoc(jobsRef, {
        companyId,
        companyName,
        title,
        description,
        budget,
        status: 'open',
        createdAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error("Error al publicar el anuncio:", error);
      return { success: false, error };
    }
  };

  // 3. Función para que un Filmmaker aplique a un anuncio
  const applyToJob = async (jobId, applicantId, message) => {
    try {
      const applicationsRef = collection(db, 'artifacts', APP_ID, 'jobs', jobId, 'applications');
      await addDoc(applicationsRef, {
        applicantId,
        message,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      return { success: false, error };
    }
  };

  return { jobs, loadingJobs, createJob, applyToJob };
};