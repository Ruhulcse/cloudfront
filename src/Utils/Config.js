let token = localStorage.getItem("token");

export const config = {
  headers: { Authorization: `Bearer ${token}` },
};
export const URL = "http://localhost:5000/";
