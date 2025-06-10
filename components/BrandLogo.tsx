import React from "react";

// คุณสามารถเปลี่ยน SVG ด้านล่างเป็นโลโก้ฉลามที่คุณต้องการได้
export default function BrandLogo() {
  return (
    <div className="flex items-center space-x-2 select-none">
      {/* โลโก้ฉลามแบบ SVG มินิมอล */}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="16" cy="16" rx="16" ry="16" fill="#3B82F6"/>
        <path d="M8 20C10 15 22 15 24 20C20 18 12 18 8 20Z" fill="#fff"/>
        <path d="M12 16C13 13 19 13 20 16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="20.5" cy="17.5" r="1" fill="#3B82F6"/>
      </svg>
      <span className="font-bold text-xl text-blue-600 tracking-wide">RMT</span>
    </div>
  );
}
