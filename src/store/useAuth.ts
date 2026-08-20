import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email: string, password: string) => {
        if (!email || !password) return false;
        const users = JSON.parse(localStorage.getItem("tradeflow-users") || "[]") as { name: string; email: string; password: string }[];
        const found = users.find((u) => u.email === email && u.password === password);
        if (found) {
          set({ user: { name: found.name, email: found.email }, isAuthenticated: true });
          return true;
        }
        return false;
      },

      signup: (name: string, email: string, password: string) => {
        if (!name || !email || !password) return false;
        const users = JSON.parse(localStorage.getItem("tradeflow-users") || "[]") as { name: string; email: string; password: string }[];
        if (users.some((u) => u.email === email)) return false;
        users.push({ name, email, password });
        localStorage.setItem("tradeflow-users", JSON.stringify(users));
        set({ user: { name, email }, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "tradeflow-auth",
    }
  )
);
