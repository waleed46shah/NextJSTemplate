import React from "react";

interface SortDropdownProps {
  handleSort: (by: "price" | "rating" | null) => void;
  sortBy: "price" | "rating" | null;
  sortOrder: "asc" | "desc";
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  handleSort,
  sortBy,
  sortOrder,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2  text-sm font-medium text-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          Sort By
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute z-10 right-0 mt-2 w-56 rounded-md shadow-lg bg-white text-black ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <button
              className={`${
                sortBy === null ? "bg-gray-100 text-gray-900" : "text-black"
              } block w-full px-4 py-2 text-sm`}
              role="menuitem"
              tabIndex={-1}
              onClick={() => handleSort(null)}
            >
              None
            </button>
            <button
              className={`${
                sortBy === "price" ? " text-gray-900" : "text-black"
              } block w-full px-4 py-2 text-sm`}
              role="menuitem"
              tabIndex={-1}
              onClick={() => handleSort("price")}
            >
              Price{" "}
              {sortBy === "price" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </button>
            <button
              className={`${
                sortBy === "rating" ? "bg-gray-100 text-black" : "text-black"
              } block w-full px-4 py-2 text-sm`}
              role="menuitem"
              tabIndex={-1}
              onClick={() => handleSort("rating")}
            >
              Rating{" "}
              {sortBy === "rating" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
