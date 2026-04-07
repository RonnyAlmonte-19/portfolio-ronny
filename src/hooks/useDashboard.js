import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { db, APP_ID } from '../lib/firebase';

/**
 * Centraliza toda la lógica del Dashboard:
 *  - Perfil editable (sincronizado con Firestore)
 *  - Proyectos del portafolio (CRUD real)
 *  - Solicitudes de contratación recibidas
 */
export function useDashboard(user, userData) {
  const [profile, setProfile]   = useState(userData || {});
  const [projects, setProjects] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sincronizar profile si userData cambia (carga inicial)
  useEffect(() => {
    if (userData) setProfile(userData);
  }, [userData]);

  // Escuchar proyectos en tiempo real
  useEffect(() => {
    if (!user || user.isAnonymous) return;

    const unsubProjects = onSnapshot(
      collection(db, 'artifacts', APP_ID, 'users', user.uid, 'projects'),
      (snap) => setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (err) => console.error('projects error:', err)
    );

    const unsubRequests = onSnapshot(
      collection(db, 'artifacts', APP_ID, 'users', user.uid, 'hires'),
      (snap) => setRequests(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (err) => console.error('hires error:', err)
    );

    return () => { unsubProjects(); unsubRequests(); };
  }, [user]);

  // ── Guardar perfil ─────────────────────────────────────────────────────────
  const saveProfile = async (e) => {
    e.preventDefault();
    if (!user || user.isAnonymous) return;
    setIsSaving(true);
    try {
      const timestamp = { updatedAt: new Date().toISOString(), userId: user.uid };

      // Perfil público (visible en Explorar)
      await setDoc(
        doc(db, 'artifacts', APP_ID, 'public', 'data', 'profiles', user.uid),
        { ...profile, ...timestamp },
        { merge: true }
      );

      // Datos privados (solo el usuario los lee)
      await setDoc(
        doc(db, 'artifacts', APP_ID, 'users', user.uid, 'settings', 'profile'),
        profile,
        { merge: true }
      );

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('saveProfile error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // ── Añadir proyecto ────────────────────────────────────────────────────────
  const addProject = async ({ title, imageUrl }) => {
    if (!user || user.isAnonymous) return;
    await addDoc(
      collection(db, 'artifacts', APP_ID, 'users', user.uid, 'projects'),
      {
        title,
        image: imageUrl || 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800',
        createdAt: new Date().toISOString(),
      }
    );
  };

  // ── Eliminar proyecto ─────────────────────────────────────────────────────
  const deleteProject = async (projectId) => {
    if (!user || user.isAnonymous) return;
    await deleteDoc(
      doc(db, 'artifacts', APP_ID, 'users', user.uid, 'projects', projectId)
    );
  };

  return {
    profile,
    setProfile,
    projects,
    requests,
    isSaving,
    saveSuccess,
    saveProfile,
    addProject,
    deleteProject,
  };
}
