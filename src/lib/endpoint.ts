import type { GetTasks, PostTask } from "@/contracts";

type Endpoints =
  | {
      type: "create_task";
      contract: PostTask;
    }
  | { type: "get_tasks"; contract: GetTasks };

const CONFIG = {
  create_task: {
    method: "POST",
    url: "/api/tasks",
  },
  get_tasks: {
    method: "GET",
    url: "/api/tasks",
  },
} satisfies Record<
  string,
  { method: "POST" | "GET" | "PUT" | "DELETE"; url: string }
>;

type ParsedError<TType extends Endpoints["type"]> =
  | Extract<Endpoints, { type: TType }>["contract"]["error"]
  | { type: `client_error`; message: string; code: 0 };

const endpoint = async <TType extends Endpoints["type"]>(
  type: TType,
  payload: Extract<Endpoints, { type: TType }>["contract"]["payload"],
  authToken?: string,
): Promise<
  | [true, Extract<Endpoints, { type: TType }>["contract"]["dto"]]
  | [false, ParsedError<TType>]
> => {
  try {
    const response = await fetch(CONFIG[type].url, {
      method: CONFIG[type].method,
      headers:
        typeof authToken === "string"
          ? {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            }
          : {
              "Content-Type": "application/json",
            },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return response.ok ? [true, data] : [false, data];
  } catch (error) {
    return [
      false,
      {
        type: "client_error",
        message:
          error instanceof Error
            ? error.message
            : "Error occured on client side",
        code: 0,
      },
    ];
  }
};

export { endpoint };
