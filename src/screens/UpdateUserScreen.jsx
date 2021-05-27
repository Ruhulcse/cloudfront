import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress'
import { Link } from 'react-router-dom';
import { config, URL } from '../utils/config';
import Dashboard from './Dashboard';

function UpdateUserScreen({ location, history }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [bkash, setBkash] = useState("");
  const [amount, setAmount] = useState("0");
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  let id = searchParams.get('id');

  useEffect(() => {
     try {
       async function fetchData(){
         setIsloading(true);
         let {data} = await axios.get(`${URL}api/v1/users/profile/${id}`,config);
         console.log(data);
         setEmail(data.email);
         setRole(data.role);
         setBkash(data.bkash);
         setAmount(data.amount);
         setName(data.name);
         setIsloading(false);
       }
       fetchData();
     } catch (error) {
       console.log(error)
     }
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
       name,
       email,
       role,
       bkash,
       amount
     };

    try {
      const { data } = await axios.put(
        `${URL}api/v1/users/profile/${id}`,
        userData,
        config
      );
      console.log(data);
      if (data) {
        history.push('/showuser/');
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
   <>
     <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            {/* <div className="row mb-2 pt-5">
              <div className="col-sm-6">
                <Link to="/dashboard" className="btn btn-primary mb-2">
                  Go Back
                </Link>
              </div>
            </div> */}
            <Dashboard/>
          </div>
          {/* /.container-fluid */}
        </section>

        {/* Main content */}
        <section className="content pt-5">
          <div className="container-fluid">
            <div className="row d-flex justify-content-center">
              {/* left column */}
              <div className="col-md-6">
                {/* general form elements */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">{isLoading?(<CircularProgress/>):(<p>Update {name}'s Profile</p>)}</h3>
                  </div>
                  {/* {error && <Message>{error}</Message>} */}
                  {/* /.card-header */}
                  {/* form start */}
                  <form onSubmit={submitHandler}>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="Name">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Enter name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="Email">Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="Role">Role</label>
                        <select
                          className="form-control select2"
                          style={{ width: "100%" }}
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option selected="selected" value="admin">
                            Admin
                          </option>
                          <option value="general">General</option>
                          <option value="restricted">Restricted</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="Email">Bkash Number(optional)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="01xxxxxxxxx"
                          value={bkash}
                          onChange={(e) => setBkash(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="Password">Amount (optional)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="password"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                {/* /.card */}
              </div>
            </div>
          </div>
        </section>
      </div>
   </>
  );
}

export default UpdateUserScreen;
