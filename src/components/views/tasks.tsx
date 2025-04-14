import {
  AuthProvider,
  useAuthContext,
  useAuthContextSession,
} from "@/context/auth";
import type { GetTasks } from "@/contracts";
import { endpoint } from "@/lib/endpoint";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";

const TasksViewContent = () => {
  const session = useAuthContextSession();
  const [tasks, setTasks] = useState<GetTasks["dto"]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Deps here are not needed
  useEffect(() => {
    const getTasks = async () => {
      const [ok, data] = await endpoint(
        "get_tasks",
        null,
        session.access_token,
      );

      if (ok) {
        setTasks(data);
      }
    };

    getTasks();
  }, []);

  return (
    <main className="p-4 min-h-screen flex items-center justify-center flex-col gap-8 max-w-lg mx-auto">
      {tasks.map((task) => (
        <div key={task.id}>
          <h1>{task.name}</h1>
          <p>{task.description}</p>
          <p>{task.priority}</p>
          <p>{task.status}</p>
          <p>{format(parseISO(task.c_date), "yyyy-MM-dd HH:mm:ss")}</p>
        </div>
      ))}
    </main>
  );
};

const TaskViewContentProtected = () => {
  const { session } = useAuthContext();

  if (!session) {
    return <div>Loading...</div>;
  }

  return <TasksViewContent />;
};

const TasksView = () => {
  return (
    <AuthProvider>
      <TaskViewContentProtected />
    </AuthProvider>
  );
};

export { TasksView };
