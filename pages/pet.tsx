import Navbar from "../components/Navbar";

const mockPets = [
  { name: "แมวน้ำ", image: "/pet-seal.png", bonus: 10, rent: 50 },
  { name: "กระต่ายทอง", image: "/pet-rabbit.png", bonus: 25, rent: 200 },
];

export default function Pet() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-[#101214] pt-8">
        <div className="w-full max-w-md bg-[#181c1f] rounded-2xl shadow-2xl p-6 border border-pink-400/30 text-pink-300">
          <h1 className="text-xl font-bold text-pink-400 mb-4">เช่าสัตว์เลี้ยง</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockPets.map((pet) => (
              <div key={pet.name} className="bg-[#23272b] rounded-xl p-4 flex flex-col items-center shadow">
                <img src={pet.image} className="w-16 h-16 rounded-full mb-2" />
                <span className="font-bold text-lg">{pet.name}</span>
                <span className="text-xs text-pink-200">โบนัส +{pet.bonus}%</span>
                <button className="mt-3 bg-pink-400 text-black px-4 py-1 rounded font-bold hover:bg-pink-300">
                  เช่า {pet.rent} เครดิต/วัน
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="text-center p-4 bg-[#101214] text-pink-200">สัตว์เลี้ยงสร้างแรงบันดาลใจและโบนัส</footer>
    </>
  );
}