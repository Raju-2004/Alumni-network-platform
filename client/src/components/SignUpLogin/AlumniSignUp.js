import React, { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMyContext } from "../MyContext";
import {HiOutlineMail} from "react-icons/hi";
import {RiLockPasswordLine,RiFileUploadLine,RiGraduationCapLine,RiLinkedinBoxFill} from "react-icons/ri"
import {GrUserManager,GrUserExpert,GrAchievement} from 'react-icons/gr'
import {BsFillPersonFill} from 'react-icons/bs'

function AlumniSignUp() {
  // const [isLoginForm, setIsLoginForm] = useState(false);
  const [Location, setLocation] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { userType, setUserType } = useMyContext();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  // const [Location,setLocation] = useState()
  /* const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
    }; */
  useEffect(() => {
    setLocation(location.pathname);
  }, [location.pathname]);

  const notifySuccess = (message) =>
    toast.success(message, {
      // Toast configuration for success
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
      // Toast configuration for errors
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
    graduationYear: "",
    currentJobRole: "",
    expertise: "",
    linkedinProfile: "",
    achievements: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onhandleclick = async (e) => {
    e.preventDefault();
    if (location.pathname === "/alumni/login") {
      const url = "http://localhost:4000/alumni/login";
      const data = {
        Email: formData.email,
        Password: formData.password,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header
        },
        body: JSON.stringify(data), // Serialize the data as JSON
      };

      console.log(data);

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
          console.log(responseData.user.Email);
          localStorage.setItem("UserEmail", responseData.user.Email);
          notifySuccess("Login successful!");
          setUserType('alumni');
          setFormData({
            name: "",
            email: "",
            password: "",
            graduationYear: "",
            currentJobRole: "",
            expertise: "",
            linkedinProfile: "",
            achievements: "",
          });
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        notifyError("An error occurred while logging in.");
      }
    }
    if (location.pathname === "/alumni/signup") {
      const url = "http://localhost:4000/alumni/signup";
      const data = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        graduationYear: formData.graduationYear,
        currentJobRole: formData.currentJobRole,
        expertise: formData.expertise,
        linkedinProfile: formData.linkedinProfile,
        achievements: formData.achievements,
      };
      const formDataWithFile = new FormData();
      formDataWithFile.append("file", selectedFile);

      for (const key in data) {
        formDataWithFile.append(key, data[key]);
      }

      const requestOptions = {
        method: "POST",
        body: formDataWithFile,
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
          setUserType('alumni')
          localStorage.setItem("UserEmail", responseData.Email);
          setFormData({
            name: "",
            email: "",
            password: "",
            graduationYear: "",
            currentJobRole: "",
            expertise: "",
            linkedinProfile: "",
            achievements: "",
          });
          navigate("/dashboard");
          
          notifySuccess("Sign up successful!");
          
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        notifyError("An error occurred while signing up.");
      }
    }
  };

  return (
    <>
      <div className="AlumniSignUp">
        <h2>
          For <span style={{ color: "#424874" }}>Alumni's</span>
        </h2>
        <p>connect, network, mentor, and access exclusive job opportunities</p>
        <form>
        <div className="buttons">
            <button
              type="button"
              onClick={() => {
                navigate("/alumni/signup");
              }}
              className="btn1"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/alumni/login");
              }}
              className="btn2"
            >
              Login
            </button>
          </div>
          {Location === "/alumni/login" ? (
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
              <div className="file">
                <RiFileUploadLine className="icons"/>
                <input
                type="file"
                id="file"
                name="uploadedFile"
                accept="image/jpeg, image/jpg, image/png, image/bmp"
                onChange={handleFileChange}
              />
              </div>
              <div className="graduation">
                <RiGraduationCapLine className="icons"/>
                <input
                type="text"
                name="graduationYear"
                placeholder="Graduation Year"
                value={formData.graduationYear}
                onChange={handleChange}
              />
              </div>
              <div className="currentJob">
                <GrUserManager className="icons"/>
                <input
                type="text"
                name="currentJobRole"
                placeholder="Current Job Role"
                value={formData.currentJobRole}
                onChange={handleChange}
              />
              </div>
              <div className="expertise">
                <GrUserExpert className="icons"/>
                <input
                type="text"
                name="expertise"
                placeholder="Areas of Expertise"
                value={formData.expertise}
                onChange={handleChange}
              />
              </div>
              <div className="linkedin">
                <RiLinkedinBoxFill className="icons"/>
                <input
                type="text"
                name="linkedinProfile"
                placeholder="LinkedIn Profile"
                value={formData.linkedinProfile}
                onChange={handleChange}
              />
              </div>
              <div className="achievements">
                <GrAchievement className="icons"/>
                <input
                name="achievements"
                placeholder="Achievements"
                value={formData.achievements}
                onChange={handleChange}
              />
              </div>
            </>
          )}
          <button onClick={onhandleclick} className="btn" type="submit">
            {Location === "/alumni/login" ? "Login" : "signup"}
          </button>
        </form>
      </div>
      <div className="modal-backdrop"></div>
    </>
  );
}

export default AlumniSignUp;
