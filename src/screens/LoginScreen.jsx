import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { URL } from '../utils/config';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errormsg, setErrormsg] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const loginData = {};
    loginData.email = email;
    loginData.password = password;

    try {
      setLoading(true);
      const { data } = await axios.post(`${URL}api/v1/users/login`, loginData);
      if (data) {
        setLoading(true);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setLoading(false);
      setErrormsg(error.response.data);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      window.location.href = '/dashboard';
    }
  }, []);

  return (
    <>
      <div className="login-form">
        <form onSubmit={submitHandler}>
          <h2 className="text-center">Data Workspace</h2>

          <h5 className="d-flex justify-content-center">
            {loading ? <CircularProgress /> : <p>Sign in to your account</p>}
          </h5>
          {errormsg && (
            <p
              style={{ color: 'red' }}
              className="d-flex justify-content-center"
            >
              {errormsg}
            </p>
          )}
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Email Address"
              autoComplete="email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              Log in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
