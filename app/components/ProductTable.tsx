"use client";

import React, { useEffect, useRef, useState } from "react";
import TableRow from "./TableRow";
import SortDropdown from "./SortDropdown";
import FilterDropdown from "./FilterDropdown";

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

interface ProductTableProps {
  products: Product[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"price" | "rating" | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterBy, setFilterBy] = useState<string | null>(null);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSort = (by: "price" | "rating" | null) => {
    setSortBy(by);
    if (by === null) {
      setFilteredProducts(products);
    } else {
      const sorted = [...filteredProducts].sort((a, b) => {
        if (a[by] < b[by]) return sortOrder === "asc" ? -1 : 1;
        if (a[by] > b[by]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
      setFilteredProducts(sorted);
    }
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setIsSortDropdownOpen(false);
  };

  const handleFilter = (category: string | null) => {
    setFilterBy(category);
    const filtered =
      category === null
        ? products
        : products.filter((product) => product.category === category);
    setFilteredProducts(filtered);
    setIsFilterDropdownOpen(false);
  };

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      handleSearch({
        target: { value: searchQuery },
      } as React.ChangeEvent<HTMLInputElement>);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  return (
    <div>
      <div className="mb-4 flex gap-5">
        <SortDropdown
          handleSort={handleSort}
          sortBy={sortBy}
          sortOrder={sortOrder}
          isOpen={isSortDropdownOpen}
          setIsOpen={setIsSortDropdownOpen}
        />

        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          ref={searchInputRef}
          className="px-4 py-2 max-w-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />

        <FilterDropdown
          categories={categories}
          handleFilter={handleFilter}
          filterBy={filterBy}
          isOpen={isFilterDropdownOpen}
          setIsOpen={setIsFilterDropdownOpen}
        />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Discount
              </th>
              <th scope="col" className="px-6 py-3">
                Rating
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Thumbnail
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
