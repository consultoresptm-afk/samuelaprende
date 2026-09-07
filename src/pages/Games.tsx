import { useState, useEffect } from "react";
import { FLASHCARDS } from "../data/mathData";
import { RefreshCw, Trophy, Gamepad2, BrainCircuit } from "lucide-react";

interface Card {
  id: string;
  pairId: number;
  text: string;
  isMatched: boolean;
}

export default function Games() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // Initialize Game
  const initGame = () => {
    // Select 6 random flashcards to make 6 pairs (12 cards total)
    const shuffledFlashcards = [...FLASHCARDS].sort(() => 0.5 - Math.random()).slice(0, 6);
    
    let initialCards: Card[] = [];
    shuffledFlashcards.forEach((flashcard, index) => {
      // Add Front
      initialCards.push({
        id: `front-${index}`,
        pairId: index,
        text: flashcard.front,
        isMatched: false
      });
      // Add Back
      initialCards.push({
        id: `back-${index}`,
        pairId: index,
        text: flashcard.back,
        isMatched: false
      });
    });

    // Shuffle cards
    initialCards = initialCards.sort(() => 0.5 - Math.random());
    
    setCards(initialCards);
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
    setIsWon(false);
    setIsLocked(false);
  };

  // Start game on mount
  useEffect(() => {
    initGame();
  }, []);

  // Handle Card Click
  const handleCardClick = (index: number) => {
    // Prevent clicking if locked, already matched, or already flipped
    if (isLocked || cards[index].isMatched || flippedIndices.includes(index)) {
      return;
    }

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // If two cards are flipped
    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves((m) => m + 1);

      const [firstIndex, secondIndex] = newFlipped;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      // Check Match
      if (firstCard.pairId === secondCard.pairId) {
        // Match!
        const newCards = [...cards];
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setCards(newCards);
        setMatches((m) => m + 1);
        setFlippedIndices([]);
        setIsLocked(false);

        // Check Win
        if (matches + 1 === cards.length / 2) {
          setIsWon(true);
        }
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1200);
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Gamepad2 size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Memorama Matemático</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Encuentra los pares (Pregunta - Respuesta) para ganar.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm font-bold bg-slate-50 dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <BrainCircuit size={16} className="text-pink-500" />
            <span className="text-slate-600 dark:text-slate-300">Movimientos:</span>
            <span className="text-slate-900 dark:text-white">{moves}</span>
          </div>
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2"></div>
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-amber-500" />
            <span className="text-slate-600 dark:text-slate-300">Pares:</span>
            <span className="text-slate-900 dark:text-white">{matches} / 6</span>
          </div>
        </div>
      </div>

      {isWon ? (
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-10 text-center text-white shadow-xl animate-in zoom-in-95 duration-500">
          <Trophy size={64} className="mx-auto mb-6 text-amber-300 animate-bounce" />
          <h2 className="text-4xl font-black mb-2">¡Completado!</h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-md mx-auto">Has logrado emparejar todos los conceptos en {moves} movimientos. ¡Excelente repaso!</p>
          <button 
            onClick={initGame}
            className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto shadow-lg"
          >
            <RefreshCw size={20} />
            Jugar de nuevo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {cards.map((card, index) => {
            const isFlipped = flippedIndices.includes(index) || card.isMatched;

            return (
              <div 
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`relative h-32 md:h-40 rounded-2xl cursor-pointer transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : 'hover:scale-[1.02]'} ${card.isMatched ? 'opacity-50' : 'opacity-100'}`}
                style={{ perspective: "1000px" }}
              >
                {/* Contenedor interno que gira */}
                <div 
                  className={`absolute w-full h-full rounded-2xl transition-transform duration-500 shadow-md ${isFlipped ? 'rotate-y-180' : ''}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Cara Frontal (Oculta) */}
                  <div 
                    className="absolute w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center border border-indigo-400 dark:border-indigo-500/50 backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="text-4xl opacity-20">?</span>
                  </div>

                  {/* Cara Trasera (Descubierta) */}
                  <div 
                    className="absolute w-full h-full bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center p-3 text-center border-2 border-indigo-200 dark:border-indigo-500/30 backface-hidden"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <span className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-4">
                      {card.text}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
