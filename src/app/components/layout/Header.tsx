"use client";
import { useState } from "react";
import ProfilePopup from "../../dashboard/ProfilePopup";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex justify-between items-center h-16 px-6 bg-white border-b shadow-sm">
      <div className="font-bold text-xl">Logo</div>
      <div className="relative">
        <button
          className="rounded-full bg-gray-300 w-10 h-10 flex items-center justify-center profile-button"
          onClick={() => setOpen((v) => !v)}
        >
          <span role="img" aria-label="profile">👤</span>
        </button>
        {open && <ProfilePopup onClose={() => setOpen(false)} />}
      </div>
    </header>
  );
}
