import api, { setAccessToken, clearAccessToken } from "./axiosClient";

export const getMe = async () => {
  // Works for both: session cookies (server reads cookie) or JWT (we attach token)
  const { data } = await api.get("/me");
  return data; // { id, email, name, ... }
};

export const login = async (payload) => {
  // SESSION: server sets HttpOnly cookie here and returns user or minimal info.
  // JWT: server can also return { access_token }.
  const { data } = await api.post("/auth/login", payload);
  if (data?.access_token) setAccessToken(data.access_token);
  return data;
};

export const logout = async () => {
  try { await api.post("/auth/logout"); } catch {}
  clearAccessToken();
};

export const register = async (payload) => {
  const { data } = await api.post("/auth/register", payload);
  if (data?.access_token) setAccessToken(data.access_token);
  return data;
};