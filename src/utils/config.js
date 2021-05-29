let token = localStorage.getItem("token");

export const config = {
  headers: { Authorization: `Bearer ${token}` },
};
export const URL = "https://cloud7862.herokuapp.com/";
