import type { GetTasks } from "../contracts";

type TasksViewModel = {
  tasks: GetTasks["dto"];
};

export type { TasksViewModel };
