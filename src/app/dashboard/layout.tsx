"use client";

import { useState } from "react";
import { Header, Sidebar } from "../components/layout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="fixed inset-y-0 left-0 z-30">
        <Sidebar isCollapsed={collapsed} onCollapsedChange={setCollapsed} />
      </div>
      <div className={`flex-1 flex flex-col transition-all duration-200 ${collapsed ? 'ml-16' : 'ml-64'}`}>
        <div className={`fixed top-0 right-0 z-20 transition-all duration-200 ${collapsed ? 'left-16' : 'left-64'}`}>
          <Header />
        </div>
        <main className="flex-1 overflow-auto mt-16 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}