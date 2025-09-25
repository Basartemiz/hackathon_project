import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  withCredentials: true, // needed for cookies (sessions or refresh token)
});

// — If you use JWT access tokens, store it in memory (NOT localStorage if you can avoid it)
let accessToken = null;
export const setAccessToken = (t) => { accessToken = t; };
export const clearAccessToken = () => { accessToken = null; };

// Attach Authorization if we have an access token (JWT setups)
api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  // If your backend needs CSRF for cookie sessions, also set:
  // config.headers["X-CSRF-Token"] = getCsrfTokenFromCookieOrMeta();
  return config;
});

// On 401, try refresh once (JWT flow). For session cookie, you can skip this.
let refreshing = null;
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retried) {
      original._retried = true;
      try {
        if (!refreshing) {
          refreshing = axios.post(
            `${api.defaults.baseURL}/auth/refresh`,
            {},
            { withCredentials: true }
          );
        }
        const { data } = await refreshing; // e.g., { access_token: "..." }
        refreshing = null;
        if (data?.access_token) setAccessToken(data.access_token);
        return api(original);
      } catch (e) {
        refreshing = null;
      }
    }
    return Promise.reject(error);
  }
);

export default api;