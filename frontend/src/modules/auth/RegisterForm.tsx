import { useState } from "react";

export default function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "สมัครสมาชิกไม่สำเร็จ");
      } else {
        setSuccess(true);
        setUsername(""); setEmail(""); setPassword("");
        if (onSuccess) onSuccess();
      }
    } catch {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center">สมัครสมาชิก</h2>
      <input
        className="w-full px-4 py-2 border rounded-lg"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        className="w-full px-4 py-2 border rounded-lg"
        placeholder="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full px-4 py-2 border rounded-lg"
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {error && <div className="text-red-500 text-center">{error}</div>}
      {success && <div className="text-green-600 text-center">สมัครสมาชิกสำเร็จ!</div>}
      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
        disabled={loading}
      >
        {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
      </button>
    </form>
  );
}
