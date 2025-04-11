import type { Database } from "../db/database.types";

type TodoRow = Database["public"]["Tables"]["todos"]["Row"];

type GetTodos = {
  dto: Pick<
    TodoRow,
    "id" | "created_at" | "status" | "status_history" | "updated_at" | "user_id"
  >[];
};

export type { GetTodos };
