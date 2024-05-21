import { Box, CircularProgress, Stack } from "@mui/material";
import { useGetUsersApi } from "~/features/Admin/api";

export const AdminSheet = () => {
  const { data, isFetching } = useGetUsersApi();

  return (
    <Box>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <Stack flexDirection="row" gap="8px">
          {data?.users?.map(({ id, user_metadata }) => (
            <Stack key={id}>
              <Box>{user_metadata.email}</Box>
              <Box>{user_metadata.userName}</Box>
            </Stack>
          ))}
        </Stack>
      )}
    </Box>
  );
};
