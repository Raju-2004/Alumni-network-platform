import React from "react";
import { Link,useNavigate,useLocation } from "react-router-dom";
import {toast} from 'react-toastify';

function Header() {
  const navigate = useNavigate();
  const onLogoutClick = ()=>{
    localStorage.removeItem('UserEmail');
    toast.success('Log out successful', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate('/');
  }
  const location = useLocation();
  
  const isUserLoggedIn = localStorage.getItem("UserEmail");

  if (!isUserLoggedIn && location.pathname === "/dashboard") {
    navigate('/');
    toast.info(' You must be sign up or log in!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return (
    <div className="Header">
      <div className="logo">
        <h1>AlumNexus</h1>
      </div>
      <div className="list">
        <ul>
          <li>
            <Link className="Links" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="Links" to="/dashboard">
              Alumni Hub
            </Link>
          </li>
          {isUserLoggedIn ? (
            <li>
              <Link onClick={onLogoutClick} className="Links" to="/">
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link className="Links" to="/access-account">
                Sign up
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
