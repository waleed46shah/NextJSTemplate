"use client";
import { useState } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

const Navbar = (session: any) => {
  const [navOpen, setNavOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("/");

  const routes = [
    { path: "/", name: "Home" },
    { path: "/dashboard", name: "Dashboard" },
    { path: "/admin", name: "Admin" },
  ];

  return (
    <nav className=" bg-gray-400 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setNavOpen(!navOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {navOpen ? (
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {routes.map((route) => (
                  <Link
                    className={`${
                      currentRoute === route.path
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    } rounded-md px-3 py-2 text-sm font-medium`}
                    onClick={() => setCurrentRoute(route.path)}
                    href={route.path}
                    key={route.path}
                  >
                    {route.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3 flex gap-2 items-center">
              <div>
                {!!session && (
                  <button
                    type="button"
                    className="relative flex rounded-md bg-gray-700 p-2 text-sm "
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Logout
                  </button>
                )}
                {!session && (
                  <Link
                    href="/login"
                    type="button"
                    className="relative flex rounded-md bg-gray-700 p-2 text-sm "
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {navOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {routes.map((route) => (
              <Link
                className={`${
                  currentRoute === route.path
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                } block rounded-md px-3 py-2 text-base font-medium`}
                onClick={() => {
                  setCurrentRoute(route.path);
                  setNavOpen(false);
                }}
                href={route.path}
                key={route.path}
              >
                {route.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
