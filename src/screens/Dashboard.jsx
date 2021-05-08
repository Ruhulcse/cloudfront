import React, { useState } from 'react';


function Dashboard() {

    let data = JSON.parse(localStorage.getItem('user'))
    let userType = data.role;
    console.log(userType)
    return (
        <div  className="container-fluid">
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <a className="navbar-brand" href="#">Data Workspace</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#!">Add Data<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="!#">Show Data</a>
                    </li>
                   {(userType==='admin')&&(
                      <div>
                         <li className="nav-item">
                           <a className="nav-link" href="!#">Add User</a>
                           </li>
                        <li className="nav-item">
                            <a className="nav-link" href="!#">Show User</a>
                        </li>
                      </div>
                   )}
                </ul>
                <ul className="navbar-nav">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="!#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    User
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="!#">Profile</a>
                    <a className="dropdown-item" href="!#">Log out</a>
                    </div>
                </li>
                </ul>
            </div>
        </nav>
    </div>
    );
}

export default Dashboard
