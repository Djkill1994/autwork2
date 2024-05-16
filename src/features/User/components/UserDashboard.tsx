import { useEffect, useMemo, useRef, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_SortingState,
  type MRT_RowVirtualizer,
} from "material-react-table";
import { useGetUserTableApi } from "~/features/User/api";

export const UserDashboard = () => {
  const { data: userTable } = useGetUserTableApi();
  const columns = useMemo<MRT_ColumnDef<userTable>[]>(
    //column definitions...
    () => [
      {
        accessorKey: "date",
        header: "Date",
        size: 100,
      },
      {
        accessorKey: "project",
        header: "Project",
        size: 150,
      },
      {
        accessorKey: "hours_from",
        header: "Hours from",
        size: 80,
      },
      {
        accessorKey: "hours_to",
        header: "Hours to",
        size: 80,
      },
      {
        accessorKey: "break_time",
        header: "Break time",
        size: 80,
      },
      {
        accessorKey: "total_time",
        header: "Total time",
        size: 80,
      },
    ],
    [],
    //end
  );

  //optionally access the underlying virtualizer instance
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

  const [data, setData] = useState<userTable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setData(userTable);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    //scroll to the top of the table when the sorting changes
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting]);

  const table = useMaterialReactTable({
    columns,
    data,
    defaultDisplayColumn: { enableResizing: true },
    enableBottomToolbar: false,
    enableColumnResizing: true,
    enableColumnVirtualization: true,
    enableGlobalFilterModes: true,
    enablePagination: false,
    enableColumnPinning: true,
    enableRowNumbers: true,
    enableRowVirtualization: true,
    muiTableContainerProps: { sx: { maxHeight: "600px" } },
    onSortingChange: setSorting,
    state: { isLoading, sorting },
    rowVirtualizerInstanceRef,
    rowVirtualizerOptions: { overscan: 5 },
    columnVirtualizerOptions: { overscan: 2 },
  });

  return <MaterialReactTable table={table} />;
};
