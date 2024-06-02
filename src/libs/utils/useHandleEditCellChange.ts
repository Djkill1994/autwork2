import { useState } from "react";

type WithID = { id: number | string };

export const useHandleEditCellChange = <
  T extends WithID,
  K extends keyof T,
>() => {
  const [editedCells, setEditedCells] = useState<Partial<T>[]>([]);

  const handleEditCellChange = (row: T, key: K, value: T[K]) => {
    setEditedCells((prev) =>
      prev.some((item) => item.id === row.id)
        ? prev.map((item) =>
            item.id === row.id ? { ...item, [key]: value } : item,
          )
        : [...prev, { ...row, [key]: value }],
    );
  };

  return { editedCells, handleEditCellChange, setEditedCells };
};
