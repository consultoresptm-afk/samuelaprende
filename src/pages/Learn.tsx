import { FORMULAS } from "../data/trigonometry";

export default function Learn() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Fórmulas Clave</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Repasa las identidades trigonométricas antes de ponerte a prueba.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {FORMULAS.map((section, index) => (
          <div key={index} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-black mb-2 text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{section.category}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">{section.explanation}</p>
            
            <div className="space-y-3">
              {section.formulas.map((formula, fIdx) => (
                <div key={fIdx} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center font-serif italic text-lg md:text-xl font-bold text-slate-800 dark:text-slate-200 shadow-sm">
                  {formula}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
