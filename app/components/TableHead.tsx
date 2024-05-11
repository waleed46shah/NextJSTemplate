import React from "react";

interface TableHeadProps {
  rowData: { label: string; key: string }[];
}

const TableHead: React.FC<TableHeadProps> = ({ rowData }) => (
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      {rowData.map((item) => (
        <th scope="col" className="px-6 py-3" key={item.label}>
          {item.label}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHead;
