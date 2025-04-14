import {
  AuthProvider,
  useAuthContext,
  useAuthContextSession,
} from "@/context/auth";
import type { GetTasks } from "@/contracts";
import { endpoint } from "@/lib/endpoint";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Button } from "../ui/button";
import { MessageSquareWarning, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getRoute, navigate } from "@/lib/navigate";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const ScreenLoader = () => {
  return (
    <div className="flex flex-col w-full">
      {Array.from({ length: 3 }, (_, i) => i + 1).map((index) => (
        <div key={index} className="mb-4">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-40 mt-1" />
        </div>
      ))}
    </div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-rows-[48px_1fr_52px] grid-cols-1 min-h-screen">
      <header className="px-3 flex items-center sticky top-0 left-0 bg-background border-b border-b-accent">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={getRoute("home")}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Tasks</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="py-2 px-3 flex items-center justify-center">
        {children}
      </main>
      <footer className="px-3 flex items-center sticky bottom-0 left-0 bg-background border-t border-t-accent">
        <div className="relative w-full">
          <Input placeholder="Type task name..." className="pr-12" />
          <Button className="absolute right-0 bottom-0" size="icon">
            <Plus />
          </Button>
        </div>
      </footer>
    </div>
  );
};

type TasksResult =
  | ["busy"]
  | ["ok", GetTasks["dto"]]
  | ["fail", GetTasks["error"]];

const TasksViewContent = () => {
  const session = useAuthContextSession();
  const [tasksResult, setTasksResult] = useState<TasksResult>(["busy"]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: Deps here are not needed
  useEffect(() => {
    const getTasks = async () => {
      const [ok, data] = await endpoint(
        "get_tasks",
        null,
        session.access_token,
      );

      ok ? setTasksResult(["ok", data]) : setTasksResult(["fail", data]);
    };

    getTasks();
  }, []);

  const [tasksStatus, tasksData] = tasksResult;

  if (tasksStatus === "busy") {
    return <ScreenLoader />;
  }

  if (tasksStatus === "fail") {
    return (
      <Alert variant="destructive">
        <MessageSquareWarning className="h-4 w-4" />
        <AlertTitle>
          {tasksData.type}/({tasksData.code})
        </AlertTitle>
        <AlertDescription>{tasksData.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <ul className="w-full">
      {tasksData.map((task) => (
        <li key={task.id}>
          <h1>{task.name}</h1>
          <p>{task.description}</p>
          <p>{task.priority}</p>
          <p>{task.status}</p>
          <p>{format(parseISO(task.c_date), "yyyy-MM-dd HH:mm:ss")}</p>
        </li>
      ))}
    </ul>
  );
};

const TaskViewContentProtected = () =>
  useAuthContext().session ? <TasksViewContent /> : <ScreenLoader />;

const TasksView = () => {
  return (
    <AuthProvider>
      <Layout>
        <TaskViewContentProtected />
      </Layout>
    </AuthProvider>
  );
};

export { TasksView };
