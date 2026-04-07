# FrameHire

Red de cineastas y fotógrafos profesionales. Construida con React, Firebase y TailwindCSS.

---

## Estructura del proyecto

```
framehire/
├── public/
│   └── index.html                  # HTML de entrada
│
├── src/
│   ├── index.jsx                   # Punto de entrada React
│   ├── index.css                   # Estilos globales + Tailwind
│   ├── App.jsx                     # Componente raíz, enruta páginas
│   │
│   ├── lib/
│   │   └── firebase.js             # Inicialización Firebase (auth, db)
│   │
│   ├── constants/
│   │   └── index.js                # PAGES, CATEGORIES, MOCK_PROFILES, etc.
│   │
│   ├── hooks/
│   │   ├── useAuth.js              # Login, registro, logout, estado de sesión
│   │   ├── useProfiles.js          # Listener en tiempo real de perfiles públicos
│   │   ├── useDashboard.js         # Lógica del dashboard (perfil, proyectos, solicitudes)
│   │   └── useToast.js             # Sistema de notificaciones (reemplaza alert())
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── index.jsx           # Button, Card, Badge, Input, Select, Textarea, Spinner
│   │   │   ├── ToastContainer.jsx  # Notificaciones flotantes
│   │   │   └── AddProjectModal.jsx # Modal para añadir proyectos (reemplaza prompt())
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Barra de navegación fija
│   │   │   └── Footer.jsx          # Pie de página
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx        # Hero + talentos destacados
│   │   │   ├── ExplorePage.jsx     # Grid con búsqueda y filtros por categoría
│   │   │   ├── AuthPage.jsx        # Login y registro con Firebase Auth real
│   │   │   └── PublicProfilePage.jsx # Perfil público + modal de contratación
│   │   │
│   │   ├── dashboard/
│   │   │   ├── DashboardPage.jsx   # Contenedor del dashboard con sidebar de tabs
│   │   │   └── DashboardTabs.jsx   # ProfileTab, PortfolioTab, RequestsTab
│   │   │
│   │   └── TalentCard.jsx          # Tarjeta de talento (usada en Home y Explore)
│   │
├── firestore.rules                 # Reglas de seguridad de Firestore
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar Firebase
# Edita src/lib/firebase.js y reemplaza los valores con los de tu proyecto Firebase.

# 3. Desplegar reglas de Firestore
firebase deploy --only firestore:rules

# 4. Iniciar en desarrollo
npm run dev

# 5. Build de producción
npm run build
```

---

## Variables de Firebase

Edita `src/lib/firebase.js`:

```js
const firebaseConfig = {
  apiKey:            "TU_API_KEY",
  authDomain:        "TU_AUTH_DOMAIN",
  projectId:         "TU_PROJECT_ID",
  storageBucket:     "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_SENDER_ID",
  appId:             "TU_APP_ID",
};
```

---

## Mejoras aplicadas respecto al código original

| Problema original                  | Solución aplicada                              |
|------------------------------------|------------------------------------------------|
| Login/register sin lógica real     | `useAuth` con `signInWithEmailAndPassword`     |
| `alert()` como notificaciones      | `useToast` + `ToastContainer` con animaciones  |
| `window.prompt()` para proyectos   | `AddProjectModal` con formulario propio        |
| Botón Trash2 sin `onClick`         | `deleteProject` conectado en `PortfolioTab`    |
| Sin filtro por categoría           | Filtros de categoría en `ExplorePage`          |
| Reglas de Firestore ausentes       | `firestore.rules` con permisos correctos       |
| Lógica mezclada en un componente   | Separado en hooks: `useDashboard`, `useAuth`   |
| Rutas como strings sueltos         | Constante `PAGES` en `constants/index.js`      |
| Sin estado de carga inicial        | Pantalla de `Spinner` mientras Firebase carga  |
| `MOCK_PROFILES` en componente raíz | Movido a `constants/index.js`                  |
