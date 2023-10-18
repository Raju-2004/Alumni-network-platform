import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import { useMyContext } from "../../MyContext";
function CreateJob() {

    
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const { userType, setUserType } = useMyContext();
    const [Alumni, setAlumni] = useState({});
  const userEmail = localStorage.getItem("UserEmail");
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


    useEffect(() => {
      if (userType === "alumni") {
        // Fetch alumni data only if userType is "alumni"
        fetch("http://localhost:4000/alumni")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            // console.log("Alumni data:", data); 
    
            // Find the alumni with the matching email
            const alumniMatch = data.find((alumni) => alumni.Email === userEmail);
            // console.log("Alumni match:", alumniMatch); 
    
            if (alumniMatch) {
              setAlumni(alumniMatch);
            }
          })
          .catch((error) => {
            console.error("Error fetching alumni data:", error);
          });
      }
    }, [userType, userEmail]);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    /* companyImage: "", */
    location: "",
    description: "",
    qualifications: "",
    applicationDeadline: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedFile(file);
  };

  const onHandleClick = async (e) => {
    e.preventDefault();
    const url = "http://localhost:4000/dashboard/create/job";
      const data = {
        title: formData.title,
        company: formData.company,
        /* companyImage: "", */
        location:formData.location,
        description:formData.description,
        qualifications: formData.qualifications,
        applicationDeadline:formData.applicationDeadline,
        postedBy : Alumni._id
      };

      console.log(data);

      const formDataWithFile = new FormData();
      formDataWithFile.append("file", selectedFile);

      console.log(formDataWithFile);
      for (const key in data) {
        formDataWithFile.append(key, data[key]);
      }

      console.log(formDataWithFile);

      const requestOptions = {
        method: "POST",
        body: formDataWithFile,
      };  

      try {
        const response = await fetch(url, requestOptions);
        const responseData = await response.json();
        
        if (!response.ok) {
          if (responseData.error) {
            notifyError(responseData.error);
          } else {
            notifyError("An error occurred while creating job");
          }
        } else {
            
          notifySuccess("Job Created!");
          setFormData({
            title: "",
            company: "",
            location: "",
            description: "",
            qualifications: "",
            applicationDeadline: "",
          })
          navigate("/dashboard/jobs");
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        notifyError("An error occurred Posting the job");
      }
    // console.log(formData);
  };

  return (
    <div className="jobform-container">
      <h2>Post a Job or Internship</h2>
      <form >
        <div className="jobform-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="jobform-group">
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
          />
        </div>
        <div className="jobform-group">
          <label>Company Logo Image URL:</label>
          <input
                type="file"
                id="file"
                name="uploadedFile"
                accept="image/jpeg, image/jpg, image/png, image/bmp"
                onChange={handleFileChange}
            />
        </div>
        <div className="jobform-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>
        <div className="jobform-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="jobform-group">
          <label>Qualifications (comma-separated):</label>
          <input
            type="text"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleInputChange}
          />
        </div>
        <div className="jobform-group">
          <label>Application Deadline:</label>
          <input
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={onHandleClick}>Post Job/Internship</button>
      </form>
    </div>
  );
}

export default CreateJob;
