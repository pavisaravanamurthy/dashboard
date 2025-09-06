"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
      <p className="mb-6">Please login to continue.</p>
      <Link href="/login">
        <button className="px-6 py-2 text-lg rounded bg-gray-600 text-white hover:bg-gray-700 transition">
          Login
        </button>
      </Link>
    </div>
  );
}
