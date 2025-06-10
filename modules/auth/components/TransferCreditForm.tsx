// modules/credit/components/TransferCreditForm.tsx
import React from "react";

export default function TransferCreditForm() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="font-bold mb-2">โอนเครดิต</h3>
      <input className="w-full border rounded p-2 mb-2" placeholder="อีเมลผู้รับ" />
      <input className="w-full border rounded p-2 mb-2" placeholder="จำนวนเครดิต" type="number" />
      <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">โอน</button>
    </div>
  );
}
