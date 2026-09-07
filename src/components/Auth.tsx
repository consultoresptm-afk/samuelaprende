import { useState } from 'react';
import { signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { Rocket } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Auth() {
  const { error: contextError } = useAuth();
  const [localError, setLocalError] = useState('');
  const [loading, setLoading] = useState(false);

  const displayError = localError || contextError;

  const handleGoogleSignIn = async () => {
    try {
      setLocalError('');
      setLoading(true);
      const provider = new GoogleAuthProvider();
      // Usamos signInWithRedirect para evitar bloqueos de popup (Cross-Origin-Opener-Policy)
      await signInWithRedirect(auth, provider);
    } catch (err: any) {
      console.error("Error signing in with Google", err);
      if (err.code === 'auth/unauthorized-domain') {
        setLocalError("Dominio no autorizado. Añade este dominio en Firebase -> Authentication -> Settings -> Authorized domains.");
      } else {
        setLocalError("No se pudo iniciar sesión. " + (err.message || "Asegúrate de tener habilitado Google en Firebase."));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white mb-4 shadow-lg shadow-indigo-600/30">
            <Rocket size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Samuel Aprende</h1>
          <p className="text-slate-600 dark:text-slate-400">Inicia sesión para guardar tu progreso, medallas y puntos.</p>
        </div>

        {displayError && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm mb-6 border border-red-100 dark:border-red-900/30">
            {displayError}
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-600 dark:hover:border-indigo-500 text-slate-700 dark:text-slate-200 py-4 px-6 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-indigo-600/10"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          {loading ? 'Conectando...' : 'Continuar con Google'}
        </button>
      </div>
    </div>
  );
}
