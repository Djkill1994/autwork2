import { createFileRoute } from "@tanstack/react-router";
import { authCheck } from "~/features/Auth/helpers";
import { AuthLoginForm } from "~/features/Auth/components";
import { Box } from "@mui/material";

const Index = () => {
  return (
    <Box display="flex" justifyContent="center" height="100%" p="70px">
      <AuthLoginForm />
    </Box>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: ({ location }) => authCheck(location),
});
