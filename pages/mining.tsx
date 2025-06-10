import Navbar from "../components/Navbar";
import { useState } from "react";

const miningPresets = [
  { id: 1, name: "เครื่องขุดมาตรฐาน", speed: 1, power: 10, difficulty: 1, rate: 1 },
  { id: 2, name: "เครื่องขุดโปร+สัตว์เลี้ยง", speed: 2, power: 15, difficulty: 0.8, rate: 1.5 },
];

export default function MiningPage() {
  const [selected, setSelected] = useState(1);
  const [bonus, setBonus] = useState(0.1); // สมมุติได้จากสัตว์เลี้ยง
  const [mined, setMined] = useState(0);
  const [running, setRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const preset = miningPresets.find(p => p.id === selected)!;
  const effectiveRate = preset.rate * (1 + bonus);

  const startMining = () => {
    if (running) return;
    setRunning(true);
    const id = setInterval(() => {
      setMined(m => m + effectiveRate);
    }, 1000);
    setIntervalId(id);
  };
  const stopMining = () => {
    setRunning(false);
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
  };

  return (
    <>
      <Navbar />
      <div className="hacker-bg min-h-screen flex flex-col items-center justify-center py-4 sm:py-8 px-2 sm:px-0">
        <div className="w-full max-w-xl bg-[#181c1f] rounded-2xl shadow-2xl p-4 sm:p-8 border border-green-400/30 text-green-300 animate-fade-in">
          <h2 className="text-xl sm:text-2xl font-black text-green-400 mb-2 sm:mb-4 tracking-widest text-center">RMT Mining</h2>
          <div className="mb-2 sm:mb-4">
            <label className="font-semibold text-sm sm:text-base">เลือกเครื่องขุด:</label>
            <select
              className="ml-2 border rounded px-2 py-1 text-sm sm:text-base"
              value={selected}
              onChange={e => setSelected(Number(e.target.value))}
              disabled={running}
            >
              {miningPresets.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-2 sm:mb-4 text-xs sm:text-base">ความเร็ว: <b>{preset.speed}</b> | กำลังไฟ: <b>{preset.power}</b> | ความยาก: <b>{preset.difficulty}</b></div>
          <div className="mb-2 sm:mb-4 text-xs sm:text-base">โบนัสสัตว์เลี้ยง: <span className="text-green-600 font-bold">+{bonus * 100}%</span></div>
          <div className="mb-2 sm:mb-4 text-xs sm:text-base">อัตราขุดสุทธิ: <span className="text-indigo-600 font-bold">{effectiveRate.toFixed(2)}</span> เครดิต/วินาที</div>
          <div className="mb-4 sm:mb-6 text-center text-2xl sm:text-3xl font-bold text-green-700">{mined.toFixed(2)} เครดิต</div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
            <button
              className="px-4 sm:px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-60 text-sm sm:text-base"
              onClick={startMining}
              disabled={running}
            >เริ่มขุด</button>
            <button
              className="px-4 sm:px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded-lg shadow-md transition disabled:opacity-60 text-sm sm:text-base"
              onClick={stopMining}
              disabled={!running}
            >หยุดขุด</button>
          </div>
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
          .max-w-xl { max-width: 100% !important; }
        }
      `}</style>
    </>
  );
}
