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
        <div className="w-full max-w-lg bg-[#181c1f] rounded-2xl shadow-2xl p-4 sm:p-8 border border-green-400/30 text-green-300 animate-fade-in">
          <h2 className="text-xl sm:text-2xl font-black text-green-400 mb-2 sm:mb-4 tracking-widest text-center">RMT Credit</h2>
          <div className="text-center text-3xl sm:text-4xl font-bold text-green-600 mb-4 sm:mb-6">{credit} ฿</div>

          <form onSubmit={handleTransfer} className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
            <div className="font-semibold text-gray-700 text-sm sm:text-base">โอนเครดิต</div>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              placeholder="อีเมลผู้รับ"
              value={transferTo}
              onChange={e => setTransferTo(e.target.value)}
              required
            />
            <input
              type="number"
              className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              placeholder="จำนวนเครดิต"
              value={transferAmount}
              onChange={e => setTransferAmount(e.target.value)}
              min={1}
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition text-sm sm:text-base"
            >
              โอนเครดิต
            </button>
          </form>

          <form onSubmit={handleLoan} className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
            <div className="font-semibold text-gray-700 text-sm sm:text-base">ยืมเครดิต</div>
            <input
              type="number"
              className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              placeholder="จำนวนที่ต้องการยืม"
              value={loanAmount}
              onChange={e => setLoanAmount(e.target.value)}
              min={1}
              required
            />
            <div className="text-xs sm:text-sm text-gray-500">ดอกเบี้ย {loanInterest * 100}% ต่อชั่วโมง</div>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition text-sm sm:text-base"
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

          {message && <div className="text-center text-indigo-600 font-medium mt-2 text-sm sm:text-base">{message}</div>}
        </div>
      </div>
      <style jsx global>{`
        body { background: #101214; }
        .hacker-bg {
          background: linear-gradient(135deg, #101214 60%, #1a2a1a 100%);
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
