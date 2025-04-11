import { useAuthContext } from "../context/auth";

export const AppNavMobile = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <div>Lack of session</div>;
  }

  return <div>Session user id: {user.id}</div>;
};
