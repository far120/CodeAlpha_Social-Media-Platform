export const useAuthToken = () => {
  const token =
    localStorage.getItem("token") || localStorage.getItem("accessToken");
  return { token };
};

export const useAuthLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};
