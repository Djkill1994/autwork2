import { AppBar, Box, Button, Stack } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { supabaseClient } from "~/libs/core";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="sticky">
        <Stack
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
          borderBottom="1px solid #dbdbdb"
          p="4px 8px"
          gap="20px"
        >
          <Box component="img" src="/svg/autwork-logo.svg" width="20%" />
          <Button
            color="secondary"
            variant="contained"
            onClick={async () => {
              await supabaseClient.auth.signOut();
              await navigate({ to: "/" });
            }}
          >
            Выйти
          </Button>
        </Stack>
      </AppBar>
    </>
  );
};
