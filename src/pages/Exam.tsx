import { useState, useEffect } from "react";
import { EXAM_QUESTIONS } from "../data/mathData";
import { useAuth } from "../contexts/AuthContext";
import { doc, collection, addDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Clock, CheckCircle, XCircle, Trophy, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";

export default function Exam() {
  const { user, updateUserStats } = useAuth();
  
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per question or total? Let's do 5 mins total
  const [isFinished, setIsFinished] = useState(false);
  
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [showResolutionFor, setShowResolutionFor] = useState<number | null>(null);
  const [showHintFor, setShowHintFor] = useState<number | null>(null);

  // Timer logic
  useEffect(() => {
    if (hasStarted && !isFinished && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !isFinished) {
      finishExam();
    }
  }, [hasStarted, isFinished, timeLeft]);

  const startExam = () => {
    setHasStarted(true);
    setTimeLeft(300); // 5 minutes
    setCurrentQIndex(0);
    setAnswers({});
    setScore(0);
    setIsFinished(false);
  };

  const handleSelectOption = (option: string) => {
    if (answers[currentQIndex]) return; // already answered
    setAnswers(prev => ({ ...prev, [currentQIndex]: option }));
  };

  const handleNext = () => {
    if (currentQIndex < EXAM_QUESTIONS.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setShowHintFor(null);
    } else {
      finishExam();
    }
  };

  const finishExam = async () => {
    setIsFinished(true);
    
    // Calculate Score
    let correct = 0;
    Object.keys(answers).forEach((qIdxStr) => {
      const idx = parseInt(qIdxStr);
      if (answers[idx] === EXAM_QUESTIONS[idx].correctAnswer) {
        correct += 1;
      }
    });
    
    setScore(correct);

    const xpGained = correct * 20; // 20 XP per correct
    const coinsGained = correct * 5; // 5 coins per correct
    
    if (xpGained > 0 && user) {
       await updateUserStats(xpGained, coinsGained);
       
       // save session
       await addDoc(collection(db, "studySessions"), {
         userId: user.uid,
         date: new Date().toISOString().split("T")[0],
         mode: "exam",
         score: correct,
         totalQuestions: EXAM_QUESTIONS.length,
         durationSeconds: 300 - timeLeft,
         timestamp: new Date().toISOString()
       });

       if (correct === EXAM_QUESTIONS.length) {
         confetti({
           particleCount: 100,
           spread: 70,
           origin: { y: 0.6 }
         });
       }
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!hasStarted) {
    return (
      <div className="h-full flex flex-col items-center justify-center max-w-lg mx-auto text-center space-y-6 animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-gradient-to-br from-rose-500 to-orange-600 text-white rounded-full flex items-center justify-center mb-4 shadow-xl shadow-rose-900/20">
          <Clock size={48} />
        </div>
        <h1 className="text-4xl font-black">Simulacro Contrarreloj</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Tienes 5 minutos para resolver {EXAM_QUESTIONS.length} preguntas sobre identidades trigonométricas. 
          Gana XP y monedas por cada respuesta correcta.
        </p>
        <button 
          onClick={startExam}
          className="w-full bg-gradient-to-br from-rose-500 to-orange-600 hover:from-rose-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-rose-900/20 text-lg"
        >
          Comenzar Examen
        </button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
        <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-3xl p-8 text-center shadow-sm">
          <Trophy size={64} className="mx-auto text-amber-500 mb-4 drop-shadow-md" />
          <h2 className="text-3xl font-black mb-2 text-slate-900 dark:text-white">¡Examen Finalizado!</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-6">Obtuviste {score} de {EXAM_QUESTIONS.length} correctas.</p>
          
          <div className="flex justify-center gap-4 text-sm font-bold">
            <div className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-xl">
              +{score * 20} XP
            </div>
            <div className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-4 py-2 rounded-xl">
              +{score * 5} Monedas
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-xl px-2">Revisión:</h3>
          {EXAM_QUESTIONS.map((q, i) => {
            const isCorrect = answers[i] === q.correctAnswer;
            const didAnswer = !!answers[i];
            
            return (
              <div key={i} className={`border rounded-2xl p-5 ${isCorrect ? 'bg-emerald-50/50 border-emerald-200 dark:bg-slate-800/80 dark:border-emerald-500/30' : 'bg-rose-50/50 border-rose-200 dark:bg-slate-800/80 dark:border-rose-500/30'}`}>
                <div className="flex gap-3">
                  <div className="mt-1">
                    {isCorrect ? <CheckCircle className="text-emerald-500" size={24}/> : <XCircle className="text-rose-500" size={24}/>}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-lg mb-2 text-slate-900 dark:text-white">{q.question}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      Tu respuesta: <span className="font-mono bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">{answers[i] || 'No respondida'}</span>
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Respuesta correcta: <span className="font-mono text-emerald-600 dark:text-emerald-400">{q.correctAnswer}</span>
                    </p>
                    
                    <div className="mt-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300">
                      <strong className="block text-indigo-600 dark:text-indigo-400 uppercase tracking-widest text-xs mb-2">Resolución paso a paso:</strong>
                      {q.resolution}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button 
          onClick={startExam}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-4 px-6 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
        >
          <RefreshCw size={20} />
          Intentar de nuevo
        </button>
      </div>
    );
  }

  const currentQ = EXAM_QUESTIONS[currentQIndex];
  const answeredCurrent = !!answers[currentQIndex];

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-full animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <div className="bg-white dark:bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700/50 font-bold uppercase tracking-widest text-xs text-slate-500 shadow-sm">
          Pregunta {currentQIndex + 1} / {EXAM_QUESTIONS.length}
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-bold shadow-sm ${timeLeft < 60 ? 'bg-gradient-to-br from-rose-500 to-orange-600 text-white border-transparent' : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50'}`}>
          <Clock size={18} />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex-1">
        <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 md:p-8 shadow-sm mb-8">
          <p className="text-slate-500 text-lg mb-4 text-center">Simplifica la siguiente expresión:</p>
          <div className="bg-slate-50 dark:bg-slate-900 py-6 px-4 md:px-12 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 mb-8 flex justify-center items-center text-center">
            <span className="text-2xl md:text-3xl font-serif italic font-bold text-indigo-600 dark:text-indigo-300">{currentQ.question.replace('Simplifica la expresión: ', '').replace('¿A qué es igual ', '').replace('Evalúa: ', '').replace('Simplifica: ', '').replace('?', '')}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQ.options.map((opt, i) => {
              const isSelected = answers[currentQIndex] === opt;
              
              let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-colors font-bold flex items-center gap-3 ";
              const letter = String.fromCharCode(65 + i); // A, B, C, D
              
              if (!answeredCurrent) {
                btnClass += "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:border-indigo-500 dark:hover:bg-indigo-600/20";
              } else {
                if (isSelected) {
                   btnClass += "bg-indigo-100 border-indigo-500 text-indigo-700 dark:bg-indigo-600 dark:border-indigo-400 dark:text-white";
                } else {
                   btnClass += "bg-slate-50 border-slate-200 opacity-50 dark:bg-slate-900 dark:border-slate-800";
                }
              }

              return (
                <button 
                  key={i}
                  onClick={() => handleSelectOption(opt)}
                  disabled={answeredCurrent}
                  className={btnClass}
                >
                  <span className="w-8 h-8 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-black border border-slate-200 dark:border-slate-700/50">{letter}</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Hint Area */}
          {currentQ.hint && !answeredCurrent && (
            <div className="mt-6 flex flex-col items-center">
              {showHintFor === currentQIndex ? (
                <div className="w-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-xl p-4 text-amber-800 dark:text-amber-200 text-sm font-medium animate-in slide-in-from-top-2 duration-300">
                  <strong className="block text-amber-900 dark:text-amber-400 uppercase tracking-widest text-xs mb-1">💡 Pista:</strong>
                  {currentQ.hint}
                </div>
              ) : (
                <button 
                  onClick={() => setShowHintFor(currentQIndex)}
                  className="text-amber-600 dark:text-amber-500 text-sm font-bold hover:underline flex items-center gap-2"
                >
                  💡 Mostrar sugerencia (Pista)
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="pt-4">
        <button 
          onClick={handleNext}
          disabled={!answeredCurrent}
          className={`w-full font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 ${
            answeredCurrent 
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20' 
              : 'bg-slate-200 dark:bg-slate-800/50 text-slate-400 cursor-not-allowed'
          }`}
        >
          {currentQIndex === EXAM_QUESTIONS.length - 1 ? 'Finalizar Examen' : 'Siguiente Pregunta'}
        </button>
      </div>
    </div>
  );
}
