import axios from "axios";

// Prefer an explicit NEXT_PUBLIC_API_BASE_URL when provided (for staging/backend).
// For local Next.js API routes default to relative "/api" so axios will call the app's
// internal handlers (e.g. /api/categories) instead of the separate backend server.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
