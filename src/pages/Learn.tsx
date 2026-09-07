import { useState } from "react";
import { FORMULAS } from "../data/mathData";
import { X } from "lucide-react";

export default function Learn() {
  const [selectedFormula, setSelectedFormula] = useState<typeof FORMULAS[0] | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Fórmulas Clave</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Repasa los conceptos antes de ponerte a prueba.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {FORMULAS.map((section, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedFormula(section)}
            className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-500/50 transition-all cursor-pointer group"
          >
            <h2 className="text-xl font-black mb-2 text-indigo-600 dark:text-indigo-400 uppercase tracking-widest group-hover:text-indigo-500 transition-colors">{section.category}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium line-clamp-2">{section.explanation}</p>
            
            <div className="space-y-3">
              {section.formulas.slice(0, 2).map((formula, fIdx) => (
                <div key={fIdx} className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center font-serif italic text-sm md:text-base font-bold text-slate-800 dark:text-slate-200 shadow-sm truncate px-4">
                  {formula}
                </div>
              ))}
              {section.formulas.length > 2 && (
                <div className="text-center text-xs font-bold text-indigo-500 mt-2">
                  + {section.formulas.length - 2} fórmulas más (Click para ver)
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedFormula && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedFormula(null)}>
          <div 
            className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{selectedFormula.category}</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">{selectedFormula.explanation}</p>
              </div>
              <button 
                onClick={() => setSelectedFormula(null)}
                className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 rounded-full transition-colors shrink-0 ml-4"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Fórmulas</h3>
              <div className="space-y-3 mb-8">
                {selectedFormula.formulas.map((formula, fIdx) => (
                  <div key={fIdx} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center font-serif italic text-lg font-bold text-slate-800 dark:text-slate-200 shadow-sm">
                    {formula}
                  </div>
                ))}
              </div>

              <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Método de Aplicación</h3>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl p-5 text-indigo-900 dark:text-indigo-200 text-sm md:text-base leading-relaxed space-y-2">
                {selectedFormula.applicationMethod.split('\n').map((step, idx) => (
                  <p key={idx} className="flex gap-2">
                    <span className="font-black text-indigo-500">{step.split('.')[0]}.</span>
                    <span>{step.substring(step.indexOf('.') + 1).trim()}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
