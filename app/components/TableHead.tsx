import React from "react";

interface TableHeadProps {
  rowData: { label: string; key: string }[];
  handleSort: (by: "price" | "rating") => void;
  sortBy: "price" | "rating";
  sortOrder: "asc" | "desc";
}

const TableHead: React.FC<TableHeadProps> = ({
  rowData,
  handleSort,
  sortBy,
  sortOrder,
}) => (
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      {rowData.map((item) => (
        <th
          scope="col"
          className="px-6 py-3 cursor-pointer"
          key={item.label}
          onClick={() =>
            item.key === "price" || item.key === "rating"
              ? handleSort(item.key as "price" | "rating")
              : null
          }
        >
          {item.label}{" "}
          {sortBy === item.key ? (sortOrder === "asc" ? "▲" : "▼") : ""}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHead;
