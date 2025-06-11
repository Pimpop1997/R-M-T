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
      <div className="hacker-bg min-h-screen flex flex-col items-center justify-center py-8 px-2">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-400/40 text-blue-700 animate-fade-in flex flex-col items-center">
          <h1 className="text-4xl font-black text-blue-600 mb-4 flex items-center gap-3 justify-center">
            <span className="inline-block w-10 h-10 align-middle">
              {/* โลโก้ฉลาม SVG */}
              <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
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
            SocialPoints
          </h1>
          <div className="text-blue-400 font-bold text-lg mb-2 tracking-wide">
            RMT by Sharky
          </div>
          <p className="mb-6 text-blue-500 text-center text-base sm:text-lg">
            ระบบสะสมแต้ม &amp; โซเชียลเกม <br className="sm:hidden" />แลกเปลี่ยนเครดิต{" "}
            <span className="hidden sm:inline">|</span> เพื่อน{" "}
            <span className="hidden sm:inline">|</span> รางวัล{" "}
            <span className="hidden sm:inline">|</span> Chat{" "}
            <span className="hidden sm:inline">|</span> Mining{" "}
            <span className="hidden sm:inline">|</span> Pet
          </p>
          <Link href="/auth" legacyBehavior>
            <a className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md text-lg text-center transition block mb-4">
              🚀 เริ่มต้นใช้งาน / สมัครสมาชิก
            </a>
          </Link>
          <div className="w-full flex flex-wrap gap-2 justify-center mt-2 mb-4">
            <Link href="/feed" legacyBehavior>
              <a className="px-4 py-2 rounded bg-blue-50 border border-blue-200 text-blue-700 font-semibold hover:bg-blue-100 transition text-sm">
                Feed
              </a>
            </Link>
            <Link href="/chat" legacyBehavior>
              <a className="px-4 py-2 rounded bg-blue-50 border border-blue-200 text-blue-700 font-semibold hover:bg-blue-100 transition text-sm">
                Chat
              </a>
            </Link>
            <Link href="/credit" legacyBehavior>
              <a className="px-4 py-2 rounded bg-blue-50 border border-blue-200 text-blue-700 font-semibold hover:bg-blue-100 transition text-sm">
                Credit
              </a>
            </Link>
            <Link href="/pet" legacyBehavior>
              <a className="px-4 py-2 rounded bg-blue-50 border border-blue-200 text-blue-700 font-semibold hover:bg-blue-100 transition text-sm">
                Pet
              </a>
            </Link>
            <Link href="/mining" legacyBehavior>
              <a className="px-4 py-2 rounded bg-blue-50 border border-blue-200 text-blue-700 font-semibold hover:bg-blue-100 transition text-sm">
                Mining
              </a>
            </Link>
            <Link href="/pet-rental" legacyBehavior>
              <a className="px-4 py-2 rounded bg-blue-50 border border-blue-200 text-blue-700 font-semibold hover:bg-blue-100 transition text-sm">
                Pet Rental
              </a>
            </Link>
            <Link href="/security-log" legacyBehavior>
              <a className="px-4 py-2 rounded bg-blue-50 border border-blue-200 text-blue-700 font-semibold hover:bg-blue-100 transition text-sm">
                Security Log
              </a>
            </Link>
          </div>
          <div className="w-full mt-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 text-blue-600 text-sm text-center">
              <b>ฟีเจอร์เด่น:</b> โพสต์/Feed, แชท, โอน/ยืมเครดิต, ขุดเหรียญ, สัตว์เลี้ยง, ระบบแอดมิน, ความปลอดภัยสูง, UI ทันสมัย รองรับมือถือเต็มรูปแบบ
            </div>
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
