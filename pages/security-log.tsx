import Navbar from "../components/Navbar";

const mockLogs = [
  { id: 1, user: "johnny", ip: "192.168.1.10", fingerprint: "a1b2c3", time: "2025-06-09 10:00" },
  { id: 2, user: "alice", ip: "192.168.1.11", fingerprint: "d4e5f6", time: "2025-06-09 11:00" },
];

export default function SecurityLogPage() {
  return (
    <>
      <Navbar />
      <div className="hacker-bg min-h-screen flex flex-col items-center justify-center py-4 sm:py-8 px-2 sm:px-0">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-4 sm:p-8 border-2 border-blue-400/40 text-blue-700 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl font-black text-blue-600 mb-2 sm:mb-4 tracking-widest text-center flex items-center justify-center gap-2">
            <span className="inline-block w-7 h-7 align-middle">
              {/* โลโก้ฉลาม SVG ขนาดเล็ก */}
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="16" ry="16" fill="#3B82F6"/><path d="M8 20C10 15 22 15 24 20C20 18 12 18 8 20Z" fill="#fff"/><path d="M12 16C13 13 19 13 20 16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><circle cx="20.5" cy="17.5" r="1" fill="#3B82F6"/></svg>
            </span>
            RMT Security Log
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border text-xs sm:text-base">
              <thead>
                <tr className="bg-blue-50">
                  <th className="py-2 px-2">ผู้ใช้</th>
                  <th className="py-2 px-2">IP Address</th>
                  <th className="py-2 px-2">Fingerprint</th>
                  <th className="py-2 px-2">เวลา</th>
                </tr>
              </thead>
              <tbody>
                {mockLogs.map(log => (
                  <tr key={log.id} className="text-center border-t">
                    <td className="text-blue-700 font-semibold">{log.user}</td>
                    <td>{log.ip}</td>
                    <td>{log.fingerprint}</td>
                    <td>{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          .max-w-2xl { max-width: 100% !important; }
        }
      `}</style>
    </>
  );
}
