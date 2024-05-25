import { Box, Grid, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputPassword } from "~/libs/ui-kit";
import { EMAIL_REGEX } from "~/libs/constans";
import { LoadingButton } from "@mui/lab";
import { supabaseClient } from "~/libs/core";

export interface IRegistrationForm {
  userName: string;
  email: string;
  password: string;
}

export const AuthRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationForm>();
  // const navigate = useNavigate();

  const onSubmit: SubmitHandler<IRegistrationForm> = async (data) => {
    // Регистрация нового пользователя
    const { data: userData, error } = await supabaseClient.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { user_name: data.userName },
      },
    });

    if (error) {
      console.error("Ошибка при регистрации:", error.message);
      return;
    }

    // Проверяем, зарегистрировался ли пользователь успешно
    if (userData) {
      console.log(userData?.user?.id, "user");
      // Вызываем хранимую процедуру для создания таблицы для нового пользователя
      const { error: rpcError } = await supabaseClient.rpc(
        "create_user_table",
        {
          user_id: userData?.user?.id,
        },
      );

      if (rpcError) {
        console.error(
          "Ошибка при создании таблицы для пользователя:",
          rpcError.message,
        );
      } else {
        console.log("Таблица успешно создана для пользователя");
      }
    }
  };

  return (
    <Box
      margin="100px auto"
      width="300px"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Box
        p="20px"
        width="380px"
        gap="15px"
        alignItems="center"
        justifyContent="center"
        border="1px solid rgba(43, 43, 43, 0.568)"
        borderRadius="15px"
        bgcolor="rgba(255, 255, 255, 0.192)"
        sx={{ backdropFilter: "blur(10px)" }}
      >
        <Grid
          container
          gap="10px"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Grid item xs={12} width="100%">
            <TextField
              {...register("email", { required: true, pattern: EMAIL_REGEX })}
              error={!!errors.email}
              helperText={!!errors.email && "email"}
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
              helperText={!!errors.userName && "name"}
              size="small"
              label={"name"}
              autoComplete="fullName"
              fullWidth
              color="success"
            />
          </Grid>
          <Grid item xs={12} width="100%">
            <FormInputPassword
              id="password"
              error={errors.password && "password"}
              label={"password"}
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
              color="success"
            >
              {"signUp"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
