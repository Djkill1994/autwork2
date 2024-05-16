import { createFileRoute } from "@tanstack/react-router";
import { authCheck } from "~/features/Auth/helpers";
import { Box, Button } from "@mui/material";
import { useGetUsersApi } from "~/features/Admin/api";

const Index = () => {
  const { data } = useGetUsersApi();

  return (
    <>
      <Box>HELLO DARLING!!!!!</Box>
      <Button onClick={() => console.log(data)}>CLICK ME</Button>
      {data?.map(({ phone, name, id }) => (
        <Box key={id}>
          <Box>{name}</Box>
          <Box>{phone}</Box>
        </Box>
      ))}
    </>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: ({ location }) => authCheck(location),
});
