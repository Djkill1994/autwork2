import { Box } from "@mui/material";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Header } from "src/libs/ui-kit";
import { Toaster } from "react-hot-toast";

export const Route = createRootRoute({
  component: () => (
    <Box height="100vh" sx={{ overflow: "hidden" }}>
      <Toaster position="top-right" />
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </Box>
  ),
});
