import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "เข้าสู่ระบบไม่สำเร็จ");
      } else {
        // ล็อกอินสำเร็จ: redirect หรือแสดงผลลัพธ์
        window.location.href = "/feed"; // หรือเปลี่ยนเส้นทางตามต้องการ
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen w-full hacker-bg">
        <div className="w-full max-w-lg bg-[#181c1f] rounded-2xl shadow-2xl p-8 border border-green-400/30 text-green-300 animate-fade-in text-center">
          <h1 className="text-3xl font-black mb-2 text-green-400 tracking-widest drop-shadow-lg">
            RMT by Sharky
          </h1>
          <p className="mb-4 text-green-200">
            แพลตฟอร์มโซเชียลมีเดียสายแฮกเกอร์
            <br />
            โพสต์ แชท ขุดเครดิต เช่าสัตว์เลี้ยง และอีกมากมาย!
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <a
              href="/feed"
              className="px-5 py-2 bg-green-700 text-black rounded-lg font-bold shadow hover:bg-green-600 transition"
            >
              เข้าสู่ Feed
            </a>
            <a
              href="/auth"
              className="px-5 py-2 bg-[#23272b] text-green-300 rounded-lg font-bold shadow border border-green-400/40 hover:bg-green-900/60 transition"
            >
              เข้าสู่ระบบ/สมัครสมาชิก
            </a>
          </div>
        </div>
      </div>
      <style jsx global>{`
        body {
          background: #101214;
        }
        .hacker-bg {
          background: linear-gradient(135deg, #101214 60%, #1a2a1a 100%);
        }
        .animate-fade-in {
          animation: fadeIn 0.7s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </>
  );
}
