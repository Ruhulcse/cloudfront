import React, { useState } from 'react';
import Logo from "../assets/images/logo.jpg";

function Dashboard() {
    
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  
    return (
        <div  class="container-fluid">
        <nav class="navbar navbar-expand-md navbar-light bg-light">
            <a class="navbar-brand" href="#">Data Workspace</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#!">Add Data<span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="!#">Show Data</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="!#">Add User</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="!#">Show User</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="!#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    User
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="!#">Profile</a>
                    <a class="dropdown-item" href="!#">Log out</a>
                    </div>
                </li>
                </ul>
            </div>
        </nav>
    </div>
    );
}

export default Dashboard
