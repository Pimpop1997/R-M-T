import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import supabase from "../utils/supabaseClient";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");

  // ดึงเครดิตปัจจุบันของผู้ใช้ (สมมติใช้ auth user)
  useEffect(() => {
    async function fetchCredit() {
      setLoading(true);
      setError("");
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("กรุณาเข้าสู่ระบบ");
        const { data, error } = await supabase
          .from("users")
          .select("credit")
          .eq("id", user.id)
          .single();
        if (error) throw error;
        setCredit(data.credit);
      } catch (err: any) {
        setError(err.message || "เกิดข้อผิดพลาด");
      }
      setLoading(false);
    }
    fetchCredit();
  }, []);

  // โอนเครดิต (API จริง)
  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("กรุณาเข้าสู่ระบบ");
      const res = await fetch("/api/credit/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to_email: transferTo, amount: Number(transferAmount) })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "โอนเครดิตไม่สำเร็จ");
      setMessage(result.message || "โอนเครดิตสำเร็จ");
      setTransferAmount("");
      setTransferTo("");
      // อัปเดตเครดิตใหม่
      const { data, error } = await supabase
        .from("users")
        .select("credit")
        .eq("id", user.id)
        .single();
      if (!error) setCredit(data.credit);
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาด");
    }
    setLoading(false);
  };

  // ขอสินเชื่อ (API จริง)
  const handleLoan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("กรุณาเข้าสู่ระบบ");
      const res = await fetch("/api/credit/loan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(loanAmount) })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "ขอสินเชื่อไม่สำเร็จ");
      setLoanActive(true);
      setLoanStatus("รออนุมัติ");
      setMessage(result.message || "ขอสินเชื่อสำเร็จ");
      setLoanAmount("");
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาด");
    }
    setLoading(false);
  };

  // ดึงประวัติธุรกรรมเครดิต
  useEffect(() => {
    async function fetchHistory() {
      setHistoryLoading(true);
      setHistoryError("");
      try {
        const res = await fetch("/api/credit/history");
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "ไม่สามารถโหลดประวัติธุรกรรมได้");
        setHistory(result.transactions || []);
      } catch (err: any) {
        setHistoryError(err.message || "เกิดข้อผิดพลาด");
      }
      setHistoryLoading(false);
    }
    fetchHistory();
  }, []);

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
          <div className="text-center text-3xl sm:text-4xl font-bold text-blue-700 mb-4 sm:mb-6">{loading ? <span className="animate-pulse">...</span> : credit} ฿</div>

          {error && <div className="text-center text-red-500 font-medium mb-2 text-sm sm:text-base">{error}</div>}

          <form onSubmit={handleTransfer} className="mb-6 sm:mb-8 space-y-2 sm:space-y-3 bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="font-semibold text-blue-600 text-sm sm:text-base">โอนเครดิต</div>
            <input
              type="text"
              className="w-full px-3 sm:px-4 py-2 rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-blue-400 text-sm sm:text-base bg-white focus:outline-none transition"
              placeholder="อีเมลผู้รับ"
              value={transferTo}
              onChange={e => setTransferTo(e.target.value)}
              required
              disabled={loading}
            />
            <input
              type="number"
              className="w-full px-3 sm:px-4 py-2 rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-blue-400 text-sm sm:text-base bg-white focus:outline-none transition"
              placeholder="จำนวนเครดิต"
              value={transferAmount}
              onChange={e => setTransferAmount(e.target.value)}
              min={1}
              required
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition text-sm sm:text-base"
              disabled={loading}
            >
              {loading ? "กำลังโอน..." : "โอนเครดิต"}
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
              disabled={loading}
            />
            <div className="text-xs sm:text-sm text-blue-400">ดอกเบี้ย {loanInterest * 100}% ต่อชั่วโมง</div>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition text-sm sm:text-base"
              disabled={loading}
            >
              {loading ? "กำลังขอสินเชื่อ..." : "ขอสินเชื่อ"}
            </button>
          </form>

          {loanActive && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="font-semibold text-yellow-700 text-sm sm:text-base">สถานะสินเชื่อ: {loanStatus}</div>
              <div className="text-xs sm:text-sm text-gray-600">ติดตามสถานะการชำระและดอกเบี้ยได้ที่นี่</div>
            </div>
          )}

          {message && <div className="text-center text-blue-600 font-medium mt-2 text-sm sm:text-base">{message}</div>}

          {/* ประวัติธุรกรรมเครดิต */}
          <div className="mt-8">
            <div className="font-bold text-blue-700 mb-2 text-base sm:text-lg">ประวัติธุรกรรมเครดิต</div>
            {historyLoading ? (
              <div className="text-blue-400 text-center">กำลังโหลด...</div>
            ) : historyError ? (
              <div className="text-red-500 text-center">{historyError}</div>
            ) : history.length === 0 ? (
              <div className="text-blue-400 text-center">ไม่มีประวัติธุรกรรม</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border text-xs sm:text-base bg-blue-50 rounded-xl">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="py-2 px-2">วันที่</th>
                      <th className="py-2 px-2">ประเภท</th>
                      <th className="py-2 px-2">จาก</th>
                      <th className="py-2 px-2">ถึง</th>
                      <th className="py-2 px-2">จำนวน</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((tx) => (
                      <tr key={tx.id} className="text-center border-t">
                        <td>{new Date(tx.created_at).toLocaleString()}</td>
                        <td>{tx.type === 'transfer' ? 'โอน' : tx.type === 'loan' ? 'ยืม' : tx.type}</td>
                        <td>{tx.from_id ? tx.from_id.slice(0, 6) : '-'}</td>
                        <td>{tx.to_id ? tx.to_id.slice(0, 6) : '-'}</td>
                        <td className="font-bold text-blue-700">{tx.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
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
