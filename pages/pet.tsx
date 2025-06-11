import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import supabase from "../utils/supabaseClient";

export default function Pet() {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPets() {
      setLoading(true);
      setError("");
      const { data, error } = await supabase
        .from("pets")
        .select("id,name,image,bonus,price");
      if (error) setError("โหลดข้อมูลสัตว์เลี้ยงไม่สำเร็จ");
      else setPets(data || []);
      setLoading(false);
    }
    fetchPets();
  }, []);

  return (
    <>
      <Navbar />
      <div className="hacker-bg min-h-screen flex flex-col items-center pt-8 pb-4 px-2 sm:px-0">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-400/40 text-blue-700 animate-fade-in">
          <h1 className="text-2xl font-black text-blue-600 mb-4 flex items-center gap-2 justify-center">
            <span className="inline-block w-7 h-7 align-middle">
              {/* โลโก้ฉลาม SVG ขนาดเล็ก */}
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <ellipse cx="16" cy="16" rx="16" ry="16" fill="#3B82F6" />
                <path
                  d="M8 20C10 15 22 15 24 20C20 18 12 18 8 20Z"
                  fill="#fff"
                />
                <path
                  d="M12 16C13 13 19 13 20 16"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="20.5" cy="17.5" r="1" fill="#3B82F6" />
              </svg>
            </span>
            เช่าสัตว์เลี้ยง
          </h1>
          {error && (
            <div className="text-red-500 text-center mb-4" role="alert">
              {error}
            </div>
          )}
          {loading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              aria-busy="true"
            >
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-blue-50 rounded-xl p-4 flex flex-col items-center shadow border border-blue-100 animate-pulse min-h-[170px]"
                  aria-hidden="true"
                >
                  <div className="w-16 h-16 rounded-full mb-2 bg-blue-100" />
                  <div className="h-4 w-20 bg-blue-100 rounded mb-1" />
                  <div className="h-3 w-16 bg-blue-100 rounded mb-2" />
                  <div className="h-8 w-24 bg-blue-200 rounded" />
                </div>
              ))}
            </div>
          ) : pets.length === 0 ? (
            <div className="text-center text-blue-400 py-8">
              ไม่พบสัตว์เลี้ยงในระบบ
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pets.map((pet) => (
                <div
                  key={pet.id}
                  className="bg-blue-50 rounded-xl p-4 flex flex-col items-center shadow border border-blue-100 transition-transform hover:scale-105 hover:shadow-xl focus-within:scale-105 focus-within:shadow-xl outline-none"
                  tabIndex={0}
                  aria-label={`ข้อมูลสัตว์เลี้ยง ${pet.name}`}
                >
                  <img
                    src={pet.image || "/pet-default.png"}
                    alt={pet.name}
                    className="w-16 h-16 rounded-full mb-2 border-2 border-blue-200 object-cover shadow-sm"
                    loading="lazy"
                  />
                  <span className="font-bold text-lg text-blue-700">
                    {pet.name}
                  </span>
                  <span className="text-xs text-blue-400">
                    โบนัส +{pet.bonus}%
                  </span>
                  <button
                    className="mt-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-4 py-1.5 rounded font-bold transition shadow focus:ring-2 focus:ring-blue-300 focus:outline-none active:scale-95"
                    aria-label={`เช่าสัตว์เลี้ยง ${pet.name} ราคา ${pet.price} เครดิตต่อวัน`}
                    disabled={loading}
                  >
                    เช่า {pet.price} เครดิต/วัน
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <footer className="text-center p-4 bg-transparent text-blue-400">
        สัตว์เลี้ยงสร้างแรงบันดาลใจและโบนัส
      </footer>
      <style jsx global>{`
        body {
          background: #f4f8fb;
          font-family: "Prompt", "Kanit", "Inter", sans-serif;
        }
        .hacker-bg {
          background: linear-gradient(135deg, #e0e7ef 60%, #c7d2fe 100%);
        }
        .animate-fade-in {
          animation: fadeIn 0.7s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @media (max-width: 640px) {
          .max-w-xl {
            max-width: 100% !important;
          }
        }
      `}</style>
    </>
  );
}