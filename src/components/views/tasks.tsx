import {
  AuthProvider,
  useAuthContext,
  useAuthContextSession,
} from "@/context/auth";
import type { GetTasks } from "@/contracts";
import { endpoint } from "@/lib/endpoint";
import React from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Check, Clock, MessageSquareWarning, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getRoute } from "@/lib/navigate";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Operation, Prettify } from "@/lib/types";
import { context } from "@/lib/dk/context";

const PRIORITY_LABELS = {
  1: "Urgent",
  2: "High",
  3: "Medium",
  4: "Low",
} satisfies Record<GetTasks["dto"][number]["priority"], string>;

type TasksViewState = {
  busy: boolean;
  error: GetTasks["error"] | null;
  tasks: Prettify<
    Pick<
      GetTasks["dto"][number],
      | "id"
      | "name"
      | "description"
      | "c_date"
      | "m_date"
      | "priority"
      | "status"
      | "status_history"
      | "user_id"
    > & {
      operation: Operation<null, GetTasks["error"]>;
    }
  >[];
};

type Action =
  | { type: "initialize" }
  | { type: "initialize_ok"; data: GetTasks["dto"] }
  | { type: "initialize_fail"; error: GetTasks["error"] };

const reducer: React.Reducer<TasksViewState, Action> = (state, action) => {
  switch (action.type) {
    case "initialize":
      return { ...state, busy: true, error: null, tasks: [] };
    case "initialize_ok":
      return {
        ...state,
        busy: false,
        error: null,
        tasks: action.data.map((task) => ({
          ...task,
          operation: ["idle"],
        })),
      };
    case "initialize_fail":
      return { ...state, busy: false, error: action.error };
    default:
      return state;
  }
};

const [ViewProvider, useViewContext] = context(() => {
  const session = useAuthContextSession();
  const [state, dispatch] = React.useReducer(reducer, {
    busy: true,
    error: null,
    tasks: [],
  });

  const dispatchMiddleware = React.useCallback(
    (action: Action) => {
      const effects: Partial<
        Record<Action["type"], (...args: unknown[]) => unknown>
      > = {
        initialize: async () => {
          const [ok, data] = await endpoint(
            "get_tasks",
            null,
            session.access_token,
          );

          ok
            ? dispatch({ type: "initialize_ok", data })
            : dispatch({ type: "initialize_fail", error: data });
        },
      };

      dispatch(action);

      effects[action.type]?.();
    },
    [session.access_token],
  );

  return React.useMemo(
    () => ({
      ...state,
      dispatch: dispatchMiddleware,
    }),
    [state, dispatchMiddleware],
  );
});

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
      <main className="py-4 px-3 flex items-center justify-center">
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

const FocusScreen = ({
  name,
  description,
}: Pick<GetTasks["dto"][number], "name" | "description">) => {
  const markAsCompleted = () => {};

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-card p-4 text-card-foreground flex flex-col rounded-lg border shadow-sm w-full max-w-md">
        <header>
          <p className="text-xl text-center">Focusing On:</p>
          <h1 className="text-2xl text-center font-bold">{name}</h1>
          {description && <p className="text-center mt-2">{description}</p>}
        </header>
        <footer className="mt-6 flex flex-col gap-3">
          <Button className="w-full">
            <Check /> Mark As Completed
          </Button>
          <Button variant="outline" className="w-full">
            Bypass Focus Mode
          </Button>
        </footer>
      </div>
    </main>
  );
};

const TasksViewContent = () => {
  const { busy, error, tasks, dispatch } = useViewContext();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Deps here are not needed
  React.useEffect(() => {
    dispatch({ type: "initialize" });
  }, []);

  if (busy) {
    return <ScreenLoader />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <MessageSquareWarning className="h-4 w-4" />
        <AlertTitle>
          {error.type}/({error.code})
        </AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <ul className="w-full flex flex-col gap-2">
      {tasks.map((task) => {
        if (task.status === "todo") {
          return (
            <li
              className="bg-card py-2 px-3 text-card-foreground flex flex-col rounded-lg border shadow-sm"
              key={task.id}
            >
              <div className="flex justify-between">
                <h2 className="font-semibold pr-4">{task.name}</h2>
                <p className="text-sm">{PRIORITY_LABELS[task.priority]}</p>
              </div>
              {task.description && <p>{task.description}</p>}
              <Button className="w-fit mt-4" variant="outline">
                <Clock />
                Start
              </Button>
            </li>
          );
        }

        if (task.status === "pending") {
          return (
            <li
              className="bg-card py-2 px-3 text-card-foreground flex flex-col rounded-lg border shadow-sm"
              key={task.id}
            >
              <div className="flex justify-between">
                <h2 className="font-semibold pr-4">{task.name}</h2>
                <p className="text-sm">{PRIORITY_LABELS[task.priority]}</p>
              </div>
              {task.description && <p>{task.description}</p>}
              <Button className="w-fit mt-4" variant="outline">
                <Clock />
                In Progress
              </Button>
            </li>
          );
        }

        return (
          <li
            className="bg-card py-2 px-3 text-card-foreground flex flex-col rounded-lg border shadow-sm"
            key={task.id}
          >
            <div className="flex justify-between">
              <h2 className="font-semibold pr-4">{task.name}</h2>
              <p className="text-sm">{PRIORITY_LABELS[task.priority]}</p>
            </div>
            {task.description && <p>{task.description}</p>}
            <Button className="line-through w-fit mt-4" variant="outline">
              <Check />
              Done in {formatDistanceToNow(parseISO(task.c_date))}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

const TaskViewContentProtected = () =>
  useAuthContext().session ? (
    <ViewProvider>
      <TasksViewContent />
    </ViewProvider>
  ) : (
    <ScreenLoader />
  );

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
