import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Trophy, Medal } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface LeaderboardUser {
  id: string;
  displayName: string;
  score: number;
  level: number;
}

export default function Leaderboard() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const q = query(collection(db, "users"), orderBy("score", "desc"), limit(20));
        const querySnapshot = await getDocs(q);
        const fetchedUsers: LeaderboardUser[] = [];
        querySnapshot.forEach((doc) => {
          fetchedUsers.push({ id: doc.id, ...doc.data() } as LeaderboardUser);
        });
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="h-full flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2 mb-8">
        <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-orange-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-orange-500/20">
          <Trophy size={32} />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Clasificación Global</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Compara tus resultados con otros estudiantes.</p>
      </div>

      <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-3xl overflow-hidden shadow-sm">
        {users.map((u, index) => {
          const isMe = currentUser?.uid === u.id;
          
          let RankIcon = null;
          if (index === 0) RankIcon = <Medal className="text-yellow-500" size={24} />;
          else if (index === 1) RankIcon = <Medal className="text-gray-400" size={24} />;
          else if (index === 2) RankIcon = <Medal className="text-amber-700" size={24} />;
          else RankIcon = <span className="font-bold text-neutral-400 w-6 text-center">{index + 1}</span>;

          return (
            <div 
              key={u.id} 
              className={`flex items-center p-4 border-b border-slate-100 dark:border-slate-800/50 last:border-0 ${isMe ? 'bg-indigo-50/80 dark:bg-indigo-500/10 dark:border-indigo-500/20' : ''}`}
            >
              <div className="w-12 flex justify-center mr-2">{RankIcon}</div>
              
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 border border-transparent dark:border-slate-600 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 mr-4 shadow-sm">
                {u.displayName?.charAt(0).toUpperCase() || "U"}
              </div>
              
              <div className="flex-1">
                <p className="font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                  {u.displayName || "Usuario Anónimo"}
                  {isMe && <span className="text-[10px] uppercase tracking-wider bg-indigo-500 text-white px-2 py-0.5 rounded shadow-sm">Tú</span>}
                </p>
                <p className="text-xs text-slate-500 font-medium">Nivel {u.level}</p>
              </div>
              
              <div className="text-right">
                <p className="font-mono font-bold text-lg text-indigo-600 dark:text-indigo-400">{u.score.toLocaleString()}</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">XP</p>
              </div>
            </div>
          );
        })}
        {users.length === 0 && (
          <div className="p-8 text-center text-slate-500 font-medium">
            Aún no hay jugadores. ¡Sé el primero en jugar el examen!
          </div>
        )}
      </div>
    </div>
  );
}
