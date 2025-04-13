import { z } from "zod";
import type { Database } from "../db/database.types";
import type { Prettify } from "../libs/types";

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

const postTaskPayloadSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(200, "Name is too long"),
    description: z
      .string()
      .min(10, "Description is too short")
      .max(500, "Description is too long")
      .optional(),
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

export { postTaskPayloadSchema };
export type { GetTasks, PostTask };
