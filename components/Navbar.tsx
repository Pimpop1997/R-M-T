import React from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-[#101214] border-b border-green-400/30 shadow-md">
      <div className="flex items-center gap-3">
        <BrandLogo />
      </div>
      <div className="flex gap-4 text-green-300 font-semibold">
        <Link href="/feed" className="hover:text-green-400 transition">Feed</Link>
        <Link href="/chat" className="hover:text-green-400 transition">Chat</Link>
        <Link href="/credit" className="hover:text-green-400 transition">Credit</Link>
        <Link href="/pet-rental" className="hover:text-green-400 transition">Pet</Link>
        <Link href="/mining" className="hover:text-green-400 transition">Mining</Link>
        <Link href="/security-log" className="hover:text-green-400 transition">Security</Link>
        <Link href="/admin" className="hover:text-green-400 transition">Admin</Link>
        <Link href="/auth" className="hover:text-green-400 transition">Auth</Link>
      </div>
    </nav>
  );
}
