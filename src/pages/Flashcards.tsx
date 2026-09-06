import { useState } from "react";
import { FLASHCARDS } from "../data/trigonometry";
import { ArrowRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % FLASHCARDS.length);
    }, 150); // wait for flip back before changing content
  };

  const currentCard = FLASHCARDS[currentIndex];

  return (
    <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500 py-10">
      <div className="text-center">
        <h1 className="text-3xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">Modo Flashcard</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Toca la tarjeta para ver la respuesta.</p>
        <p className="text-[10px] uppercase tracking-widest text-pink-600 dark:text-pink-400 font-bold mt-4">Tarjeta {currentIndex + 1} de {FLASHCARDS.length}</p>
      </div>

      <div className="w-full aspect-[4/3] md:aspect-[3/2] relative perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
        <AnimatePresence initial={false} mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-white dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700/50 rounded-3xl p-8 flex items-center justify-center text-center shadow-xl shadow-indigo-900/5 cursor-pointer hover:border-indigo-500/50 transition-colors"
            >
              <h2 className="text-3xl md:text-5xl font-serif italic font-bold text-slate-900 dark:text-white">{currentCard.front}</h2>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-3xl p-8 flex items-center justify-center text-center shadow-xl shadow-indigo-600/30 cursor-pointer text-white border-2 border-indigo-400/50"
            >
              <h2 className="text-3xl md:text-5xl font-serif italic font-bold">{currentCard.back}</h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-4 w-full">
        <button 
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex-1 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-4 px-6 rounded-2xl transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700/50"
        >
          <RotateCcw size={20} />
          Girar
        </button>
        <button 
          onClick={handleNext}
          className="flex-1 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-bold py-4 px-6 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20"
        >
          Siguiente
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
