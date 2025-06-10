// modules/posts/components/PostCard.tsx
export function PostCard({ post }: { post: { user: string; content: string; time: string } }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-2">
      <div className="font-bold">{post.user}</div>
      <div className="text-sm text-gray-500">{post.time}</div>
      <div className="mt-2">{post.content}</div>
      <div className="flex gap-4 mt-3">
        <button className="text-blue-500 hover:underline">ไลค์</button>
        <button className="text-red-500 hover:underline">ดิสไลค์</button>
        <button className="text-gray-700 hover:underline">คอมเมนต์</button>
      </div>
    </div>
  );
}
