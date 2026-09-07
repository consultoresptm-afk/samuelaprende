import { useState } from "react";
import { Check, X, ArrowLeft, Zap } from "lucide-react";
import { FLASHCARDS } from "../../data/mathData";
import { useAuth } from "../../contexts/AuthContext";

export default function TrueFalseGame({ onBack }: { onBack: () => void }) {
  const { updateUserStats } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  // Generate a mixed list of true and false statements based on flashcards
  const [statements] = useState(() => {
    const mixed = FLASHCARDS.map((fc, i) => {
      // 50% chance to be true
      const isTrue = Math.random() > 0.5;
      if (isTrue) {
        return { text: `${fc.front} = ${fc.back}`, isTrue: true, explanation: "Correcto." };
      } else {
        // Pick a random wrong answer
        const wrongIndex = (i + 1) % FLASHCARDS.length;
        return { 
          text: `${fc.front} = ${FLASHCARDS[wrongIndex].back}`, 
          isTrue: false, 
          explanation: `Falso. La respuesta correcta es: ${fc.back}` 
        };
      }
    }).sort(() => 0.5 - Math.random()).slice(0, 10); // 10 questions
    return mixed;
  });

  const handleAnswer = (userAnswer: boolean) => {
    const isCorrect = statements[currentIndex].isTrue === userAnswer;
    
    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < statements.length - 1) {
        setCurrentIndex(c => c + 1);
      } else {
        setGameOver(true);
        const finalScore = isCorrect ? score + 1 : score;
        if (finalScore > 0) {
          updateUserStats(finalScore * 10, finalScore * 2);
        }
      }
    }, 1200);
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setGameOver(false);
    // Ideally regenerate statements, but for simplicity we'll just restart index
    // To regenerate we'd need to lift the state or use a re-init function
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors font-bold text-sm"
      >
        <ArrowLeft size={16} /> Volver a Juegos
      </button>

      <div className="bg-white dark:bg-slate-800/50 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm text-center relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-6">
          <Zap size={32} />
        </div>
        
        {!gameOver ? (
          <>
            <div className="flex justify-between items-center mb-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
              <span>Pregunta {currentIndex + 1}/10</span>
              <span>Puntos: {score}</span>
            </div>

            <div className={`min-h-[150px] flex items-center justify-center p-6 rounded-2xl mb-8 transition-colors ${
              feedback === 'correct' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200' :
              feedback === 'incorrect' ? 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200' :
              'bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100'
            }`}>
              <h2 className="text-2xl md:text-3xl font-black italic font-serif">
                {statements[currentIndex].text}
              </h2>
            </div>

            {feedback && (
              <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/90 z-10 flex flex-col items-center justify-center animate-in fade-in duration-200">
                {feedback === 'correct' ? (
                  <Check size={80} className="text-emerald-500 animate-bounce mb-4" />
                ) : (
                  <X size={80} className="text-red-500 animate-bounce mb-4" />
                )}
                <p className="text-lg font-bold text-slate-700 dark:text-slate-300 max-w-md px-6">
                  {statements[currentIndex].explanation}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleAnswer(false)}
                disabled={feedback !== null}
                className="bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 p-6 rounded-2xl font-black text-xl flex flex-col items-center gap-2 transition-transform active:scale-95"
              >
                <X size={32} />
                FALSO
              </button>
              <button 
                onClick={() => handleAnswer(true)}
                disabled={feedback !== null}
                className="bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 p-6 rounded-2xl font-black text-xl flex flex-col items-center gap-2 transition-transform active:scale-95"
              >
                <Check size={32} />
                VERDADERO
              </button>
            </div>
          </>
        ) : (
          <div className="animate-in zoom-in-95">
            <h2 className="text-4xl font-black mb-2 text-slate-900 dark:text-white">Fin del Juego</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">Puntuación: <strong className="text-emerald-500 text-3xl">{score}/10</strong></p>
            <button 
              onClick={restart}
              className="bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all"
            >
              Jugar de Nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
