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
				<div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-4 sm:p-8 border-2 border-blue-400/40 text-blue-700 animate-fade-in">
					<h2 className="text-2xl sm:text-3xl font-black text-blue-600 mb-2 sm:mb-4 tracking-widest text-center flex items-center justify-center gap-2">
						<span className="inline-block w-7 h-7 align-middle">
							{/* โลโก้ฉลาม SVG ขนาดเล็ก */}
							<svg
								width="28"
								height="28"
								viewBox="0 0 32 32"
								fill="none"
							>
								<ellipse
									cx="16"
									cy="16"
									rx="16"
									ry="16"
									fill="#3B82F6"
								/>
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
								<circle
									cx="20.5"
									cy="17.5"
									r="1"
									fill="#3B82F6"
								/>
							</svg>
						</span>
						RMT Pet Rental
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
						{pets.map((pet) => (
							<div
								key={pet.id}
								className={`rounded-xl border-2 shadow p-3 sm:p-4 flex flex-col items-center text-center text-sm sm:text-base ${
									rented === pet.id
										? "bg-blue-50 border-blue-400"
										: "bg-white border-blue-100"
								}`}
							>
								<div className="text-2xl sm:text-3xl mb-1 sm:mb-2">
									🐾
								</div>
								<div className="font-bold text-base sm:text-lg mb-1 text-blue-700">
									{pet.name}
								</div>
								<div className="text-xs sm:text-sm text-blue-400 mb-1 sm:mb-2">
									โบนัส +{pet.bonus * 100}%
								</div>
								<div className="text-xs sm:text-sm text-blue-400 mb-1 sm:mb-2">
									{pet.type} {pet.price} เครดิต
								</div>
								<button
									onClick={() => handleRent(pet.id)}
									disabled={rented === pet.id}
									className={`mt-2 px-4 py-2 rounded-lg font-bold transition text-xs sm:text-base shadow ${
										rented === pet.id
											? "bg-blue-500 text-white"
											: "bg-blue-600 hover:bg-blue-700 text-white"
									}`}
								>
									{rented === pet.id ? "เช่าแล้ว" : "เช่า"}
								</button>
							</div>
						))}
					</div>
					{message && (
						<div className="text-center text-blue-600 font-medium mt-4 sm:mt-6 text-sm sm:text-base">
							{message}
						</div>
					)}
				</div>
			</div>
			<style jsx global>{`
				body {
					background: #f4f8fb;
					font-family: "Prompt", "Kanit", "Inter", sans-serif;
				}
				.hacker-bg {
					background: linear-gradient(
						135deg,
						#e0e7ef 60%,
						#c7d2fe 100%
					);
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
					.max-w-2xl {
						max-width: 100% !important;
					}
				}
			`}</style>
		</>
	);
}
