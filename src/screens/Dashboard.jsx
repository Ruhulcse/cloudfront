import React, { useState } from 'react';


function Dashboard() {

    let data = JSON.parse(localStorage.getItem('user'))
    let userType = data.role;
    let userName = data.name;
    console.log(userType)

    const  logoutHandler =() => {
        console.log("clicked")
        localStorage.clear();
        window.location.href = '/';
    }
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
                         <li className="nav-item">
                           <a className="nav-link" href="!#">Add User</a>
                        </li>
                   )}
                   {(userType === 'admin')&&(
                       <li className="nav-item">
                       <a className="nav-link" href="!#">Show User</a>
                   </li>
               
                   )}
                </ul>
                <ul className="navbar-nav">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="!#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {userName}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="!#">Profile</a>
                    <button className="dropdown-item" onClick={logoutHandler}>Log out</button>
                    </div>
                </li>
                </ul>
            </div>
        </nav>
    </div>
    );
}

export default Dashboard
