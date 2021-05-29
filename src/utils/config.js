let token = localStorage.getItem('token');

export const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const URL = 'https://cloud1234567.herokuapp.com/';
