import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // โหลดข้อความแชทล่าสุดเมื่อเข้าเพจ
  useEffect(() => {
    fetchMessages();
    // subscribe realtime
    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (payload) => {
        fetchMessages();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });
    if (!error && data) setMessages(data);
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !image) return;
    setLoading(true);
    let imageUrl = null;
    if (image) {
      const fileExt = image.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage.from('chat-images').upload(fileName, image);
      if (!uploadError && uploadData) {
        const { data: publicUrl } = supabase.storage.from('chat-images').getPublicUrl(fileName);
        imageUrl = publicUrl?.publicUrl || null;
      }
    }
    const { error } = await supabase.from('messages').insert({ text: input, sender: "user", image_url: imageUrl });
    setInput("");
    setImage(null);
    setLoading(false);
    if (error) alert("ส่งข้อความไม่สำเร็จ");
  };

  return (
    <>
      <Navbar />
      <div className="hacker-bg min-h-screen flex flex-col items-center justify-center py-4 sm:py-8 px-2 sm:px-0">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-4 sm:p-8 border-2 border-blue-400/40 text-blue-700 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl font-black text-blue-600 mb-2 sm:mb-4 tracking-widest text-center flex items-center justify-center gap-2">
            <span className="inline-block w-7 h-7 align-middle">
              {/* โลโก้ฉลาม SVG ขนาดเล็ก */}
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="16" ry="16" fill="#3B82F6"/><path d="M8 20C10 15 22 15 24 20C20 18 12 18 8 20Z" fill="#fff"/><path d="M12 16C13 13 19 13 20 16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><circle cx="20.5" cy="17.5" r="1" fill="#3B82F6"/></svg>
            </span>
            RMT Chat
          </h2>
          <div className="flex-1 overflow-y-auto p-2 sm:p-4">
            <div className="max-w-xl mx-auto space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-3 sm:px-4 py-2 rounded-2xl shadow text-xs sm:text-sm max-w-[80vw] sm:max-w-xs break-words "
                      ${msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-blue-50 text-blue-800 rounded-bl-none border border-blue-200"}
                    `}
                  >
                    {msg.text}
                    {msg.image_url && (
                      <img src={msg.image_url} alt="แนบรูปภาพ" className="mt-2 rounded-lg max-h-32 sm:max-h-48 object-contain w-full border border-blue-100" />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <form
            onSubmit={handleSend}
            className="max-w-xl mx-auto w-full flex flex-col sm:flex-row gap-2 p-2 sm:p-4 bg-blue-50 border-t border-blue-200 rounded-b-2xl"
          >
            <input
              type="text"
              className="flex-1 px-3 sm:px-4 py-2 rounded-full border-2 border-blue-200 focus:outline-none focus:border-blue-400 transition text-xs sm:text-base bg-white"
              placeholder="พิมพ์ข้อความ..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={e => setImage(e.target.files?.[0] || null)}
              />
              <button
                type="button"
                className="px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded-full text-blue-600 text-base border border-blue-200 transition"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                title="แนบรูปภาพ"
              >
                📎
              </button>
              <button
                type="submit"
                className="px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-md transition disabled:opacity-60 text-xs sm:text-base"
                disabled={loading || (!input.trim() && !image)}
              >
                {loading ? "..." : "ส่ง"}
              </button>
            </div>
          </form>
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
