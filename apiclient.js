const API_BASE = import.meta.env.VITE_API_BASE || "https://localhost:5001";
const RES_API_BASE = import.meta.env.VITE_RES_API_BASE || "https://localhost:5001";

export async function login({ userName, password }) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  return { token: data.token, ...data };
}

export async function fetchRecipes(auth) {
  const res = await fetch(`${RES_API_BASE}/api/recipes`, {
    headers: { Authorization: `Bearer ${auth.token}` },
  });
  if (!res.ok) throw new Error("Failed to load recipes");
  return res.json();
}

export async function logout(/* auth */) {
  // optional: call server to invalidate token
  return Promise.resolve();
}