import { z } from "zod";
import type { Database } from "../db/database.types";
import type { Prettify } from "../lib/types";

type TaskRow = Database["public"]["Tables"]["tasks"]["Row"];

type GetTasks = {
  dto: Prettify<
    Pick<
      TaskRow,
      | "id"
      | "status"
      | "status_history"
      | "user_id"
      | "description"
      | "name"
      | "c_date"
      | "m_date"
    >
  >[];
};

const TASKS_PRIORITY_VALUES = ["1", "2", "3", "4"] as const;

const postTaskPayloadSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(200, "Name is too long"),
    description: z
      .string()
      .trim()
      .min(10, "Description is too short")
      .max(500, "Description is too long")
      .optional(),
    priority: z.enum(TASKS_PRIORITY_VALUES),
  })
  .strict();

type PostTask = {
  dto: Prettify<
    Pick<
      TaskRow,
      | "id"
      | "status"
      | "status_history"
      | "user_id"
      | "description"
      | "name"
      | "c_date"
      | "m_date"
      | "priority"
    >
  >;
  payload: z.infer<typeof postTaskPayloadSchema>;
  error:
    | ({
        message: string;
        type: `bad_request`;
        code: 400;
      } & Prettify<z.inferFlattenedErrors<typeof postTaskPayloadSchema>>)
    | { type: `unauthorized`; message: string; code: 401 }
    | { type: `forbidden`; message: string; code: 403 }
    | { type: `unprocessable_entity`; message: string; code: 422 }
    | { type: `internal_server_error`; message: string; code: 500 };
};

export { postTaskPayloadSchema, TASKS_PRIORITY_VALUES };
export type { GetTasks, PostTask };
