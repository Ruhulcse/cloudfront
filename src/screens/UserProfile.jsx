import React, { useState, useEffect } from "react";
import axios from "axios";
import {URL,config} from "../utils/config"
import { Link } from "react-router-dom";
import userProfile from "../assets/images/user.png"
import CircularProgress from '@material-ui/core/CircularProgress'
import Dashboard from "./Dashboard";

function UserProfile({ history }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
      console.log("ok");
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const userData = JSON.parse(localStorage.getItem("user"));

  const name = userData.name;

  const submitHandler = async (e) => {
    e.preventDefault();
    user.password = password;
    console.log("onsubmit");
    try {
      const { data } = await axios.put(`${URL}api/v1/users/profile`, user, config);
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
         window.location.href = "/dashboard";
      }
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
              <Dashboard/>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content pt-5">
          <div className="container-fluid">
            {loading ? (
              <CircularProgress/>
            ) : (
              <div className="row">
                <div className="col-md-3">
                  {/* Profile Image */}
                  <div className="card card-primary card-outline">
                    <div className="card-body box-profile">
                      <div className="text-center">
                        <img
                          className="profile-user-img img-fluid img-circle"
                          src={userProfile}
                          alt="User profile"
                        />
                      </div>
                      <h3 className="profile-username text-center">{name}</h3>
                      <p className="text-muted text-center">{user.role}</p>
                      {/* <ul className="list-group list-group-unbordered mb-3">
                      <li className="list-group-item">
                        <b>Forms</b> <a className="float-right">1,322</a>
                      </li>
                    </ul> */}
                    </div>
                    {/* /.card-body */}
                  </div>
                </div>
                {/* /.col */}
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header p-2">
                      <ul className="nav">
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#settings"
                            data-toggle="tab"
                          >
                            User Info
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                      <div className="tab-content">
                        <div className="active tab-pane" id="settings">
                          <form
                            className="form-horizontal"
                            onSubmit={submitHandler}
                          >
                            <div className="form-group row">
                              <label
                                htmlFor="inputName"
                                className="col-sm-2 col-form-label"
                              >
                                Name
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputName"
                                  placeholder="Name"
                                  value={user.name}
                                  onChange={(e) =>
                                    setUser({ ...user, name: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label
                                htmlFor="inputEmail"
                                className="col-sm-2 col-form-label"
                              >
                                Email
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="email"
                                  className="form-control"
                                  id="inputEmail"
                                  placeholder="Email"
                                  value={user.email}
                                  onChange={(e) =>
                                    setUser({ ...user, email: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label
                                htmlFor="inputName2"
                                className="col-sm-2 col-form-label"
                              >
                                Password
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="password"
                                  className="form-control"
                                  id="inputPassword"
                                  placeholder="Change password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label
                                htmlFor="inputRole"
                                className="col-sm-2 col-form-label"
                              >
                                Role
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputRole"
                                  placeholder="Role"
                                  value={user.role}
                                  disabled
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <div className="offset-sm-2 col-sm-8">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                        {/* /.tab-pane */}
                      </div>
                      {/* /.tab-content */}
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.nav-tabs-custom */}
                </div>
                {/* /.col */}
              </div>
            )}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
    </>
  );
}
export default UserProfile