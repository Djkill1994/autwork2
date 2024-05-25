import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useGetUserTableApi, useUpdateDataTable } from "~/features/User/api";
import { Database } from "~/generated/types/database";
import { Box, CircularProgress, Button } from "@mui/material";
//пофиксить ошибки , переписать мутацию
export const UserDashboard = () => {
  const { data: userTable, isSuccess, isLoading } = useGetUserTableApi();
  const { mutateAsync: updateTable } = useUpdateDataTable();

  const [editedCells, setEditedCells] = useState<Partial<Database>[]>([]);

  const handleEditCellChange = (
    row: Database,
    key: keyof Database,
    value: string,
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

  const columns = useMemo<MRT_ColumnDef<Database>[]>(
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
        enableEditing: true,
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
        enableEditing: true,
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
        header: "Total time",
        size: 110,
        enableEditing: false,
      },
    ],
    [editedCells],
  );
  console.log(editedCells);
  const handleAddRecord = () => {
    // Logic for adding a new record based on date changes
  };

  const table = useMaterialReactTable({
    columns,
    data: isSuccess && userTable,
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
      <Box>
        <Button variant="contained" onClick={handleSave} color="primary">
          Сохранить
        </Button>
        <Button variant="contained" onClick={handleAddRecord}>
          Добавить запись
        </Button>
      </Box>
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
