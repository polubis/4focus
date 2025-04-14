import type { Session } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/db/supabase";
import { assert } from "@/lib/assert";

type AuthContextValue = {
  session: Session | null;
};

const AuthContext = createContext<AuthContextValue>({
  session: null,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AuthContextValue["session"]>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return <AuthContext value={{ session }}>{children}</AuthContext>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  assert(
    context,
    `${useAuthContext.name} must be used within an ${AuthProvider.name}`,
  );

  return context;
};

const useAuthContextSession = () => {
  const context = useAuthContext();

  assert(context.session, "No session found");

  return context.session;
};

export { AuthProvider, useAuthContext, useAuthContextSession };
