import type { User } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/db/supabase";
import { assert } from "@/lib/assert";

const AuthContext = createContext<{ user: User | undefined } | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return <AuthContext value={{ user }}>{children}</AuthContext>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  assert(context, "useAuthContext must be used within an AuthProvider");

  return context;
};

export { AuthProvider, useAuthContext };
