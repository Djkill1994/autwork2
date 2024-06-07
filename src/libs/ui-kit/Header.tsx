import { AppBar, Box, Button, Stack } from "@mui/material";
import { useCurrentUserApi, useSignOutApi } from "~/features/Auth/api";

export const Header = () => {
  const { data } = useCurrentUserApi();
  const { mutateAsync: signOut } = useSignOutApi();
  console.log(data);
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
          {data?.user?.id && (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => signOut()}
            >
              Выйти
            </Button>
          )}
        </Stack>
      </AppBar>
    </>
  );
};
