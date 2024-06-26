import { Box, Button, Stack, CircularProgress } from "@mui/material";
import { useGetUsersApi } from "~/features/Admin/api";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import { AdminRegistreNewUser } from "~/features/Admin/components/AdminRegistreNewUser";
import { IAdminTableRowTypes } from "~/libs/types";
import { useHandleEditCellChange } from "~/libs/utils";

export const AdminSheet = () => {
  const { data: usersData, isSuccess, isFetching } = useGetUsersApi();
  const { editedCells, handleEditCellChange, setEditedCells } =
    useHandleEditCellChange<IAdminTableRowTypes, keyof IAdminTableRowTypes>();

  const handleSave = () => {
    setEditedCells([]);
  };

  const columns = useMemo<MRT_ColumnDef<IAdminTableRowTypes>[]>(
    () => [
      {
        accessorKey: "user_name",
        header: "User name",
        size: 110,
        muiEditTextFieldProps: ({ row }) => ({
          type: "text",
          required: true,
          onChange: (event) =>
            handleEditCellChange(row.original, "user_name", event.target.value),
        }),
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
        accessorKey: "total_hours",
        header: "Total hours",
        size: 110,
        enableEditing: false,
      },
      {
        accessorKey: "general_info",
        header: "General info",
        size: 110,
        muiEditTextFieldProps: ({ row }) => ({
          type: "text",
          required: true,
          onChange: (event) =>
            handleEditCellChange(
              row.original,
              "general_info",
              event.target.value,
            ),
        }),
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 110,
        muiEditTextFieldProps: ({ row }) => ({
          type: "text",
          required: true,
          onChange: (event) =>
            handleEditCellChange(row.original, "email", event.target.value),
        }),
      },
      {
        accessorKey: "notes",
        header: "Notes",
        size: 110,
        muiEditTextFieldProps: ({ row }) => ({
          type: "text",
          required: true,
          onChange: (event) =>
            handleEditCellChange(row.original, "notes", event.target.value),
        }),
      },
    ],
    [editedCells],
  );

  const table = useMaterialReactTable({
    columns,
    data: isSuccess && usersData !== null ? usersData : [],
    initialState: {
      columnPinning: {
        left: ["user_name"],
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
      <Stack direction="row" gap={1}>
        {editedCells[0] && (
          <Stack direction="row" gap={1}>
            <Button variant="contained" onClick={handleSave} color="primary">
              Сохранить
            </Button>
            <Button
              variant="contained"
              onClick={() => setEditedCells([])}
              color="primary"
            >
              Отменить
            </Button>
          </Stack>
        )}
        <AdminRegistreNewUser />
      </Stack>
    ),
  });

  return (
    <Box>
      {isFetching ? <CircularProgress /> : <MaterialReactTable table={table} />}
    </Box>
  );
};
