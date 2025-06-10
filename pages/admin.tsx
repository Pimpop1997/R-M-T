import Navbar from "../components/Navbar";
import { useState } from "react";

const mockUsers = [
  { id: 1, username: "johnny", email: "johnny@email.com", credit: 1200 },
  { id: 2, username: "alice", email: "alice@email.com", credit: 800 },
];

const mockLoans = [
  { id: 1, user: "johnny", amount: 500, status: "รออนุมัติ" },
  { id: 2, user: "alice", amount: 200, status: "อนุมัติแล้ว" },
];

export default function AdminDashboard() {
  const [users, setUsers] = useState(mockUsers);
  const [loans, setLoans] = useState(mockLoans);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  // mock chat
  const [chatMsg, setChatMsg] = useState("");
  const [chatLog, setChatLog] = useState<string[]>([]);

  const approveLoan = (id: number) => {
    setLoans(loans => loans.map(l => l.id === id ? { ...l, status: "อนุมัติแล้ว" } : l));
  };
  const addCredit = (id: number, amount: number) => {
    setUsers(users => users.map(u => u.id === id ? { ...u, credit: u.credit + amount } : u));
  };
  const removeCredit = (id: number, amount: number) => {
    setUsers(users => users.map(u => u.id === id ? { ...u, credit: Math.max(0, u.credit - amount) } : u));
  };
  const filteredUsers = users.filter(u => u.username.includes(search) || u.email.includes(search));

  // mock view history
  const handleViewLogin = (user: any) => {
    alert(`ประวัติล็อกอินของ ${user.username} (mock)`);
  };
  const handleViewTx = (user: any) => {
    alert(`ประวัติธุรกรรมของ ${user.username} (mock)`);
  };
  // mock chat
  const handleSendChat = () => {
    if (!chatMsg.trim() || !selectedUser) return;
    setChatLog(log => [...log, `คุณ: ${chatMsg}`]);
    setChatMsg("");
  };

  // ฟีเจอร์ใหม่: ปรับดอกเบี้ย, เครื่องขุด, โบนัสสัตว์เลี้ยง, โอน/ยึดเครดิต
  const [interest, setInterest] = useState(2.5); // % ต่อชม.
  const handleSaveInterest = () => {
    alert(`บันทึกดอกเบี้ยใหม่: ${interest}% ต่อชั่วโมง (mock)`);
  };

  // mock เครื่องขุด
  const [miningMachines, setMiningMachines] = useState([
    { id: 1, name: "Sharky Miner X", rate: 10, price: 500 },
    { id: 2, name: "RMT Turbo S", rate: 25, price: 1200 },
  ]);
  const [newMachine, setNewMachine] = useState({ name: "", rate: 0, price: 0 });
  const handleAddMachine = () => {
    if (!newMachine.name || newMachine.rate <= 0 || newMachine.price <= 0) return;
    setMiningMachines(m => [...m, { ...newMachine, id: Date.now() }]);
    setNewMachine({ name: "", rate: 0, price: 0 });
  };
  const handleRemoveMachine = (id: number) => {
    setMiningMachines(m => m.filter(mm => mm.id !== id));
  };

  // mock โบนัสสัตว์เลี้ยง
  const [petBonus, setPetBonus] = useState(5); // %
  const handleSavePetBonus = () => {
    alert(`บันทึกโบนัสสัตว์เลี้ยงใหม่: ${petBonus}% (mock)`);
  };

  // mock โอน/ยึดเครดิต
  const [creditAction, setCreditAction] = useState("transfer");
  const [creditTarget, setCreditTarget] = useState("");
  const [creditAmount, setCreditAmount] = useState(0);
  const handleCreditAction = () => {
    if (!creditTarget || creditAmount <= 0) return;
    alert(`${creditAction === "transfer" ? "โอน" : "ยึด"}เครดิต ${creditAmount} ให้/จาก ${creditTarget} (mock)`);
  };

  return (
    <>
      <Navbar />
      <div className="hacker-bg min-h-screen flex flex-col items-center justify-center py-4 sm:py-8 px-2 sm:px-0">
        <div className="w-full max-w-4xl bg-[#181c1f] rounded-2xl shadow-2xl p-4 sm:p-8 border border-green-400/30 text-green-300 animate-fade-in">
          <h2 className="text-xl sm:text-2xl font-black text-green-400 mb-2 sm:mb-4 tracking-widest text-center">RMT Admin</h2>
          <div className="mb-4 sm:mb-6 flex flex-col md:flex-row gap-2 sm:gap-4 items-center justify-between">
            <input
              className="px-3 py-2 rounded bg-[#23272b] border border-green-400/40 text-green-200 text-sm sm:text-base"
              placeholder="ค้นหาสมาชิก..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {selectedUser && (
              <div className="flex gap-2 items-center">
                <span className="font-bold text-green-400 text-sm sm:text-base">แชทกับ {selectedUser.username}</span>
                <button className="bg-green-700 text-black px-3 py-1 rounded text-xs sm:text-base" onClick={() => setSelectedUser(null)}>ปิด</button>
              </div>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border mb-4 sm:mb-6 text-xs sm:text-base">
              <thead>
                <tr className="bg-indigo-50 text-green-700">
                  <th className="py-2 px-2">Username</th>
                  <th className="py-2 px-2">Email</th>
                  <th className="py-2 px-2">เครดิต</th>
                  <th className="py-2 px-2">จัดการเครดิต</th>
                  <th className="py-2 px-2">ดูประวัติ</th>
                  <th className="py-2 px-2">แชท</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id} className="text-center border-t">
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{u.credit}</td>
                    <td>
                      <button className="bg-green-500 text-white px-2 py-1 rounded mr-2 text-xs sm:text-base" onClick={() => addCredit(u.id, 100)}>+100</button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-base" onClick={() => removeCredit(u.id, 100)}>-100</button>
                    </td>
                    <td>
                      <button className="bg-[#23272b] border border-green-400/40 text-green-300 px-2 py-1 rounded mr-1 text-xs sm:text-base" onClick={() => handleViewLogin(u)}>ล็อกอิน</button>
                      <button className="bg-[#23272b] border border-green-400/40 text-green-300 px-2 py-1 rounded text-xs sm:text-base" onClick={() => handleViewTx(u)}>ธุรกรรม</button>
                    </td>
                    <td>
                      <button className="bg-green-700 text-black px-2 py-1 rounded text-xs sm:text-base" onClick={() => setSelectedUser(u)}>แชท</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedUser && (
            <div className="mb-6 sm:mb-8 bg-[#23272b] border border-green-400/40 rounded p-3 sm:p-4">
              <div className="font-bold mb-2 text-green-400 text-sm sm:text-base">แชทกับ {selectedUser.username}</div>
              <div className="h-24 sm:h-32 overflow-y-auto bg-[#181c1f] rounded p-2 mb-2 text-green-200 text-xs sm:text-sm">
                {chatLog.map((msg, i) => <div key={i}>{msg}</div>)}
              </div>
              <div className="flex gap-2">
                <input
                  className="flex-1 px-2 py-1 rounded bg-[#181c1f] border border-green-400/40 text-green-200 text-xs sm:text-base"
                  placeholder="พิมพ์ข้อความ..."
                  value={chatMsg}
                  onChange={e => setChatMsg(e.target.value)}
                />
                <button className="bg-green-500 text-black px-4 py-1 rounded text-xs sm:text-base" onClick={handleSendChat}>ส่ง</button>
              </div>
            </div>
          )}

          <h2 className="text-base sm:text-lg font-semibold mb-2">สินเชื่อ</h2>
          <div className="overflow-x-auto">
            <table className="w-full border mb-4 sm:mb-6 text-xs sm:text-base">
              <thead>
                <tr className="bg-indigo-50">
                  <th className="py-2 px-2">ผู้ใช้</th>
                  <th className="py-2 px-2">จำนวน</th>
                  <th className="py-2 px-2">สถานะ</th>
                  <th className="py-2 px-2">อนุมัติ</th>
                </tr>
              </thead>
              <tbody>
                {loans.map(l => (
                  <tr key={l.id} className="text-center border-t">
                    <td>{l.user}</td>
                    <td>{l.amount}</td>
                    <td>{l.status}</td>
                    <td>
                      {l.status === "รออนุมัติ" && (
                        <button className="bg-indigo-600 text-white px-3 py-1 rounded text-xs sm:text-base" onClick={() => approveLoan(l.id)}>อนุมัติ</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-base sm:text-lg font-semibold mb-4 mt-8 border-b border-green-400/30 pb-2">⚡ ฟีเจอร์ควบคุมระบบ (Admin Control)</h2>
          {/* ปรับดอกเบี้ย */}
          <div className="mb-4 sm:mb-6 bg-[#23272b] border border-green-400/40 rounded p-3 sm:p-4">
            <div className="font-bold text-green-400 mb-2 text-sm sm:text-base">ปรับดอกเบี้ยรายชั่วโมง (%)</div>
            <div className="flex gap-2 items-center">
              <input type="number" min="0" step="0.1" value={interest} onChange={e => setInterest(Number(e.target.value))}
                className="w-20 sm:w-24 px-2 py-1 rounded bg-[#181c1f] border border-green-400/40 text-green-200 text-xs sm:text-base" />
              <button className="bg-green-500 text-black px-4 py-1 rounded text-xs sm:text-base" onClick={handleSaveInterest}>บันทึก</button>
            </div>
          </div>
          {/* จัดการเครื่องขุด */}
          <div className="mb-4 sm:mb-6 bg-[#23272b] border border-green-400/40 rounded p-3 sm:p-4">
            <div className="font-bold text-green-400 mb-2 text-sm sm:text-base">ขาย/จัดการเครื่องขุดเหรียญ</div>
            <div className="overflow-x-auto">
              <table className="w-full mb-2 text-green-200 text-xs sm:text-base">
                <thead>
                  <tr className="text-green-400">
                    <th>ชื่อเครื่อง</th><th>อัตราขุด/ชม.</th><th>ราคา</th><th>ลบ</th>
                  </tr>
                </thead>
                <tbody>
                  {miningMachines.map(mm => (
                    <tr key={mm.id} className="text-center border-t">
                      <td>{mm.name}</td><td>{mm.rate}</td><td>{mm.price}</td>
                      <td><button className="bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-base" onClick={() => handleRemoveMachine(mm.id)}>ลบ</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              <input placeholder="ชื่อเครื่อง" value={newMachine.name} onChange={e => setNewMachine(n => ({ ...n, name: e.target.value }))}
                className="px-2 py-1 rounded bg-[#181c1f] border border-green-400/40 text-green-200 text-xs sm:text-base" />
              <input type="number" min="1" placeholder="อัตราขุด" value={newMachine.rate || ""} onChange={e => setNewMachine(n => ({ ...n, rate: Number(e.target.value) }))}
                className="w-20 sm:w-24 px-2 py-1 rounded bg-[#181c1f] border border-green-400/40 text-green-200 text-xs sm:text-base" />
              <input type="number" min="1" placeholder="ราคา" value={newMachine.price || ""} onChange={e => setNewMachine(n => ({ ...n, price: Number(e.target.value) }))}
                className="w-20 sm:w-24 px-2 py-1 rounded bg-[#181c1f] border border-green-400/40 text-green-200 text-xs sm:text-base" />
              <button className="bg-green-500 text-black px-4 py-1 rounded text-xs sm:text-base" onClick={handleAddMachine}>เพิ่ม</button>
            </div>
          </div>
          {/* ปรับโบนัสสัตว์เลี้ยง */}
          <div className="mb-4 sm:mb-6 bg-[#23272b] border border-green-400/40 rounded p-3 sm:p-4">
            <div className="font-bold text-green-400 mb-2 text-sm sm:text-base">ปรับโบนัสสัตว์เลี้ยง (%)</div>
            <div className="flex gap-2 items-center">
              <input type="number" min="0" step="0.1" value={petBonus} onChange={e => setPetBonus(Number(e.target.value))}
                className="w-20 sm:w-24 px-2 py-1 rounded bg-[#181c1f] border border-green-400/40 text-green-200 text-xs sm:text-base" />
              <button className="bg-green-500 text-black px-4 py-1 rounded text-xs sm:text-base" onClick={handleSavePetBonus}>บันทึก</button>
            </div>
          </div>
          {/* โอน/ยึดเครดิตสมาชิก */}
          <div className="mb-4 sm:mb-6 bg-[#23272b] border border-green-400/40 rounded p-3 sm:p-4">
            <div className="font-bold text-green-400 mb-2 text-sm sm:text-base">โอน/ยึดเครดิตสมาชิก</div>
            <div className="flex gap-2 items-center flex-wrap">
              <select value={creditAction} onChange={e => setCreditAction(e.target.value)}
                className="px-2 py-1 rounded bg-[#181c1f] border border-green-400/40 text-green-200 text-xs sm:text-base">
                <option value="transfer">โอนเครดิต</option>
                <option value="seize">ยึดเครดิต</option>
              </select>
              <input placeholder="username" value={creditTarget} onChange={e => setCreditTarget(e.target.value)}
                className="px-2 py-1 rounded bg-[#181c1f] border border-green-400/40 text-green-200 text-xs sm:text-base" />
              <input type="number" min="1" placeholder="จำนวน" value={creditAmount || ""} onChange={e => setCreditAmount(Number(e.target.value))}
                className="w-20 sm:w-24 px-2 py-1 rounded bg-[#181c1f] border border-green-400/40 text-green-200 text-xs sm:text-base" />
              <button className="bg-green-500 text-black px-4 py-1 rounded text-xs sm:text-base" onClick={handleCreditAction}>{creditAction === "transfer" ? "โอน" : "ยึด"}</button>
            </div>
          </div>

          <h2 className="text-base sm:text-lg font-semibold mb-2">หมายเหตุ</h2>
          <ul className="list-disc ml-6 text-gray-600 text-xs sm:text-sm">
            <li>สามารถตรวจสอบลายนิ้วมือและ IP Address ได้ที่หน้า "บันทึกความปลอดภัย"</li>
            <li>จัดการการเช่าสัตว์เลี้ยงและตั้งค่าระบบขุดเครดิตได้ที่หน้าอื่น</li>
            <li>ฟีเจอร์ขโมยเหรียญ/เครดิต (admin only) อยู่ระหว่างพัฒนา</li>
          </ul>
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
          .max-w-4xl { max-width: 100% !important; }
        }
      `}</style>
    </>
  );
}
