import { useState, useEffect } from "react";
import { Timer, Trophy, ArrowLeft, Play, XCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function SpeedMath({ onBack }: { onBack: () => void }) {
  const { updateUserStats } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState({ q: "", ans: 0 });
  const [userAnswer, setUserAnswer] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const generateQuestion = () => {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b, ans;

    if (op === '+') {
      a = Math.floor(Math.random() * 50) + 10;
      b = Math.floor(Math.random() * 50) + 10;
      ans = a + b;
    } else if (op === '-') {
      a = Math.floor(Math.random() * 50) + 20;
      b = Math.floor(Math.random() * a); // Ensure positive result
      ans = a - b;
    } else {
      a = Math.floor(Math.random() * 12) + 2;
      b = Math.floor(Math.random() * 12) + 2;
      ans = a * b;
    }

    setQuestion({ q: `${a} ${op} ${b}`, ans });
    setUserAnswer("");
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(60);
    generateQuestion();
  };

  useEffect(() => {
    let timer: any;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setGameOver(true);
      if (score > 0) {
        updateUserStats(score * 10, score * 2);
      }
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userAnswer) === question.ans) {
      setScore(s => s + 1);
      generateQuestion();
    } else {
      // Wrong answer effect
      setUserAnswer("");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-rose-600 transition-colors font-bold text-sm"
      >
        <ArrowLeft size={16} /> Volver a Juegos
      </button>

      <div className="bg-white dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4">
          <Timer size={32} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Cálculo Rápido</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Resuelve tantas operaciones como puedas en 60 segundos. ¡Entrena tu agilidad mental!</p>

        {!isPlaying && !gameOver && (
          <button 
            onClick={startGame}
            className="bg-rose-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-rose-600 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto shadow-lg shadow-rose-500/30"
          >
            <Play size={20} fill="currentColor" />
            Empezar Reto
          </button>
        )}

        {isPlaying && (
          <div className="animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-8 px-4">
              <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-xl font-mono text-xl font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Timer size={20} className={timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-slate-400"} />
                {timeLeft}s
              </div>
              <div className="bg-rose-50 dark:bg-rose-900/20 px-4 py-2 rounded-xl font-mono text-xl font-bold text-rose-600 dark:text-rose-400">
                Puntos: {score}
              </div>
            </div>

            <div className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">
              {question.q}
            </div>

            <form onSubmit={handleSubmit} className="max-w-xs mx-auto">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                autoFocus
                className="w-full text-center text-3xl font-bold py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 focus:border-rose-500 focus:ring-0 transition-colors"
                placeholder="?"
              />
              <button type="submit" className="hidden">Submit</button>
            </form>
          </div>
        )}

        {gameOver && (
          <div className="animate-in slide-in-from-bottom-4">
            <div className="w-24 h-24 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/20">
              <Trophy size={40} className="text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">¡Tiempo Terminado!</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">Has conseguido <span className="font-black text-rose-500 text-3xl">{score}</span> aciertos.</p>
            
            <button 
              onClick={startGame}
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-8 py-4 rounded-xl hover:scale-105 active:scale-95 transition-all mx-auto shadow-lg"
            >
              Jugar de Nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
