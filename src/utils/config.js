let token = localStorage.getItem("token");

export const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const URL =   "https://cloudweb0.herokuapp.com/";
