import React, { useState } from "react";
import { Link } from "react-router-dom";
function Adduser({history}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("admin");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const user = { name, email, role, password };
        try {
        //   const { data } = await axios.post("/api/users", user, config);
        //   if (data) {
        //     history.push("/users");
        //   }
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
            <div className="row mb-2">
              <div className="col-sm-6">
                <h3>Add New User</h3>
                <Link to="/dashboard" className="btn btn-primary mb-2">
                  Go Back
                </Link>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Add New User</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row d-flex justify-content-center">
              {/* left column */}
              <div className="col-md-6">
                {/* general form elements */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">User Details</h3>
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
                          <option value="broker">Broker</option>
                          <option value="medical">Medical</option>
                          <option value="spectator">Spectator</option>
                          <option value="general">General</option>
                        </select>
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
