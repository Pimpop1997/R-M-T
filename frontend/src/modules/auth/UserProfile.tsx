import { useEffect, useState } from "react";

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("กรุณาเข้าสู่ระบบก่อน");
      setLoading(false);
      return;
    }
    fetch("/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
        else setError(data.error || "ไม่พบข้อมูลผู้ใช้");
      })
      .catch(() => setError("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-8 text-blue-600">กำลังโหลด...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!user) return null;

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 border border-blue-200 animate-fade-in mt-8">
      <h2 className="text-2xl font-black mb-4 text-blue-600 flex items-center gap-2">
        <span className="inline-block w-7 h-7 align-middle">
          {/* โลโก้ฉลาม SVG ขนาดเล็ก */}
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="16" ry="16" fill="#3B82F6"/><path d="M8 20C10 15 22 15 24 20C20 18 12 18 8 20Z" fill="#fff"/><path d="M12 16C13 13 19 13 20 16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><circle cx="20.5" cy="17.5" r="1" fill="#3B82F6"/></svg>
        </span>
        โปรไฟล์ผู้ใช้
      </h2>
      <div className="mb-2 text-blue-800"><b>Username:</b> {user.username}</div>
      <div className="mb-2 text-blue-800"><b>Email:</b> {user.email}</div>
      <div className="mb-2 text-blue-800"><b>Created at:</b> {new Date(user.created_at).toLocaleString()}</div>
    </div>
  );
}
