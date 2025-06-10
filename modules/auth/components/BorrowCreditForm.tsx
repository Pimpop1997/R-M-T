// modules/credit/components/BorrowCreditForm.tsx
export function BorrowCreditForm() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-4">
      <h3 className="font-bold mb-2">ขอยืมเครดิต</h3>
      <input className="w-full border rounded p-2 mb-2" placeholder="จำนวนเครดิตที่ต้องการยืม" type="number" />
      <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">ขอยืม</button>
    </div>
  );
}
