// modules/posts/components/CreatePostForm.tsx
import React from "react";

export default function CreatePostForm() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mb-4">
      <textarea
        className="w-full border rounded p-2"
        placeholder="เขียนโพสต์ของคุณที่นี่..."
      />
      <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        โพสต์
      </button>
    </div>
  );
}
