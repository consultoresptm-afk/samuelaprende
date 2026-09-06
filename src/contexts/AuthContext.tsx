import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

interface AppUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  score: number;
  level: number;
  coins: number;
  streak: number;
  lastStudyDate: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  updateUserStats: (addedScore: number, addedCoins: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  updateUserStats: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        
        let appUserData: AppUser;

        const today = new Date().toISOString().split("T")[0];

        if (userSnap.exists()) {
          const data = userSnap.data();
          let newStreak = data.streak || 0;
          let newLastStudyDate = data.lastStudyDate || "";
          
          if (newLastStudyDate) {
            const lastDate = new Date(newLastStudyDate);
            const currentDate = new Date(today);
            const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            if (diffDays === 1) {
              newStreak += 1;
            } else if (diffDays > 1) {
              newStreak = 0;
            }
          } else {
             newStreak = 1;
          }

          if (newLastStudyDate !== today) {
             newLastStudyDate = today;
             await setDoc(userRef, { streak: newStreak, lastStudyDate: newLastStudyDate }, { merge: true });
          }

          appUserData = {
            uid: firebaseUser.uid,
            displayName: data.displayName || firebaseUser.displayName || "Estudiante Anónimo",
            email: firebaseUser.email,
            score: data.score || 0,
            level: data.level || 1,
            coins: data.coins || 0,
            streak: newStreak,
            lastStudyDate: newLastStudyDate
          };
        } else {
          appUserData = {
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName || "Estudiante Anónimo",
            email: firebaseUser.email,
            score: 0,
            level: 1,
            coins: 0,
            streak: 1,
            lastStudyDate: today
          };
          await setDoc(userRef, {
            ...appUserData,
            createdAt: new Date().toISOString()
          });
        }
        setUser(appUserData);
        setLoading(false);
      } else {
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.error("Error logging in anonymously:", error);
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const updateUserStats = async (addedScore: number, addedCoins: number) => {
    if (!user) return;
    
    const newScore = user.score + addedScore;
    const newCoins = user.coins + addedCoins;
    const newLevel = Math.floor(newScore / 100) + 1; // Level up every 100 points
    
    const updatedUser = {
      ...user,
      score: newScore,
      coins: newCoins,
      level: newLevel
    };
    
    setUser(updatedUser);
    
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      score: newScore,
      coins: newCoins,
      level: newLevel,
      displayName: user.displayName // ensure it stays updated
    }, { merge: true });
  };

  return (
    <AuthContext.Provider value={{ user, loading, updateUserStats }}>
      {children}
    </AuthContext.Provider>
  );
}
