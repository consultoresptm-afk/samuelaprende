import { Outlet, Link, useLocation } from "react-router";
import { BookOpen, Layers, Zap, Trophy, LayoutDashboard, Moon, Sun, Bell } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Layout() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: "Inicio", path: "/", icon: LayoutDashboard },
    { name: "Fórmulas", path: "/learn", icon: BookOpen },
    { name: "Flashcards", path: "/flashcards", icon: Layers },
    { name: "Examen", path: "/exam", icon: Zap },
    { name: "Ranking", path: "/leaderboard", icon: Trophy },
  ];

  const requestNotifications = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("¡Recordatorios activados!", {
            body: "Te recordaremos repasar para tu examen de identidades trigonométricas.",
            icon: "/favicon.ico"
          });
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-sans transition-colors duration-200">
      {/* Sidebar / Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-white dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 md:relative md:w-64 md:border-t-0 md:border-r md:h-screen z-50 flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="hidden md:flex p-6 items-center gap-3">
            <div className="w-12 h-12 shrink-0 bg-gradient-to-tr from-pink-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20 text-white">
              <span className="text-2xl font-black">S</span>
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-400 truncate">SamuelAprende</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold truncate">Trigonometría Master</span>
            </div>
          </div>
          <div className="flex md:flex-col justify-around md:justify-start p-2 md:p-4 gap-1 md:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 p-2 md:px-4 md:py-3 rounded-xl transition-all ${
                    isActive 
                      ? "bg-slate-200 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border border-transparent dark:border-slate-700/50" 
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-50 border border-transparent"
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs md:text-sm">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden md:flex flex-col p-4 gap-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex justify-between gap-2">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Alternar tema"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={requestNotifications}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ml-auto"
              title="Activar notificaciones"
            >
              <Bell size={20} />
            </button>
          </div>
          {user && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-transparent dark:border-violet-500 overflow-hidden flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-b from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                  {user.displayName?.charAt(0).toUpperCase() || "S"}
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate">{user.displayName}</p>
                <p className="text-[10px] text-pink-600 dark:text-pink-400 font-bold tracking-widest uppercase truncate">NIVEL {user.level} • {user.coins} 💰</p>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto pb-16 md:pb-0">
        {/* Mobile Header (only visible on mobile) */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-pink-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg text-white font-black">S</div>
            <h1 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-400">SamuelAprende</h1>
          </div>
          <div className="flex items-center gap-2">
             <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 text-slate-600 dark:text-slate-300">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
             </button>
          </div>
        </header>
        <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
          <Outlet />
        </div>
        
        {/* Persistent bottom bar like in design */}
        <div className="h-12 bg-indigo-600 px-6 flex items-center justify-between text-xs font-bold overflow-hidden shrink-0 text-white mt-auto rounded-t-xl mx-4 md:mx-6 md:rounded-t-2xl shadow-[0_-4px_20px_rgba(79,70,229,0.3)]">
          <div className="flex items-center gap-2 md:gap-4 truncate">
            <span className="animate-pulse">🔔</span>
            <span className="truncate">PRÓXIMO REPASO: Mañana a las 4:00 PM - "Examen de Identidades"</span>
          </div>
          <div className="hidden md:flex gap-4">
            <span>ID: #SAM-2024-MATH</span>
            <span className="bg-white/20 px-2 py-0.5 rounded">MODO OSCURO ACTIVO</span>
          </div>
        </div>
      </main>
    </div>
  );
}
