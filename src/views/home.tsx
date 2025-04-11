import { AppNavMobile } from "../components/app-nav-mobile";
import { AuthProvider } from "../context/auth";

export const HomeView = () => {
  return (
    <AuthProvider>
      <AppNavMobile />
    </AuthProvider>
  );
};
