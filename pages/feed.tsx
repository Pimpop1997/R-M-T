import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useAuthStore } from "../contexts/AuthContext";

// เชื่อมต่อ feed กับ API จริง: ดึงโพสต์, โพสต์ใหม่, handle error, ใช้ token จริง

export default function FeedPage() {
	const { user } = useAuthStore();
	const [posts, setPosts] = useState<any[]>([]);
	const [newPost, setNewPost] = useState({ content: "", image: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// ดึงโพสต์จาก API จริง
	const fetchPosts = async () => {
		setLoading(true);
		setError("");
		try {
			const token = localStorage.getItem("token");
			const res = await fetch("/api/feed", {
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "โหลดโพสต์ไม่สำเร็จ");
			setPosts(data.posts || []);
		} catch (e: any) {
			setError(e.message || "เกิดข้อผิดพลาด");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => { fetchPosts(); }, []);

	const handleLike = async (id: string | number) => {
		try {
			const response = await fetch(`/api/posts/${id}/like`, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json"
				}
			});
			if (!response.ok) throw new Error("Network response was not ok");
			fetchPosts();
		} catch (error) {
			console.error("Error liking post:", error);
		}
	};

	const handleDislike = async (id: string | number) => {
		try {
			const response = await fetch(`/api/posts/${id}/dislike`, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json"
				}
			});
			if (!response.ok) throw new Error("Network response was not ok");
			fetchPosts();
		} catch (error) {
			console.error("Error disliking post:", error);
		}
	};

	const handleComment = async (id: string | number, text: string) => {
		try {
			const response = await fetch(`/api/posts/${id}/comment`, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ text })
			});
			if (!response.ok) throw new Error("Network response was not ok");
			fetchPosts();
		} catch (error) {
			console.error("Error commenting on post:", error);
		}
	};

	const handleCreatePost = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newPost.content.trim()) return;
		try {
			const response = await fetch("/api/posts", {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify(newPost)
			});
			if (!response.ok) throw new Error("Network response was not ok");
			setNewPost({ content: "", image: "" });
			fetchPosts();
		} catch (error) {
			console.error("Error creating post:", error);
		}
	};

	return (
		<>
			<Navbar />
			<div className="hacker-bg min-h-screen py-4 sm:py-8 px-2 sm:px-0">
				<div className="max-w-xl w-full mx-auto">
					<div className="bg-[#181c1f] rounded-2xl shadow-2xl p-4 sm:p-6 border border-green-400/30 text-green-300 animate-fade-in mb-4 sm:mb-6 text-center">
						<h2 className="text-xl sm:text-2xl font-black text-green-400 mb-1 tracking-widest">RMT Feed</h2>
						<p className="text-green-200 text-sm sm:text-base">แชร์โพสต์ พูดคุยสายแฮกเกอร์</p>
					</div>
					{/* Create Post */}
					<form onSubmit={handleCreatePost} className="bg-white rounded-xl shadow p-3 sm:p-4 mb-4 sm:mb-6 flex flex-col gap-2 sm:gap-3">
						<textarea
							className="w-full border rounded-lg p-2 text-sm sm:text-base"
							placeholder="คุณกำลังคิดอะไรอยู่?"
							value={newPost.content}
							onChange={e => setNewPost(p => ({ ...p, content: e.target.value }))}
							rows={2}
							required
						/>
						<input
							type="url"
							className="w-full border rounded-lg p-2 text-sm sm:text-base"
							placeholder="แนบลิงก์รูปภาพ (ถ้ามี)"
							value={newPost.image}
							onChange={e => setNewPost(p => ({ ...p, image: e.target.value }))}
						/>
						<button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg py-2 text-sm sm:text-base" type="submit">
							โพสต์
						</button>
					</form>

					{/* Feed */}
					<div className="space-y-4 sm:space-y-6">
						{posts.map(post => (
							<div key={post.id} className="bg-white rounded-xl shadow p-3 sm:p-4">
								<div className="flex items-center gap-2 sm:gap-3 mb-2">
									<img src={post.user.avatar} alt="avatar" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
									<div>
										<div className="font-bold text-sm sm:text-base">{post.user.username}</div>
										<div className="text-xs text-gray-400">{new Date(post.created_at).toLocaleString()}</div>
									</div>
								</div>
								<div className="mb-2 whitespace-pre-line text-sm sm:text-base">{post.content}</div>
								{post.image && <img src={post.image} alt="post" className="rounded-lg mb-2 max-h-40 sm:max-h-60 object-cover w-full" />}
								<div className="flex gap-3 sm:gap-4 items-center mb-2">
									<button className="text-indigo-600 hover:underline text-sm sm:text-base" onClick={() => handleLike(post.id)}>👍 {post.likes}</button>
									<button className="text-gray-500 hover:underline text-sm sm:text-base" onClick={() => handleDislike(post.id)}>👎 {post.dislikes}</button>
								</div>
								{/* Comments */}
								<div className="mt-2">
									<div className="font-semibold text-xs sm:text-sm mb-1">ความคิดเห็น</div>
									<ul className="space-y-1">
										{post.comments.map((c: any) => (
											<li key={c.id} className="text-xs sm:text-sm"><b>{c.user.username}:</b> {c.text}</li>
										))}
									</ul>
									<CommentBox onComment={text => handleComment(post.id, text)} />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<style jsx global>{`
        body { background: #101214; }
        .hacker-bg {
          background: linear-gradient(135deg, #101214 60%, #1a2a1a 100%);
        }
        .animate-fade-in {
          animation: fadeIn 0.7s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        @media (max-width: 640px) {
          .max-w-xl { max-width: 100% !important; }
        }
      `}</style>
		</>
	);
}

function CommentBox({ onComment }: { onComment: (text: string) => void }) {
	const [text, setText] = useState("");
	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				if (!text.trim()) return;
				onComment(text);
				setText("");
			}}
			className="flex gap-2 mt-2"
		>
			<input
				className="flex-1 border rounded-lg px-2 py-1"
				placeholder="แสดงความคิดเห็น..."
				value={text}
				onChange={e => setText(e.target.value)}
			/>
			<button className="bg-gray-200 rounded px-3" type="submit">ส่ง</button>
		</form>
	);
}
