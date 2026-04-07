import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Input, Spinner } from '../ui';
import { PAGES } from '../../constants';

export const AuthPage = ({ mode, setPage, login, register, resetPassword, authError }) => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetSent, setResetSent]   = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const isLogin = mode === PAGES.LOGIN;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fn = isLogin ? login : register;
    const ok = await fn(email, password);
    setLoading(false);
    if (ok) setPage(PAGES.DASHBOARD);
  };

const handleReset = async (e) => {
  e.preventDefault();
  if (!email.trim()) return;
  setResetLoading(true);
  try {
    const ok = await resetPassword(email);
    if (ok) setResetSent(true);
  } finally {
    setResetLoading(false);
  }
};

  // ── Pantalla de recuperar contraseña ─────────────────────────────────────
  if (forgotMode) {
    return (
      <motion.div
        key="forgot"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="pt-40 flex justify-center px-6 pb-20"
      >
        <Card className="w-full max-w-md p-8 bg-[#111]">
          <h2 className="text-3xl font-bold mb-2 text-center">Recuperar contraseña</h2>
          <p className="text-gray-500 text-center mb-8">
            Te enviaremos un enlace para restablecer tu contraseña.
          </p>

          {resetSent ? (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">✓</span>
              </div>
              <p className="text-green-400 text-sm">
                Correo enviado a <strong>{email}</strong>. Revisa tu bandeja de entrada.
              </p>
              <Button
                className="w-full"
                onClick={() => { setForgotMode(false); setResetSent(false); }}
              >
                Volver al login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <Input
                label="Correo electrónico"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full py-4" disabled={resetLoading}>
                {resetLoading ? <Spinner size={20} /> : 'Enviar enlace de recuperación'}
              </Button>
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setForgotMode(false)}
                  className="text-sm text-gray-500 hover:text-indigo-400 transition-colors"
                >
                  Volver al login
                </button>
              </div>
            </form>
          )}
        </Card>
      </motion.div>
    );
  }

  // ── Pantalla normal de login / registro ───────────────────────────────────
  return (
    <motion.div
      key="auth"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="pt-40 flex justify-center px-6 pb-20"
    >
      <Card className="w-full max-w-md p-8 bg-[#111]">
        <h2 className="text-3xl font-bold mb-2 text-center">
          {isLogin ? 'Bienvenido de nuevo' : 'Únete a FrameHire'}
        </h2>
        <p className="text-gray-500 text-center mb-8">
          {isLogin
            ? 'Accede a tu panel profesional'
            : 'Crea tu perfil y comienza a ser contratado'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Correo electrónico"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="space-y-1">
            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setForgotMode(true)}
                  className="text-xs text-gray-500 hover:text-indigo-400 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}
          </div>

          {authError && (
            <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
              {authError}
            </p>
          )}

          <Button type="submit" className="w-full py-4 mt-4" disabled={loading}>
            {loading
              ? <Spinner size={20} />
              : isLogin ? 'Entrar' : 'Registrarme'
            }
          </Button>

          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => setPage(isLogin ? PAGES.REGISTER : PAGES.LOGIN)}
              className="text-sm text-gray-500 hover:text-indigo-400 transition-colors"
            >
              {isLogin
                ? '¿No tienes cuenta? Regístrate'
                : '¿Ya tienes cuenta? Entra aquí'}
            </button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};
