// src/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export async function askUssraty(question) {
  const res = await fetch(`${API_BASE_URL}/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Request failed");
  }

  return res.json(); // will be the AgentResponse
}