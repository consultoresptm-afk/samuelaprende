import { useState } from "react";
import MemoryGame from "../components/games/MemoryGame";
import SpeedMath from "../components/games/SpeedMath";
import TrueFalseGame from "../components/games/TrueFalseGame";
import FormulaBuilder from "../components/games/FormulaBuilder";
import { Gamepad2, Timer, Zap, Puzzle } from "lucide-react";

type GameType = 'hub' | 'memory' | 'speed' | 'truefalse' | 'formula';

export default function Games() {
  const [activeGame, setActiveGame] = useState<GameType>('hub');

  if (activeGame === 'memory') return <MemoryGame onBack={() => setActiveGame('hub')} />;
  if (activeGame === 'speed') return <SpeedMath onBack={() => setActiveGame('hub')} />;
  if (activeGame === 'truefalse') return <TrueFalseGame onBack={() => setActiveGame('hub')} />;
  if (activeGame === 'formula') return <FormulaBuilder onBack={() => setActiveGame('hub')} />;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Zona de Juegos</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Elige un mini-juego para afianzar tus conocimientos matemáticos de forma divertida.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Game 1: Memory */}
        <div 
          onClick={() => setActiveGame('memory')}
          className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-500/50 transition-all cursor-pointer group flex flex-col md:flex-row gap-6 items-center"
        >
          <div className="w-20 h-20 shrink-0 rounded-2xl bg-indigo-50 dark:bg-indigo-900/50 text-indigo-500 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            <Gamepad2 size={40} />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-indigo-500 transition-colors">Memorama Matemático</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Encuentra los pares entre preguntas y respuestas. Ejercita tu memoria visual con las fórmulas.</p>
          </div>
        </div>

        {/* Game 2: Speed Math */}
        <div 
          onClick={() => setActiveGame('speed')}
          className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-rose-500/50 transition-all cursor-pointer group flex flex-col md:flex-row gap-6 items-center"
        >
          <div className="w-20 h-20 shrink-0 rounded-2xl bg-rose-50 dark:bg-rose-900/50 text-rose-500 dark:text-rose-400 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
            <Timer size={40} />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-rose-500 transition-colors">Cálculo Rápido</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Tienes 60 segundos para resolver la mayor cantidad de operaciones aritméticas posibles.</p>
          </div>
        </div>

        {/* Game 3: True or False */}
        <div 
          onClick={() => setActiveGame('truefalse')}
          className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all cursor-pointer group flex flex-col md:flex-row gap-6 items-center"
        >
          <div className="w-20 h-20 shrink-0 rounded-2xl bg-emerald-50 dark:bg-emerald-900/50 text-emerald-500 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            <Zap size={40} />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors">Verdadero o Falso</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Lee rápidamente la igualdad matemática y decide si es correcta o incorrecta bajo presión.</p>
          </div>
        </div>

        {/* Game 4: Formula Builder */}
        <div 
          onClick={() => setActiveGame('formula')}
          className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all cursor-pointer group flex flex-col md:flex-row gap-6 items-center"
        >
          <div className="w-20 h-20 shrink-0 rounded-2xl bg-blue-50 dark:bg-blue-900/50 text-blue-500 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
            <Puzzle size={40} />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">Constructor de Fórmulas</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">A la fórmula le falta una pieza. Elige la opción correcta para completarla y ganar puntos.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
