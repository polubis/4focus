import type { Session } from "@supabase/supabase-js";
import React from "react";
import { supabase } from "@/db/supabase";
import { assert } from "@/lib/assert";

type AuthContextValue = {
  session: Session | null;
};

const AuthContext = React.createContext<AuthContextValue>({
  session: null,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] =
    React.useState<AuthContextValue["session"]>(null);

  React.useEffect(() => {
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
  const context = React.useContext(AuthContext);

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
