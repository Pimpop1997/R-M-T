import { useState } from "react";
import Navbar from "../components/Navbar";

export default function AdminPetDashboard() {
  const [pets, setPets] = useState([
    { id: 1, name: "แมวทอง", bonus: 0.1, price: 100, type: "รายวัน" },
    { id: 2, name: "หมาเพชร", bonus: 0.2, price: 500, type: "รายเดือน" },
    { id: 3, name: "กระต่ายซิ่ง", bonus: 0.05, price: 50, type: "รายวัน" },
  ]);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", bonus: "", price: "", type: "รายวัน" });
  const [message, setMessage] = useState("");

  const handleEdit = (pet: any) => {
    setEditId(pet.id);
    setForm({ name: pet.name, bonus: String(pet.bonus * 100), price: String(pet.price), type: pet.type });
  };

  const handleSave = (id: number) => {
    setPets(pets.map(p => p.id === id ? { ...p, name: form.name, bonus: Number(form.bonus) / 100, price: Number(form.price), type: form.type } : p));
    setEditId(null);
    setMessage("บันทึกข้อมูลสัตว์เลี้ยงสำเร็จ");
  };

  const handleAdd = () => {
    const newId = pets.length ? Math.max(...pets.map(p => p.id)) + 1 : 1;
    setPets([...pets, { id: newId, name: form.name, bonus: Number(form.bonus) / 100, price: Number(form.price), type: form.type }]);
    setForm({ name: "", bonus: "", price: "", type: "รายวัน" });
    setMessage("เพิ่มสัตว์เลี้ยงใหม่สำเร็จ");
  };

  const handleDelete = (id: number) => {
    setPets(pets.filter(p => p.id !== id));
    setMessage("ลบสัตว์เลี้ยงสำเร็จ");
  };

  return (
    <>
      <Navbar />
      <div className="hacker-bg min-h-screen flex flex-col items-center justify-center py-4 sm:py-8 px-2 sm:px-0">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-4 sm:p-8 border-2 border-blue-400/40 text-blue-700 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl font-black text-blue-600 mb-2 sm:mb-4 tracking-widest text-center flex items-center justify-center gap-2">
            <span className="inline-block w-7 h-7 align-middle">
              {/* โลโก้ฉลาม SVG ขนาดเล็ก */}
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="16" ry="16" fill="#3B82F6"/><path d="M8 20C10 15 22 15 24 20C20 18 12 18 8 20Z" fill="#fff"/><path d="M12 16C13 13 19 13 20 16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><circle cx="20.5" cy="17.5" r="1" fill="#3B82F6"/></svg>
            </span>
            RMT Admin Pet
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full mb-4 sm:mb-8 border text-xs sm:text-base bg-blue-50 rounded-xl">
              <thead>
                <tr className="bg-blue-100">
                  <th className="py-2 px-2">ชื่อ</th>
                  <th className="py-2 px-2">โบนัส (%)</th>
                  <th className="py-2 px-2">ราคา</th>
                  <th className="py-2 px-2">ประเภท</th>
                  <th className="py-2 px-2">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {pets.map((pet) => (
                  <tr key={pet.id} className="text-center border-t">
                    {editId === pet.id ? (
                      <>
                        <td><input className="border-2 border-blue-200 rounded px-2 py-1 text-xs sm:text-base focus:outline-none focus:border-blue-400 transition" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></td>
                        <td><input className="border-2 border-blue-200 rounded px-2 py-1 w-12 sm:w-16 text-xs sm:text-base focus:outline-none focus:border-blue-400 transition" type="number" value={form.bonus} onChange={e => setForm(f => ({ ...f, bonus: e.target.value }))} /></td>
                        <td><input className="border-2 border-blue-200 rounded px-2 py-1 w-16 sm:w-20 text-xs sm:text-base focus:outline-none focus:border-blue-400 transition" type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} /></td>
                        <td>
                          <select className="border-2 border-blue-200 rounded px-2 py-1 text-xs sm:text-base focus:outline-none focus:border-blue-400 transition" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                            <option value="รายวัน">รายวัน</option>
                            <option value="รายเดือน">รายเดือน</option>
                          </select>
                        </td>
                        <td>
                          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2 text-xs sm:text-base transition" onClick={() => handleSave(pet.id)}>บันทึก</button>
                          <button className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded text-xs sm:text-base transition" onClick={() => setEditId(null)}>ยกเลิก</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{pet.name}</td>
                        <td>+{pet.bonus * 100}%</td>
                        <td>{pet.price}</td>
                        <td>{pet.type}</td>
                        <td>
                          <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2 text-xs sm:text-base transition" onClick={() => handleEdit(pet)}>แก้ไข</button>
                          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs sm:text-base transition" onClick={() => handleDelete(pet.id)}>ลบ</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-2 sm:mb-4 font-semibold text-sm sm:text-base text-blue-600">เพิ่มสัตว์เลี้ยงใหม่</div>
          <div className="flex gap-2 mb-4 sm:mb-6 flex-wrap">
            <input className="border-2 border-blue-200 rounded px-2 py-1 text-xs sm:text-base focus:outline-none focus:border-blue-400 transition" placeholder="ชื่อ" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <input className="border-2 border-blue-200 rounded px-2 py-1 w-12 sm:w-16 text-xs sm:text-base focus:outline-none focus:border-blue-400 transition" type="number" placeholder="โบนัส (%)" value={form.bonus} onChange={e => setForm(f => ({ ...f, bonus: e.target.value }))} />
            <input className="border-2 border-blue-200 rounded px-2 py-1 w-16 sm:w-20 text-xs sm:text-base focus:outline-none focus:border-blue-400 transition" type="number" placeholder="ราคา" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
            <select className="border-2 border-blue-200 rounded px-2 py-1 text-xs sm:text-base focus:outline-none focus:border-blue-400 transition" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              <option value="รายวัน">รายวัน</option>
              <option value="รายเดือน">รายเดือน</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-xs sm:text-base transition font-bold" onClick={handleAdd}>เพิ่ม</button>
          </div>
          {message && <div className="text-center text-blue-600 font-medium mt-2 text-xs sm:text-base">{message}</div>}
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
          .max-w-3xl { max-width: 100% !important; }
        }
      `}</style>
    </>
  );
}
