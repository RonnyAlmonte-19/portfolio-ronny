import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase'; 

const APP_ID = 'framehire';

export const useCompanyJobs = (companyId) => {
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) {
      setLoading(false);
      return;
    }

    const jobsRef = collection(db, 'artifacts', APP_ID, 'jobs');
    const q = query(jobsRef, where('companyId', '==', companyId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      jobsData.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());
      setMyJobs(jobsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [companyId]);

  const getApplicationsForJob = async (jobId) => {
    try {
      const appsRef = collection(db, 'artifacts', APP_ID, 'jobs', jobId, 'applications');
      const snapshot = await getDocs(appsRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error al buscar solicitudes:", error);
      return [];
    }
  };

  return { myJobs, loading, getApplicationsForJob };
};