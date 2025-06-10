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
					<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border-2 border-blue-400/40 text-blue-700 animate-fade-in mb-4 sm:mb-6 text-center">
						<h2 className="text-2xl sm:text-3xl font-black text-blue-600 mb-1 tracking-widest flex items-center justify-center gap-2">
							<span className="inline-block w-7 h-7 align-middle">
								{/* โลโก้ฉลาม SVG ขนาดเล็ก */}
								<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="16" ry="16" fill="#3B82F6"/><path d="M8 20C10 15 22 15 24 20C20 18 12 18 8 20Z" fill="#fff"/><path d="M12 16C13 13 19 13 20 16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><circle cx="20.5" cy="17.5" r="1" fill="#3B82F6"/></svg>
							</span>
							RMT Feed
						</h2>
						<p className="text-blue-400 text-sm sm:text-base">แชร์โพสต์ พูดคุยสายแฮกเกอร์</p>
					</div>
					{/* Create Post */}
					<form onSubmit={handleCreatePost} className="bg-blue-50 rounded-xl shadow p-3 sm:p-4 mb-4 sm:mb-6 flex flex-col gap-2 sm:gap-3 border border-blue-200">
						<textarea
							className="w-full border-2 border-blue-200 rounded-lg p-2 text-sm sm:text-base focus:outline-none focus:border-blue-400 transition"
							placeholder="คุณกำลังคิดอะไรอยู่?"
							value={newPost.content}
							onChange={e => setNewPost(p => ({ ...p, content: e.target.value }))}
							rows={2}
							required
						/>
						<input
							type="url"
							className="w-full border-2 border-blue-200 rounded-lg p-2 text-sm sm:text-base focus:outline-none focus:border-blue-400 transition"
							placeholder="แนบลิงก์รูปภาพ (ถ้ามี)"
							value={newPost.image}
							onChange={e => setNewPost(p => ({ ...p, image: e.target.value }))}
						/>
						<button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg py-2 text-base shadow transition" type="submit">
							โพสต์
						</button>
					</form>

					{/* Feed */}
					<div className="space-y-4 sm:space-y-6">
						{posts.map(post => (
							<div key={post.id} className="bg-white rounded-xl shadow-lg p-4 border border-blue-100">
								<div className="flex items-center gap-3 mb-2">
									<img src={post.user.avatar} alt="avatar" className="w-10 h-10 rounded-full border-2 border-blue-200" />
									<div>
										<div className="font-bold text-base text-blue-700">{post.user.username}</div>
										<div className="text-xs text-gray-400">{new Date(post.created_at).toLocaleString()}</div>
									</div>
								</div>
								<div className="mb-2 whitespace-pre-line text-base text-gray-700">{post.content}</div>
								{post.image && <img src={post.image} alt="post" className="rounded-lg mb-2 max-h-60 object-cover w-full border border-blue-100" />}
								<div className="flex gap-4 items-center mb-2">
									<button className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold px-3 py-1 rounded-lg transition shadow-sm" onClick={() => handleLike(post.id)}>
										👍 <span>{post.likes}</span>
									</button>
									<button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold px-3 py-1 rounded-lg transition shadow-sm" onClick={() => handleDislike(post.id)}>
										👎 <span>{post.dislikes}</span>
									</button>
								</div>
								{/* Comments */}
								<div className="mt-2">
									<div className="font-semibold text-xs sm:text-sm mb-1 text-blue-500">ความคิดเห็น</div>
									<ul className="space-y-1">
										{post.comments.map((c: any) => (
											<li key={c.id} className="text-xs sm:text-sm text-gray-700"><b className="text-blue-600">{c.user.username}:</b> {c.text}</li>
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
        body { background: #f4f8fb; font-family: 'Prompt', 'Kanit', 'Inter', sans-serif; }
        .hacker-bg {
          background: linear-gradient(135deg, #e0e7ef 60%, #c7d2fe 100%);
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
				className="flex-1 border-2 border-blue-200 rounded-lg px-2 py-1 focus:outline-none focus:border-blue-400 transition text-sm"
				placeholder="แสดงความคิดเห็น..."
				value={text}
				onChange={e => setText(e.target.value)}
			/>
			<button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-1 text-sm font-semibold shadow transition" type="submit">ส่ง</button>
		</form>
	);
}
