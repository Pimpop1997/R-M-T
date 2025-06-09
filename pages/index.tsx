import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div style={{ padding: 24 }}>
        <h1>Welcome to My Social App!</h1>
        <p>This is a modular social platform powered by Next.js + Supabase.</p>
      </div>
    </>
  );
}
