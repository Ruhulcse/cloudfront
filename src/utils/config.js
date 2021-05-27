let token = localStorage.getItem('token');

export const config = {
  headers: { Authorization: `Bearer ${token}` },
};
<<<<<<< HEAD
export const URL = "http://localhost:5000/";
//"https://cloudbaseddataentry.herokuapp.com/";
=======
export const URL = 'http://localhost:5000/';
>>>>>>> e9d0b82b2f4345afe7b8cdef4796ee30782f9f6c
