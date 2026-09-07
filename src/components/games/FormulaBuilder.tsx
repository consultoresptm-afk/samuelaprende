import { useState } from "react";
import { Puzzle, ArrowLeft, RefreshCw } from "lucide-react";

const FORMULAS_TO_BUILD = [
  {
    part1: "Seno(θ) = ",
    blank: "Cateto Opuesto",
    part2: " / Hipotenusa",
    options: ["Cateto Adyacente", "Cateto Opuesto", "Hipotenusa", "Seno(θ)"],
    answer: "Cateto Opuesto"
  },
  {
    part1: "h² = a² ",
    blank: "+",
    part2: " b²",
    options: ["+", "-", "*", "/"],
    answer: "+"
  },
  {
    part1: "a² - b² = (a + b)",
    blank: "(a - b)",
    part2: "",
    options: ["(a + b)", "(a - b)", "(a² + b²)", "(a - b)²"],
    answer: "(a - b)"
  },
  {
    part1: "Volumen de un Cilindro = ",
    blank: "π",
    part2: " * r² * h",
    options: ["2π", "π", "4/3", "1/2"],
    answer: "π"
  },
  {
    part1: "Ley de Cosenos: c² = a² + b² - 2ab * ",
    blank: "cos(C)",
    part2: "",
    options: ["sen(C)", "cos(C)", "tan(C)", "cos(B)"],
    answer: "cos(C)"
  }
];

export default function FormulaBuilder({ onBack }: { onBack: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentFormula = FORMULAS_TO_BUILD[currentIndex];

  const handleSelect = (option: string) => {
    if (selectedAnswer !== null) return; // Prevent multiple clicks

    setSelectedAnswer(option);
    const correct = option === currentFormula.answer;
    setIsCorrect(correct);

    if (correct) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentIndex < FORMULAS_TO_BUILD.length - 1) {
        setCurrentIndex(c => c + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setGameOver(true);
      }
    }, 1500);
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setGameOver(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-bold text-sm"
      >
        <ArrowLeft size={16} /> Volver a Juegos
      </button>

      <div className="bg-white dark:bg-slate-800/50 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-6">
          <Puzzle size={32} />
        </div>

        {!gameOver ? (
          <>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Constructor de Fórmulas</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Completa el espacio en blanco con la opción correcta.</p>

            <div className="flex justify-between items-center mb-4 text-sm font-bold text-slate-400 uppercase tracking-widest px-4">
              <span>Nivel {currentIndex + 1}/{FORMULAS_TO_BUILD.length}</span>
              <span>Puntos: {score}</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 mb-8 flex items-center justify-center flex-wrap gap-2 text-xl md:text-3xl font-serif italic font-bold text-slate-800 dark:text-slate-200">
              <span>{currentFormula.part1}</span>
              <span className={`inline-block min-w-[100px] text-center border-b-4 border-blue-500 pb-1 px-4 transition-colors ${
                selectedAnswer ? (isCorrect ? 'text-emerald-500 border-emerald-500' : 'text-red-500 border-red-500') : 'text-blue-500'
              }`}>
                {selectedAnswer || "?"}
              </span>
              <span>{currentFormula.part2}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentFormula.options.map((option, idx) => {
                let buttonStyle = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600";
                
                if (selectedAnswer !== null) {
                  if (option === currentFormula.answer) {
                    buttonStyle = "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-600 dark:text-emerald-400";
                  } else if (option === selectedAnswer) {
                    buttonStyle = "bg-red-50 dark:bg-red-900/30 border-red-500 text-red-600 dark:text-red-400";
                  } else {
                    buttonStyle = "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(option)}
                    disabled={selectedAnswer !== null}
                    className={`p-4 rounded-xl border-2 font-bold text-lg transition-all ${buttonStyle} ${selectedAnswer === null ? 'active:scale-95 hover:shadow-md' : ''}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="animate-in zoom-in-95 py-10">
            <h2 className="text-4xl font-black mb-2 text-slate-900 dark:text-white">¡Módulo Completado!</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">Puntuación Final: <strong className="text-blue-500 text-3xl">{score}/{FORMULAS_TO_BUILD.length}</strong></p>
            <button 
              onClick={restart}
              className="bg-blue-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={20} />
              Reintentar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
