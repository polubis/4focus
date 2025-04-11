import type { Database } from "../db/database.types";
import type { Prettify } from "../libs/types";

type TaskRow = Database["public"]["Tables"]["tasks"]["Row"];

type GetTasks = {
  dto: Prettify<
    Pick<
      TaskRow,
      | "id"
      | "created_at"
      | "status"
      | "status_history"
      | "updated_at"
      | "user_id"
      | "description"
      | "name"
    >
  >[];
};

export type { GetTasks };
