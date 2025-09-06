"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isCollapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export function Sidebar({ isCollapsed, onCollapsedChange }: SidebarProps) {
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`h-screen bg-gray-800 text-white ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-200`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Sidebar Title or Logo */}
      <div className="flex items-center h-20 px-2">
        <span className="text-2xl flex-shrink-0" role="img" aria-label="logo">
          🧭
        </span>
        {!isCollapsed && (
          <span className="font-bold text-lg ml-3">Dashboard</span>
        )}
      </div>

      {/* Collapse/Expand Button */}
      {hovered && (
        <button
          className="absolute top-6 right-0 transform translate-x-1/2 bg-gray-700 hover:bg-gray-600 
            w-8 h-8 rounded-full shadow-lg z-40 flex items-center justify-center 
            transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => onCollapsedChange(!isCollapsed)}
        >
          <div className="flex items-center justify-center w-full h-full">
            {isCollapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7M19 19l-7-7 7-7"
                />
              </svg>
            )}
          </div>
        </button>
      )}

      <nav className="mt-1 flex flex-col gap-1 items-start">
        <Link
          href="/dashboard/boards"
          className={`h-12 w-full flex items-center justify-start px-2 rounded transition-all duration-200 text-white no-underline ${
            pathname === "/dashboard/boards"
              ? "bg-gray-700 border-r-4 border-blue-500 font-semibold shadow-lg"
              : "hover:bg-gray-400 hover:border-l-4 hover:border-gray-400"
          }`}
        >
          <span className="text-xl text-white" role="img" aria-label="boards">
            📋
          </span>
          <span
            className={`ml-3 overflow-hidden whitespace-nowrap transition-all duration-200 text-white ${
              isCollapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-[120px]"
            }`}
          >
            Product Boards
          </span>
        </Link>
        <Link
          href="/dashboard/list"
          className={`h-12 w-full flex items-center justify-start px-2 rounded transition-all duration-200 text-white no-underline ${
            pathname === "/dashboard/list"
              ? "bg-gray-700 border-r-4 border-blue-500 font-semibold shadow-lg"
              : "hover:bg-gray-400 hover:border-l-4 hover:border-gray-400"
          }`}
        >
          <span className="text-xl text-white" role="img" aria-label="list">
            📦
          </span>
          <span
            className={`ml-3 overflow-hidden whitespace-nowrap transition-all duration-200 text-white ${
              isCollapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-[120px]"
            }`}
          >
            Product List
          </span>
        </Link>
      </nav>
    </aside>
  );
}
