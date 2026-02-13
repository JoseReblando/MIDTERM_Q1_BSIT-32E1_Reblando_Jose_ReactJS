import { useState } from "react";

export default function Login({ onLoggedIn }) {
  const [userName, setUserName] = useState(import.meta.env.VITE_DEFAULT_EMAIL || "");
  const [password, setPassword] = useState(import.meta.env.VITE_DEFAULT_PASSWORD || "");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await onLoggedIn({ userName, password });
    } catch (ex) {
      setErr(ex.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <h1>Auth Demo - Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
        {err && <p style={{ color: "red" }}>{err}</p>}
      </form>
    </div>
  );
}