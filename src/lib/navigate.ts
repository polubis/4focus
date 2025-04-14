import { navigate as astroNavigate } from "astro:transitions/client";

const ROUTES = {
  home: "/",
  sign_in: "/sign-in",
  sign_up: "/sign-up",
  sign_out: "/sign-out",
  new_task: "/new-task",
  tasks: "/tasks",
} satisfies Record<string, string>;

const navigate = (route: keyof typeof ROUTES) => {
  astroNavigate(`${ROUTES[route]}`);
};

export { navigate };
