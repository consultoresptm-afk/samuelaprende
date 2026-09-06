import { useAuth } from "../contexts/AuthContext";
import { Zap, BookOpen, Clock, BrainCircuit } from "lucide-react";

export default function Auth() {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900/80 p-8 rounded-3xl shadow-2xl shadow-indigo-900/20 border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
        
        {/* Decorative background glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-pink-500/20 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-violet-600/20 blur-[80px] rounded-full pointer-events-none" />

        <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-pink-500 to-violet-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-pink-500/30 mb-6 font-black text-4xl relative z-10">
          S
        </div>
        <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-400 tracking-tight mb-2 relative z-10">SamuelAprende</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium relative z-10">Domina las identidades trigonométricas y revienta ese examen mañana.</p>
        
        <div className="space-y-4 mb-8 text-left text-sm font-bold text-slate-700 dark:text-slate-300 relative z-10">
          <div className="flex items-center gap-3">
            <BookOpen className="text-indigo-500" size={20} />
            <span>Fórmulas clave explicadas de forma sencilla</span>
          </div>
          <div className="flex items-center gap-3">
            <BrainCircuit className="text-emerald-500" size={20} />
            <span>Flashcards para memorización rápida</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="text-amber-500" size={20} />
            <span>Simulador de examen con temporizador</span>
          </div>
        </div>

        <button
          onClick={loginWithGoogle}
          className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold py-4 px-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 relative z-10"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Ingresar con Google
        </button>
      </div>
    </div>
  );
}
