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
        <div className="w-full max-w-2xl bg-[#181c1f] rounded-2xl shadow-2xl p-4 sm:p-8 border border-green-400/30 text-green-300 animate-fade-in">
          <h2 className="text-xl sm:text-2xl font-black text-green-400 mb-2 sm:mb-4 tracking-widest text-center">RMT Security Log</h2>
          <div className="overflow-x-auto">
            <table className="w-full border text-xs sm:text-base">
              <thead>
                <tr className="bg-indigo-50">
                  <th className="py-2 px-2">ผู้ใช้</th>
                  <th className="py-2 px-2">IP Address</th>
                  <th className="py-2 px-2">Fingerprint</th>
                  <th className="py-2 px-2">เวลา</th>
                </tr>
              </thead>
              <tbody>
                {mockLogs.map(log => (
                  <tr key={log.id} className="text-center border-t">
                    <td>{log.user}</td>
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
          .max-w-2xl { max-width: 100% !important; }
        }
      `}</style>
    </>
  );
}
