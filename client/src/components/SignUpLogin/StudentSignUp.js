import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMyContext } from "../MyContext";
import {PiStudentBold} from 'react-icons/pi'
import {BsFillPersonFill} from 'react-icons/bs'
import {HiOutlineMail} from "react-icons/hi";
import {RiLockPasswordLine} from "react-icons/ri"
function StudentSignUp() {
  const [Location, setLocation] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { userType, setUserType } = useMyContext();

  useEffect(() => {
    setLocation(location.pathname);
  }, [location.pathname]);

  const notifySuccess = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = (errorMessage) =>
    toast.warn(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    currentYear: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onhandleclick = async (e) => {
    e.preventDefault();

    if (location.pathname === "/student/login") {
      const url = "http://localhost:4000/student/login";
      const data = {
        Email: formData.email,
        Password: formData.password,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      // console.log(data);

      try {
        const response = await fetch(url, requestOptions);
        const responseData = await response.json();
        if (!response.ok) {
          if (responseData.error) {
            notifyError(responseData.error);
          } else {
            notifyError("An error occurred while logging in.");
          }
        } else {
          
          localStorage.setItem("UserEmail", responseData.user.Email);
          setFormData({
            /* name: "", */
            email: "",
            password: "",
            // currentYear: "",
          });
          notifySuccess("Login successful!");
          setUserType('student');
          navigate("/dashboard",{ state: { UserType: 'student' } });
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        notifyError("An error occurred while logging in.");
      }
    }
    if (location.pathname === "/student/signup") {
      const url = "http://localhost:4000/student/signup";
      const data = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        currentYear: formData.currentYear,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      try {
        const response = await fetch(url, requestOptions);
        const responseData = await response.json();

        if (!response.ok) {
          if (responseData.error) {
            if (
              responseData.error ===
              "Email address is already in use. Try to login"
            ) {
              notifyError(responseData.error);
            }
            notifyError(responseData.error);
          } else {
            notifyError("An error occurred while signing up.");
          }
        } else {
          console.log(responseData.Email);
          localStorage.setItem("UserEmail", responseData.Email);
          setFormData({
            name: "",
            email: "",
            password: "",
            currentYear: "",
          });
          notifySuccess("Sign up successful!");
          setUserType('student')
          navigate("/dashboard",{ state: { UserType: 'student' } });
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        notifyError("An error occurred while signing up.");
      }
    }
  };

  return (
    <>
      <div className="StudentSignUp">
        <h2>
          For <span style={{ color: "#424874" }}>Students's</span>
        </h2>
        <p>
          access to mentorship, networking, and career guidance from experienced
          alumni
        </p>
        <form>
          <div className="buttons">
            <button
              type="button"
              onClick={() => {
                navigate("/student/signup");
              }}
              className="btn1"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/student/login");
              }}
              className="btn2"
            >
              Login
            </button>
          </div>
          {Location === "/student/login" ? (
            <>
             <div className="email">
              <HiOutlineMail className="icons"/>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              </div>
              <div className="password">
                <RiLockPasswordLine className="icons"/>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              </div>
            </>
          ) : (
            <>
              <div className="name">
                <BsFillPersonFill className="icons"/>
                <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              </div>
              <div className="email">
              <HiOutlineMail className="icons"/>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              </div>
              <div className="password">
                <RiLockPasswordLine className="icons"/>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              </div>
              <div className="currentYear">
                <PiStudentBold className="icons"/>
                <input
                type="text"
                name="currentYear"
                placeholder="Current Year"
                value={formData.graduationYear}
                onChange={handleChange}
              />
              </div>
            </>
          )}
          <button onClick={onhandleclick} className="btn" type="submit">
            {Location === "/student/login" ? "Login" : "signup"}
          </button>
        </form>
      </div>
      <div className="modal-backdrop"></div>
    </>
  );
}

export default StudentSignUp;
