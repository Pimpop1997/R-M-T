
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function BorrowCredit() {
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");

  const handleBorrow = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("กำลังดำเนินการ...");
    // Replace the following with actual API call for borrowing credit
    setTimeout(() => setMsg(`ขอยืมเครดิต ${amount} สำเร็จ! (รออนุมัติจากแอดมิน)`), 1200);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-[#101214] pt-8">
        <div className="w-full max-w-md bg-[#181c1f] rounded-2xl shadow-2xl p-6 border border-purple-400/30 text-purple-300">
          <h1 className="text-xl font-bold text-purple-400 mb-4">ขอยืมเครดิต</h1>
          <form onSubmit={handleBorrow}>
            <input
              className="w-full mb-2 rounded p-2"
              placeholder="จำนวนเครดิตที่ต้องการยืม"
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
            <button className="w-full bg-purple-400 text-black py-2 rounded font-bold mt-2 hover:bg-purple-300" type="submit">
              ขอยืมเครดิต
            </button>
          </form>
          {msg && <div className="mt-2 text-purple-200">{msg}</div>}
        </div>
      </div>
      <footer className="text-center p-4 bg-[#101214] text-purple-200">ขอยืมเครดิตจากระบบ</footer>
    </>
  );
}
