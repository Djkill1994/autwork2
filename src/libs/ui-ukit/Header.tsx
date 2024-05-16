import { FC } from "react";
import { AppBar, Box, Button, Stack } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

export const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <Stack
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        borderBottom="1px solid #dbdbdb"
        p="4px 8px"
        gap="20px"
      >
        <Box component="img" src="/svg/autwork-logo.svg" />
        <Box m={1}></Box>
        <Stack flexDirection="row" gap={1}>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => navigate({ to: "/" })}
          >
            Войти
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => navigate({ to: "/user" })}
          >
            Table
          </Button>
        </Stack>
      </Stack>
    </AppBar>
  );
};
