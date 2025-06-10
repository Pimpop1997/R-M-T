
```typescript
import React, { useState } from "react";

export default function BorrowCreditForm() {
  const [amount, setAmount] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Perform borrowing action here
    alert(`Requested to borrow ${amount} credits`);
    setAmount("");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mt-4">
      <h3 className="font-bold mb-2">ขอยืมเครดิต</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          className="w-full border rounded p-2 mb-2"
          placeholder="จำนวนเครดิตที่ต้องการยืม"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          ขอยืม
        </button>
      </form>
    </div>
  );
}
```
