import React, { useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress'
import Dashboard from "./Dashboard"
import {URL,config} from "../utils/config"
import axios from 'axios';

function Adduser({history}) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("admin");
    const [password, setPassword] = useState("");
    const [bkash, setBkash] = useState("");
    const [amount, setAmount] = useState("0");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const submitHandler = async (e) => {
        e.preventDefault();
        const user = { name, email, role, password ,bkash, amount};
        console.log(user);
        try {
          setLoading(true);
          const { data } = await axios.post(`${URL}api/v1/users/`, user, config);
          if (data) {
            setLoading(false);
            history.push("/showuser");
          }
        } catch (error) {
          setError(error.response.data.message);
        }
      };

    return (
        <div>
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
                    <h3 className="card-title">{loading?(<CircularProgress/>):(<p>Add a new user</p>)}</h3>
                  </div>
                  {error && <p>{error}</p>}
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
                        <label htmlFor="Password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
        </div>
    )
}

export default Adduser
