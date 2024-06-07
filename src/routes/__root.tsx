import { Box } from "@mui/material";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "src/libs/ui-kit";
import { Toaster } from "react-hot-toast";

export const Route = createRootRoute({
  component: () => (
    <Box height="100vh">
      <Toaster position="top-right" />
      <Header />
      <Outlet />
    </Box>
  ),
});
