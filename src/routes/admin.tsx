import { Box } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

const Admin = () => {
  return (
    <Box>
      Admin
    </Box>
  );
};

export const Route = createFileRoute("/admin")({
  component: Admin,
});
