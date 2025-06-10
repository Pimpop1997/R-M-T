// modules/pet/components/PetCard.tsx
export default function PetCard({ pet }: { pet: { name: string; bonus: number; image: string } }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4 mb-2">
      <img src={pet.image} alt={pet.name} className="w-16 h-16 rounded-full object-cover" />
      <div>
        <div className="font-bold">{pet.name}</div>
        <div className="text-green-600 text-sm">โบนัสขุดเครดิต +{pet.bonus}%</div>
      </div>
    </div>
  );
}
