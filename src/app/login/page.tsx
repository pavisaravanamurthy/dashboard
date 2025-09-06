"use client";
import { useState } from "react";
import { useLoginMutation } from "../store/authApi";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const result = await login({
        username,
        password,
      }).unwrap();
      
      console.log("Login result:", result);
      if (result?.accessToken) {
        localStorage.setItem('authToken', result.accessToken);
        router.push("/dashboard");
      } else {
        console.error("No access token in response");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form
        className="bg-white p-8 rounded shadow-md flex flex-col gap-4 w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && (
          <div className="text-red-500 text-sm text-center">
            {(error as any)?.data?.message || "Login failed. Please check your credentials."}
          </div>
        )}
        {isLoading && (
          <div className="text-gray-500 text-sm text-center">
            Logging in...
          </div>
        )}
        <button
          type="submit"
          className="bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
