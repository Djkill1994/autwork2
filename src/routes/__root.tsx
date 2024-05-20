import { Box } from "@mui/material";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Header } from "src/libs/ui-kit";

export const Route = createRootRoute({
  component: () => (
    <Box height="100vh" sx={{ overflow: "hidden" }}>
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </Box>
  ),
});
