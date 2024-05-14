import { Box } from "@mui/material";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Header } from "~/libs/ui-ukit/Header";

export const Route = createRootRoute({
  component: () => (
    <Box height="100vh">
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </Box>
  ),
});
