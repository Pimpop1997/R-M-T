import { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

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
        window.location.href = "/feed";
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
      <div className="flex flex-col items-center justify-center min-h-screen w-full hacker-bg px-2 sm:px-0">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-400/40 text-blue-700 animate-fade-in text-center">
          <h1 className="text-3xl font-black mb-2 text-blue-600 tracking-widest flex items-center justify-center gap-2">
            <span className="inline-block w-8 h-8 align-middle">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="16"
                  cy="16"
                  rx="16"
                  ry="16"
                  fill="#3B82F6"
                />
                <path
                  d="M8 20C10 15 22 15 24 20C20 18 12 18 8 20Z"
                  fill="#fff"
                />
                <path
                  d="M12 16C13 13 19 13 20 16"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="20.5"
                  cy="17.5"
                  r="1"
                  fill="#3B82F6"
                />
              </svg>
            </span>
            RMT by Sharky
          </h1>
          <p className="mb-4 text-blue-400">
            แพลตฟอร์มโซเชียลมีเดียสายแฮกเกอร์
            <br />
            โพสต์ แชท ขุดเครดิต เช่าสัตว์เลี้ยง และอีกมากมาย!
          </p>
          <form
            onSubmit={handleLogin}
            className="space-y-3 max-w-xs mx-auto mb-6"
          >
            <input
              className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-400 transition text-base"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-400 transition text-base"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <div className="text-red-500 text-center text-sm">{error}</div>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-base shadow transition"
              disabled={loading}
            >
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <a
              href="/feed"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow transition"
            >
              เข้าสู่ Feed
            </a>
            <Link href="/register" passHref>
              <button
                className="px-5 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold shadow border border-blue-200 hover:bg-blue-100 transition"
                type="button"
              >
                ไปหน้าลงทะเบียน
              </button>
            </Link>
          </div>
        </div>
      </div>
      <style jsx global>{`
        body {
          background: #f4f8fb;
          font-family: "Prompt", "Kanit", "Inter", sans-serif;
        }
        .hacker-bg {
          background: linear-gradient(135deg, #e0e7ef 60%, #c7d2fe 100%);
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
