import { createFileRoute } from "@tanstack/react-router";
import { UserDashboard } from "~/features/User/components";
import { Box } from "@mui/material";

const User = () => {
  return (
    <Box>
      <UserDashboard />
    </Box>
  );
};

export const Route = createFileRoute("/user")({
  component: User,
});
