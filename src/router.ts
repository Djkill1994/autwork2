import { createRouter, NotFoundRoute, redirect } from "@tanstack/react-router";
import { routeTree } from "~/routeTree.gen";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => routeTree,
  beforeLoad: () => {
    throw redirect({
      to: "/",
    });
  },
});

export const router = createRouter({
  routeTree,
  notFoundRoute,
});
