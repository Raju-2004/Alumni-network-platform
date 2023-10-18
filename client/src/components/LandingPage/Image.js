import React from "react";
import anp from "../../Assets/18432.jpg";
import Achievements from "./Achievements";
import { Link ,useNavigate,useLocation} from "react-router-dom";
import {toast} from 'react-toastify';
function Image() {

  const location = useLocation();
  const navigate = useNavigate();
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
    <>
    <div className="Image">
      <div className="img">
        <img src={anp} alt="anp" />
      </div>
      <div className="content">
        <div className="title">
          <p>Connect, Grow, and Succeed with our</p>
          <p>comprehensive AlumNexus</p>
        </div>
        <Link className="Links" to="/dashboard">
             connect with alumni
            </Link>
      </div>
    </div>
    <Achievements/>
    </>
  );
}

export default Image;
