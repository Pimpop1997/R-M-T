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

  if (loading) return <div className="text-center py-8">กำลังโหลด...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!user) return null;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">โปรไฟล์ผู้ใช้</h2>
      <div className="mb-2"><b>Username:</b> {user.username}</div>
      <div className="mb-2"><b>Email:</b> {user.email}</div>
      <div className="mb-2"><b>Created at:</b> {new Date(user.created_at).toLocaleString()}</div>
    </div>
  );
}
