import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useGetUserTableApi, useUpdateDataTable } from "~/features/User/api";
import { Database } from "~/generated/types/database";
import { Box, CircularProgress, Button, Stack } from "@mui/material";
import { ButtonModalWindow } from "~/libs/ui-kit";
import { useModal } from "~/libs/utils";
import { UserNewEntryForm } from "~/features/User/components/UserNewEntryForm";

export type TableRow = Database["public"]["Tables"]["users_work_hours"]["Row"];

//пофиксить ошибки , переписать мутацию
export const UserDashboard = () => {
  const { data: userTable, isSuccess, isLoading } = useGetUserTableApi();
  const { mutateAsync: updateTable } = useUpdateDataTable();
  const [editedCells, setEditedCells] = useState<Partial<TableRow>[]>([]);
  const { isOpened, open, close } = useModal();

  const handleEditCellChange = <K extends keyof TableRow>(
    row: TableRow,
    key: K,
    value: TableRow[K],
  ) => {
    setEditedCells((prev) =>
      prev.some((item) => item.id === row.id)
        ? prev.map((item) =>
            item.id === row.id ? { ...item, [key]: value } : item,
          )
        : [...prev, { ...row, [key]: value }],
    );
  };

  const handleSave = () => {
    updateTable(editedCells);
    setEditedCells([]);
  };

  const totalHours =
    isSuccess && userTable
      ? userTable.reduce((total, row) => total + (row.total_hours ?? 0), 0)
      : 0;

  const columns = useMemo<MRT_ColumnDef<TableRow>[]>(
    () => [
      {
        accessorKey: "day",
        header: "Date",
        size: 110,
        enableEditing: false,
      },
      {
        accessorKey: "project",
        header: "Project",
        size: 130,
        muiEditTextFieldProps: ({ row }) => ({
          type: "text",
          required: true,
          onChange: (event) =>
            handleEditCellChange(row.original, "project", event.target.value),
        }),
      },
      {
        accessorKey: "hours_from",
        header: "Hours from",
        size: 110,
        muiEditTextFieldProps: ({ row }) => ({
          type: "time",
          required: true,
          onChange: (event) =>
            handleEditCellChange(
              row.original,
              "hours_from",
              event.target.value,
            ),
        }),
      },
      {
        accessorKey: "hours_to",
        header: "Hours to",
        size: 110,
        muiEditTextFieldProps: ({ row }) => ({
          type: "time",
          required: true,
          onChange: (event) =>
            handleEditCellChange(row.original, "hours_to", event.target.value),
        }),
      },
      {
        accessorKey: "break_time",
        header: "Break time",
        size: 110,
        muiEditTextFieldProps: ({ row }) => ({
          type: "time",
          required: true,
          onChange: (event) =>
            handleEditCellChange(
              row.original,
              "break_time",
              event.target.value,
            ),
        }),
      },
      {
        accessorKey: "total_hours",
        header: "Total hours",
        size: 110,
        enableEditing: false,
      },
    ],
    [editedCells],
  );

  const table = useMaterialReactTable({
    columns,
    data: isSuccess ? userTable : [],
    initialState: {
      columnPinning: {
        left: ["day"],
      },
      rowPinning: {
        top: ["Total"],
      },
    },
    muiTableBodyCellProps: {
      sx: {
        display: "flex",
        alignItems: "center",
      },
    },
    editDisplayMode: "cell",
    enableEditing: true,
    enableSorting: false,
    enableColumnFilters: false,
    enableColumnActions: false,
    enableBottomToolbar: false,
    enableColumnResizing: true,
    enablePagination: false,
    enableRowVirtualization: true,
    renderTopToolbarCustomActions: () => (
      <Stack flexDirection="row" gap={1}>
        <ButtonModalWindow
          isOpened={isOpened}
          close={close}
          open={open}
          buttonText={"Добавить запись"}
          children={<UserNewEntryForm />}
        />
        {editedCells[0] && (
          <Stack direction="row" gap={1}>
            <Button variant="contained" onClick={handleSave} color="warning">
              Сохранить
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                setEditedCells([]);
              }}
            >
              Отменить
            </Button>
          </Stack>
        )}
      </Stack>
    ),
  });

  return (
    <>
      {isLoading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <CircularProgress color="success" />
        </Box>
      ) : (
        <>
          <MaterialReactTable table={table} />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #ccc",
              backgroundColor: "#f5f5f5",
              padding: "16px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>Total: {totalHours} </Box>
          </Box>
        </>
      )}
    </>
  );
};
