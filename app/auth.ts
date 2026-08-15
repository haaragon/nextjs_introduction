const AUTH_KEY = "isLoggedIn";
export const AUTH_EVENT = "authchange";

export function isLoggedIn() {
  return (
    typeof window !== "undefined" && localStorage.getItem(AUTH_KEY) === "true"
  );
}

export function login() {
  localStorage.setItem(AUTH_KEY, "true");
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}
