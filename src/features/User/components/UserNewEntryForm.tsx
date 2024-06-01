import { Box, Grid, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegistrationForm } from "~/features/Auth/api/useSignUpApi";
import { FormInputPassword } from "~/libs/ui-kit";
import { LoadingButton } from "@mui/lab";
import { Database } from "~/generated/types/database";

export const UserNewEntryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<Database["public"]["Tables"]["users_work_hours"], "Row">>();

  const onSubmit: SubmitHandler<IRegistrationForm> = async (data) => {
    await signUpUser(data).then(close);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid
        container
        gap="10px"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Grid item xs={12} width="100%">
          <TextField
            {...register("day", { required: true })}
            error={!!errors.email}
            helperText={!!errors.email && " Введите email правильного формата"}
            size="small"
            autoComplete="email"
            label={"email"}
            fullWidth
            color="success"
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <TextField
            {...register("userName", { required: true })}
            error={!!errors.userName}
            helperText={!!errors.userName && "Введите имя пользователя"}
            size="small"
            label={"Имя пользователя"}
            autoComplete="fullName"
            fullWidth
            color="success"
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <FormInputPassword
            id="password"
            error={errors.password && "Введите пароль"}
            label={"Пароль"}
            inputProps={register("password", {
              required: true,
            })}
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
            fullWidth
            color="secondary"
            loading={isPending}
          >
            Зарегистрировать
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};
