import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useGetUserTableApi } from "~/features/User/api";
import { Database } from "~/generated/types/database";
import { Circle } from "@mui/icons-material";

export const UserDashboard = () => {
  const { data: userTable, isSuccess, isLoading } = useGetUserTableApi();
  const columns = useMemo<MRT_ColumnDef<Database>[]>(
    () => [
      {
        accessorKey: "date",
        header: "Date",
        size: 110,
        enableEditing: false,
      },
      {
        accessorKey: "project",
        header: "Project",
        size: 130,
        enableEditing: true,
      },
      {
        accessorKey: "hours_from",
        header: "Hours from",
        size: 100,
        enableEditing: true,
      },
      {
        accessorKey: "hours_to",
        header: "Hours to",
        size: 100,
        enableEditing: true,
      },
      {
        accessorKey: "break_time",
        header: "Break time",
        size: 100,
      },
      {
        accessorKey: "total_time",
        header: "Total time",
        size: 100,
      },
    ],
    [],
  );

  const [data, setData] = useState<Database[]>([]);

  useEffect(() => {
    if (isSuccess) {
      setData(userTable);
    }
  }, []);

  const table = useMaterialReactTable({
    columns,
    data,
    enableSorting: false,
    enableColumnFilters: false,
    enableColumnActions: false,
    enableBottomToolbar: false,
    enableColumnResizing: true,
    enableColumnVirtualization: true,
    enablePagination: false,
    enableColumnPinning: true,
    enableRowVirtualization: true,
    muiTableContainerProps: { sx: { maxHeight: "600px" } },
  });

  return <>{isLoading ? <Circle /> : <MaterialReactTable table={table} />}</>;
};
