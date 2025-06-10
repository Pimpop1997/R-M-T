import { useState } from "react";
import Navbar from "../components/Navbar";

export default function CreditPage() {
  // ตัวอย่างข้อมูลเครดิตและสถานะ
  const [credit, setCredit] = useState(1200);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanStatus, setLoanStatus] = useState("อนุมัติแล้ว");
  const [loanInterest, setLoanInterest] = useState(0.05); // 5% ต่อชั่วโมง
  const [loanActive, setLoanActive] = useState(false);
  const [message, setMessage] = useState("");

  // ฟังก์ชันจำลองการโอนเครดิต
  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`โอน ${transferAmount} เครดิต ไปยัง ${transferTo} สำเร็จ!`);
    setTransferAmount("");
    setTransferTo("");
  };

  // ฟังก์ชันจำลองการยืมเครดิต
  const handleLoan = (e: React.FormEvent) => {
    e.preventDefault();
    setLoanActive(true);
    setLoanStatus("รออนุมัติ");
    setMessage(`ขอยืม ${loanAmount} เครดิต รออนุมัติจากแอดมิน`);
    setLoanAmount("");
  };

  return (
    <>
      <Navbar />
      <div className="hacker-bg min-h-screen flex flex-col items-center justify-center py-4 sm:py-8 px-2 sm:px-0">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-4 sm:p-8 border-2 border-blue-400/40 text-blue-700 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl font-black text-blue-600 mb-2 sm:mb-4 tracking-widest text-center flex items-center justify-center gap-2">
            <span className="inline-block w-7 h-7 align-middle">
              {/* โลโก้ฉลาม SVG ขนาดเล็ก */}
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="16" ry="16" fill="#3B82F6"/><path d="M8 20C10 15 22 15 24 20C20 18 12 18 8 20Z" fill="#fff"/><path d="M12 16C13 13 19 13 20 16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><circle cx="20.5" cy="17.5" r="1" fill="#3B82F6"/></svg>
            </span>
            RMT Credit
          </h2>
          <div className="text-center text-3xl sm:text-4xl font-bold text-blue-700 mb-4 sm:mb-6">{credit} ฿</div>

          <form onSubmit={handleTransfer} className="mb-6 sm:mb-8 space-y-2 sm:space-y-3 bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="font-semibold text-blue-600 text-sm sm:text-base">โอนเครดิต</div>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2 rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-blue-400 text-sm sm:text-base bg-white focus:outline-none transition"
              placeholder="อีเมลผู้รับ"
              value={transferTo}
              onChange={e => setTransferTo(e.target.value)}
              required
            />
            <input
              type="number"
              className="w-full px-3 sm:px-4 py-2 rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-blue-400 text-sm sm:text-base bg-white focus:outline-none transition"
              placeholder="จำนวนเครดิต"
              value={transferAmount}
              onChange={e => setTransferAmount(e.target.value)}
              min={1}
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition text-sm sm:text-base"
            >
              โอนเครดิต
            </button>
          </form>

          <form onSubmit={handleLoan} className="mb-6 sm:mb-8 space-y-2 sm:space-y-3 bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="font-semibold text-blue-600 text-sm sm:text-base">ยืมเครดิต</div>
            <input
              type="number"
              className="w-full px-3 sm:px-4 py-2 rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-blue-400 text-sm sm:text-base bg-white focus:outline-none transition"
              placeholder="จำนวนที่ต้องการยืม"
              value={loanAmount}
              onChange={e => setLoanAmount(e.target.value)}
              min={1}
              required
            />
            <div className="text-xs sm:text-sm text-blue-400">ดอกเบี้ย {loanInterest * 100}% ต่อชั่วโมง</div>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition text-sm sm:text-base"
            >
              ขอสินเชื่อ
            </button>
          </form>

          {loanActive && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="font-semibold text-yellow-700 text-sm sm:text-base">สถานะสินเชื่อ: {loanStatus}</div>
              <div className="text-xs sm:text-sm text-gray-600">ติดตามสถานะการชำระและดอกเบี้ยได้ที่นี่</div>
            </div>
          )}

          {message && <div className="text-center text-blue-600 font-medium mt-2 text-sm sm:text-base">{message}</div>}
        </div>
      </div>
      <style jsx global>{`
        body { background: #f4f8fb; font-family: 'Prompt', 'Kanit', 'Inter', sans-serif; }
        .hacker-bg {
          background: linear-gradient(135deg, #e0e7ef 60%, #c7d2fe 100%);
        }
        .animate-fade-in {
          animation: fadeIn 0.7s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        @media (max-width: 640px) {
          .max-w-lg { max-width: 100% !important; }
        }
      `}</style>
    </>
  );
}
