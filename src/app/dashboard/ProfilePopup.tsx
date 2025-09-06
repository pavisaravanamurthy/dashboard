"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ProfileModal from "./ProfileModal";

export default function ProfilePopup({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);

  function handleLogout() {
    localStorage.removeItem("authToken");
    router.push("/login");
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest('.profile-popup') && !target.closest('.profile-button')) {
        onClose();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded z-10 profile-popup">
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => setShowProfile(true)}
      >
        Profile
      </button>
      <button
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={handleLogout}
      >
        Logout
      </button>
      {showProfile && (
        <ProfileModal onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
}

