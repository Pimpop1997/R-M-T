import { useState } from "react";
import Navbar from "../components/Navbar";

const pets = [
	{ id: 1, name: "แมวทอง", bonus: 0.1, price: 100, type: "รายวัน" },
	{ id: 2, name: "หมาเพชร", bonus: 0.2, price: 500, type: "รายเดือน" },
	{ id: 3, name: "กระต่ายซิ่ง", bonus: 0.05, price: 50, type: "รายวัน" },
];

export default function PetRentalPage() {
	const [rented, setRented] = useState<number | null>(null);
	const [message, setMessage] = useState("");

	const handleRent = (petId: number) => {
		setRented(petId);
		setMessage(
			"เช่าสัตว์เลี้ยงสำเร็จ! โบนัสเครดิตจะถูกนำไปคำนวณกับเครื่องขุดเครดิต"
		);
	};

	return (
		<>
			<Navbar />
			<div className="hacker-bg min-h-screen flex flex-col items-center justify-center py-4 sm:py-8 px-2 sm:px-0">
				<div className="w-full max-w-2xl bg-[#181c1f] rounded-2xl shadow-2xl p-4 sm:p-8 border border-green-400/30 text-green-300 animate-fade-in">
					<h2 className="text-xl sm:text-2xl font-black text-green-400 mb-2 sm:mb-4 tracking-widest text-center">
						RMT Pet Rental
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
						{pets.map((pet) => (
							<div
								key={pet.id}
								className={`rounded-xl border shadow p-3 sm:p-4 flex flex-col items-center text-center text-sm sm:text-base ${
									rented === pet.id ? "bg-green-50 border-green-400" : "bg-white"
								}`}
							>
								<div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🐾</div>
								<div className="font-bold text-base sm:text-lg mb-1">{pet.name}</div>
								<div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
									โบนัส +{pet.bonus * 100}%
								</div>
								<div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
									{pet.type} {pet.price} เครดิต
								</div>
								<button
									className={`mt-2 px-4 py-2 rounded-lg font-semibold transition text-xs sm:text-base ${
										rented === pet.id
											? "bg-green-500 text-white"
											: "bg-indigo-600 hover:bg-indigo-700 text-white"
									}`}
									onClick={() => handleRent(pet.id)}
									disabled={rented === pet.id}
								>
									{rented === pet.id ? "เช่าแล้ว" : "เช่า"}
								</button>
							</div>
						))}
					</div>
					{message && (
						<div className="text-center text-green-600 font-medium mt-4 sm:mt-6 text-sm sm:text-base">
							{message}
						</div>
					)}
				</div>
			</div>
			<style jsx global>{`
				body {
					background: #101214;
				}
				.hacker-bg {
					background: linear-gradient(135deg, #101214 60%, #1a2a1a 100%);
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
					.max-w-2xl { max-width: 100% !important; }
				}
			`}</style>
		</>
	);
}
