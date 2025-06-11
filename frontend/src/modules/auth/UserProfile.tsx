import { useEffect, useState } from "react";
import supabase from "../../../../utils/supabaseClient";

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError("");
      try {
        // ลองใช้ supabase auth ก่อน ถ้าไม่มี session ค่อย fallback ไป token
        const { data: { user: supaUser } } = await supabase.auth.getUser();
        if (supaUser) {
          // ดึงข้อมูล user จาก table users
          const { data, error } = await supabase
            .from("users")
            .select("id,username,email,created_at")
            .eq("id", supaUser.id)
            .single();
          if (error) throw error;
          setUser(data);
        } else {
          // fallback: ใช้ token เดิม (กรณี SSR/CSR ไม่ตรงกัน)
          const token = localStorage.getItem("token");
          if (!token) throw new Error("กรุณาเข้าสู่ระบบก่อน");
          const res = await fetch("/api/auth/profile", {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.user) setUser(data.user);
          else throw new Error(data.error || "ไม่พบข้อมูลผู้ใช้");
        }
      } catch (err: any) {
        setError(err.message || "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
      }
      setLoading(false);
    }
    fetchProfile();
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
