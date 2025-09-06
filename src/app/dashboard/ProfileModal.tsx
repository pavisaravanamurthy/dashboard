"use client";
import { useGetProfileQuery } from "../store/authApi";

export default function ProfileModal({ onClose }: { onClose: () => void }) {
  const { data: profile, isLoading, error } = useGetProfileQuery({})

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-2xl min-w-[400px]">
        <h2 className="text-xl font-bold mb-4">Profile</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">
            Failed to load profile. Please try logging in again.
          </div>
        ) : profile ? (
          <div>
            <div>Name: {profile.firstName} {profile.lastName}</div>
            <div>Email: {profile.email}</div>
            <div>Username: {profile.username}</div>
          </div>
        ) : null}
        <button
          className="mt-6 w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors duration-200"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}