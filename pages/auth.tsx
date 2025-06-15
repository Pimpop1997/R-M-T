import RegisterForm from "../frontend/src/modules/auth/RegisterForm";
import LoginForm from "../frontend/src/modules/auth/LoginForm";
import UserProfile from "../frontend/src/modules/auth/UserProfile";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function AuthPage() {
  const [show, setShow] = useState<'login' | 'register' | 'profile'>('login');
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen w-full hacker-bg px-2 sm:px-0">
        <div className="w-full max-w-md bg-[#181c1f] rounded-2xl shadow-2xl p-4 sm:p-8 border border-green-400/30 text-green-300 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <button
              className={`w-full sm:w-auto px-4 py-2 rounded-lg font-semibold transition border border-green-400/40 shadow ${show === 'login' ? 'bg-green-700 text-black' : 'bg-[#23272b] text-green-300 hover:bg-green-900/60'}`}
              onClick={() => setShow('login')}
            >1. เข้าสู่ระบบ</button>
            <button
              className={`w-full sm:w-auto px-4 py-2 rounded-lg font-semibold transition border border-green-400/40 shadow ${show === 'register' ? 'bg-green-700 text-black' : 'bg-[#23272b] text-green-300 hover:bg-green-900/60'}`}
              onClick={() => setShow('register')}
            >2. สมัครสมาชิก</button>
            <button
              className={`w-full sm:w-auto px-4 py-2 rounded-lg font-semibold transition border border-green-400/40 shadow ${show === 'profile' ? 'bg-green-700 text-black' : 'bg-[#23272b] text-green-300 hover:bg-green-900/60'}`}
              onClick={() => setShow('profile')}
            >3. โปรไฟล์</button>
          </div>
          <div className="hacker-form">
            {show === 'login' && <LoginForm onSuccess={() => setShow('profile')} />}
            {show === 'register' && <RegisterForm onSuccess={() => setShow('login')} />}
            {show === 'profile' && <UserProfile />}
          </div>
        </div>
      </div>
      <style jsx global>{`
        body { background: #101214; }
        .hacker-bg {
          background: linear-gradient(135deg, #101214 60%, #1a2a1a 100%);
        }
        .hacker-form input, .hacker-form textarea {
          background: #23272b;
          color: #00ff90;
          border: 1px solid #00ff90;
          font-size: 1rem;
        }
        .hacker-form input:focus, .hacker-form textarea:focus {
          outline: 2px solid #00ff90;
          background: #181c1f;
        }
        .hacker-form button {
          background: #00ff90;
          color: #181c1f;
          font-size: 1rem;
        }
        .hacker-form button:hover {
          background: #00cc6a;
        }
        .animate-fade-in {
          animation: fadeIn 0.7s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        @media (max-width: 640px) {
          .hacker-form input, .hacker-form textarea {
            font-size: 0.95rem;
            padding: 0.5rem 0.75rem;
          }
          .hacker-form button {
            font-size: 0.95rem;
            padding: 0.5rem 0.75rem;
          }
        }
      `}</style>
    </>
  );
}
