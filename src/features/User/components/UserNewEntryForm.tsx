import { Box, Grid, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { IUserTableRowTypes } from "~/libs/types";
import { useUpdateDateFormDataApi } from "~/features/User/api";

interface UserData {
  userTable?: IUserTableRowTypes[];
  close: () => void;
}

export const UserNewEntryForm = ({ userTable = [], close }: UserData) => {
  const lastEntryWithProject = userTable.reduce<IUserTableRowTypes | null>(
    (lastEntry, entry) => {
      return entry.project ? entry : lastEntry;
    },
    null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserTableRowTypes>({
    defaultValues: {
      day: new Date().toISOString().split("T")[0],
      project: lastEntryWithProject?.project ?? "",
      hours_from: lastEntryWithProject?.hours_from ?? "",
      hours_to: lastEntryWithProject?.hours_to ?? "",
      break_time: lastEntryWithProject?.break_time ?? "",
    },
  });

  const { mutateAsync: updateTable, isPending } = useUpdateDateFormDataApi();

  const onSubmit: SubmitHandler<IUserTableRowTypes> = async (data) => {
    const cellId: number =
      userTable.find(({ day }) => day === data.day)?.id ?? 0;
    updateTable({ data, id: cellId }).then(close);
  };

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
            helperText={!!errors.day && "Введите дату"}
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
            helperText={!!errors.project && "Введите название проекта"}
            size="small"
            autoComplete="project"
            label={"project"}
            fullWidth
            color="success"
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <TextField
            {...register("hours_from", { required: true })}
            error={!!errors.hours_from}
            helperText={!!errors.hours_from && "Введите время начала работы"}
            size="small"
            autoComplete="hours_from"
            label={"hours_from"}
            fullWidth
            color="success"
            type="time"
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <TextField
            {...register("hours_to", { required: true })}
            error={!!errors.hours_to}
            helperText={!!errors.hours_to && "Введите время окончания работы"}
            size="small"
            autoComplete="hours_to"
            label={"hours_to"}
            fullWidth
            color="success"
            type="time"
          />
        </Grid>
        <Grid item xs={12} width="100%">
          <TextField
            {...register("break_time", { required: true })}
            error={!!errors.break_time}
            helperText={!!errors.break_time && "Введите время перерыва"}
            size="small"
            autoComplete="break_time"
            label={"break_time"}
            fullWidth
            color="success"
            type="time"
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
            Отправить
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};
