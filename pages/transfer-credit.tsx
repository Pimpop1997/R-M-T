
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function TransferCredit() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("กำลังโอน...");
    // Replace the following with actual API call to handle the credit transfer
    setTimeout(() => setMsg(`โอนเครดิต ${amount} ไปยัง ${email} สำเร็จ!`), 1200);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-[#101214] pt-8">
        <div className="w-full max-w-md bg-[#181c1f] rounded-2xl shadow-2xl p-6 border border-green-400/30 text-green-300">
          <h1 className="text-xl font-bold text-green-400 mb-4">โอนเครดิต</h1>
          <form onSubmit={handleTransfer}>
            <input
              className="w-full mb-2 rounded p-2"
              placeholder="อีเมลผู้รับ"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              className="w-full mb-2 rounded p-2"
              placeholder="จำนวนเครดิต"
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
            <button className="w-full bg-yellow-400 text-black py-2 rounded font-bold mt-2 hover:bg-yellow-300" type="submit">
              โอนเครดิต
            </button>
          </form>
          {msg && <div className="mt-2 text-green-200">{msg}</div>}
        </div>
      </div>
      <footer className="text-center p-4 bg-[#101214] text-green-200">โอนเครดิตระหว่างสมาชิก</footer>
    </>
  );
}
