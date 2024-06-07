import { Box, Grid, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { IUserTableRowTypes } from "~/libs/types";
import { supabaseClient } from "~/libs/core";

interface UserData {
  userTable?: IUserTableRowTypes[];
}

export const UserNewEntryForm = ({ userTable = [] }: UserData) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserTableRowTypes>({
    defaultValues: {
      day: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit: SubmitHandler<IUserTableRowTypes> = async (data) => {
    const cellId: number =
      userTable.find(({ day }) => day === data.day)?.id ?? 0;
    await supabaseClient
      .from("users_work_hours")
      .update({
        project: data.project,
        hours_from: data.hours_from,
        hours_to: data.hours_to,
        break_time: data.break_time,
      })
      .eq("id", cellId);
  };

  const lastEntryWithProject = userTable
    .filter((entry) => entry.project !== null)
    .sort((a, b) => b.project!.localeCompare(a.project!))
    .shift();
  console.log(lastEntryWithProject);

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
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
            error={!!errors.day}
            helperText={!!errors.day && " Введите дату"}
            size="small"
            type="date"
            autoComplete="day"
            fullWidth
            color="success"
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <TextField
            {...register("project", { required: true })}
            error={!!errors.project}
            helperText={!!errors.project && " Введите название проекта"}
            size="small"
            autoComplete="project"
            label={"project"}
            fullWidth
            defaultValue={
              lastEntryWithProject ? lastEntryWithProject.project : ""
            }
            color="success"
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <TextField
            {...register("hours_from", { required: true })}
            error={!!errors.hours_from}
            helperText={!!errors.hours_from && " Введите время начала работы"}
            size="small"
            autoComplete="hours_from"
            label={"hours_from"}
            fullWidth
            color="success"
            type="time"
            defaultValue={
              lastEntryWithProject ? lastEntryWithProject.hours_from : ""
            }
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <TextField
            {...register("hours_to", { required: true })}
            error={!!errors.hours_to}
            helperText={!!errors.hours_to && " Введите время окончания работы"}
            size="small"
            autoComplete="hours_to"
            label={"hours_to"}
            fullWidth
            color="success"
            type="time"
            defaultValue={
              lastEntryWithProject ? lastEntryWithProject.hours_to : ""
            }
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <TextField
            {...register("break_time", { required: true })}
            error={!!errors.break_time}
            helperText={!!errors.break_time && " Введите время перерыва"}
            size="small"
            autoComplete="break_time"
            label={"break_time"}
            fullWidth
            color="success"
            type="time"
            defaultValue={
              lastEntryWithProject ? lastEntryWithProject.break_time : ""
            }
          />
        </Grid>

        <Grid item xs={12} width="100%">
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
            fullWidth
            color="secondary"
          >
            Отправить
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};
