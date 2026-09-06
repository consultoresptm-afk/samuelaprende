import { useAuth } from "../contexts/AuthContext";
import { Flame, Trophy, Coins, Star, Activity } from "lucide-react";
import { Link } from "react-router";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  const nextLevelScore = user.level * 100;
  const progressPercent = ((user.score % 100) / 100) * 100;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-1 text-slate-900 dark:text-white flex items-center gap-2"><span>👋</span> ¡Hola, {user.displayName?.split(" ")[0]}!</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">El examen es mañana, ¡estás a tiempo de dominarlo!</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/30">+450 XP</span>
          <span className="px-3 py-1 bg-pink-500/20 text-pink-600 dark:text-pink-400 rounded-full text-xs font-bold border border-pink-500/30">Desafío Diario</span>
        </div>
      </div>

      {/* Gamification Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm">
          <div className="text-2xl mb-1 text-orange-500 drop-shadow-md">🔥</div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Racha</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{user.streak} días</p>
        </div>
        <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm">
          <div className="text-2xl mb-1 text-indigo-500 drop-shadow-md">✨</div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Nivel</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{user.level}</p>
        </div>
        <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm">
          <div className="text-2xl mb-1 text-emerald-500 drop-shadow-md">🚀</div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Puntos</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{user.score}</p>
        </div>
        <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm">
          <div className="text-2xl mb-1 text-amber-500 drop-shadow-md">💰</div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Monedas</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{user.coins}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="font-bold text-lg text-slate-900 dark:text-white">Progreso hacia Nivel {user.level + 1}</h2>
            <p className="text-sm text-slate-500">{user.score} / {nextLevelScore} XP</p>
          </div>
          <div className="bg-amber-500/20 p-2 rounded-xl border border-amber-500/30">
             <Trophy className="text-amber-500" size={24} />
          </div>
        </div>
        <div className="h-4 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-pink-500 to-violet-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(236,72,153,0.5)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/learn" className="bg-slate-100 dark:bg-indigo-600/20 p-4 rounded-2xl border border-slate-200 dark:border-indigo-500/30 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 hover:bg-slate-200 dark:hover:bg-indigo-600/30 transition-colors">
          <div className="text-3xl mt-1">📖</div>
          <div>
            <p className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-widest">Fórmulas</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">Repasa las identidades</p>
          </div>
        </Link>
        <Link to="/flashcards" className="bg-slate-100 dark:bg-pink-600/20 p-4 rounded-2xl border border-slate-200 dark:border-pink-500/30 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 hover:bg-slate-200 dark:hover:bg-pink-600/30 transition-colors">
          <div className="text-3xl mt-1">🗂️</div>
          <div>
            <p className="text-[10px] font-bold uppercase text-pink-600 dark:text-pink-400 tracking-widest">Flashcards</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">Fijación de memoria</p>
          </div>
        </Link>
        <Link to="/exam" className="bg-slate-100 dark:bg-violet-600/20 p-4 rounded-2xl border border-slate-200 dark:border-violet-500/30 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 hover:bg-slate-200 dark:hover:bg-violet-600/30 transition-colors">
           <div className="text-3xl mt-1">⚡</div>
          <div>
            <p className="text-[10px] font-bold uppercase text-violet-600 dark:text-violet-400 tracking-widest">Simulacro</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">Gana XP y Monedas</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
