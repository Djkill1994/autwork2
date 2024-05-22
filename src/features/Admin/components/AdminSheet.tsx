import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { useGetUsersApi } from "~/features/Admin/api";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { Database } from "~/generated/types/database";

export const AdminSheet = () => {
  const { data: usersData, isSuccess, isFetching } = useGetUsersApi();
  const [editedCells, setEditedCells] = useState<Partial<Database>[]>([]);

  const columns = useMemo<MRT_ColumnDef<Database>[]>(
    () => [
      {
        accessorKey: "userName",
        header: "User name",
        size: 110,
        enableEditing: false,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 130,
        // muiEditTextFieldProps: ({ row }) => ({
        //   type: "text",
        //   required: true,
        //   onChange: (event) =>
        //     handleEditCellChange(row.original, "project", event.target.value),
        // }),
      },
    ],
    [editedCells],
  );
  console.log(usersData?.users?.map((data) => data));
  const table = useMaterialReactTable({
    columns,
    data: isSuccess && usersData?.users?.map((data) => data.user_metadata),
    initialState: {
      columnPinning: {
        left: ["date"],
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
  });

  return (
    <Box>
      {isFetching ? <CircularProgress /> : <MaterialReactTable table={table} />}
    </Box>
  );
};
