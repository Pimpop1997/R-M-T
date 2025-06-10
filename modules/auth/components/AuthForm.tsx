import React from "react";

export default function AuthForm() {
  return (
    <div className="max-w-xs mx-auto bg-white p-4 rounded-2xl shadow-xl">
      <h2 className="text-xl font-bold mb-2">เข้าสู่ระบบ</h2>
      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="อีเมล"
        type="email"
      />
      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="รหัสผ่าน"
        type="password"
      />
      <button className="w-full bg-blue-500 text-white rounded py-2 hover:bg-blue-600">
        เข้าสู่ระบบ
      </button>
      <p className="mt-3 text-sm text-center">
        ยังไม่มีบัญชี?{" "}
        <a className="text-blue-500 underline" href="/register">
          สมัครสมาชิก
        </a>
      </p>
    </div>
  );
}
