import React from "react";
import Image from "next/image";
import { FiStar } from "react-icons/fi";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
}

interface TableRowProps {
  product: Product;
}

const TableRow: React.FC<TableRowProps> = ({ product }) => (
  <tr
    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
    key={product.id}
  >
    <td className="px-6 py-4">{product.id}</td>
    <td className="px-6 py-4">{product.title}</td>
    <td className="px-6 py-4">{product.price}</td>
    <td className="px-6 py-4">{product.discountPercentage} %</td>
    <td className="px-6 py-4 flex items-center">
      <FiStar />
      {product.rating}
    </td>
    <td className="px-6 py-4">{product.category}</td>
    <td>
      <Image
        width={64}
        height={64}
        className=" object-cover"
        src={product.thumbnail}
        alt={product.title}
      />
    </td>
  </tr>
);

export default TableRow;
