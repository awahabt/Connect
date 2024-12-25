export const backendURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4715";
  
export const APIHeaders = () => {
  const token = JSON.parse(localStorage.getItem("userToken") || "{}");
  return {
    Authorization: "Bearer " + token.accessToken,
    "x-refresh-token": token.refreshToken,
    "Content-Type": "application/json",
  };
};

export const FormDataAPIHeaders = () => {
  const token = JSON.parse(localStorage.getItem("userToken") || "{}");
  return {
    Authorization: "Bearer " + token.accessToken,
    "x-refresh-token": token.refreshToken,
    "Content-Type": "multipart/form-data",
  };
};
