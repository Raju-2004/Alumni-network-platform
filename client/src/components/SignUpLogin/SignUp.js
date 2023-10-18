import React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [showAlumniSignup, setShowAlumniSignup] = useState(false);
  const [showStudentSignup, setShowStudentSignup] = useState(false);

  const toggleAlumniSignup = () => {
    setShowAlumniSignup(!showAlumniSignup);
  };

  const toggleStudentSignup = () => {
    setShowStudentSignup(!showStudentSignup);
  };

  return (
    <>
      <div className="Signup-container">
        <div className="alumni-section">
          <h2>
            For <span style={{ color: "#424874" }}>Alumni's</span>
          </h2>
          <p>
            connect, network, mentor, and access exclusive job opportunities
          </p>
          <Link to="/alumni/signup"><button>Sign Up</button></Link>
        </div>
        <div className="student-section">
          <h2>
            For <span style={{ color: "#424874" }}>Student's</span>
          </h2>
          <p>
            access to mentorship, networking, and career guidance from
            experienced alumni
          </p>
          <Link to="/student/signup"><button>Sign Up</button></Link>
        </div>
      </div>
      {/* <AlumniSignUp /> */}
    </>
  );
}

export default SignUp;
