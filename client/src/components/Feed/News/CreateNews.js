import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../MyContext";

const CreateNews = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { userType, setUserType } = useMyContext();
  const [Alumni, setAlumni] = useState({});
  const userEmail = localStorage.getItem("UserEmail");

  const navigate = useNavigate();
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
          // Find the alumni with the matching email
          const alumniMatch = data.find((alumni) => alumni.Email === userEmail);
          if (alumniMatch) {
            setAlumni(alumniMatch);
          }
        })
        .catch((error) => {
          console.error("Error fetching alumni data:", error);
        });
    }
  }, [userType, userEmail]);

  const [NewsData, setNewsData] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setNewsData({ ...NewsData, [name]: newValue });
  };

  const handleFileChange = (News) => {
    const file = News.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (NewsData.isOnline) {
      setNewsData({ ...NewsData, location: "This is an online News" });
    }

    // Combine NewsData with creator information
    const NewsDataWithCreator = {
      ...NewsData,
      creator: Alumni._id, 
    };

    // Create FormData with the selected file
    const formDataWithFile = new FormData();
    formDataWithFile.append("file", selectedFile);

    // Append News data with creator to FormData
    for (const key in NewsDataWithCreator) {
      formDataWithFile.append(key, NewsDataWithCreator[key]);
    }

    try {
      const response = await fetch(
        "http://localhost:4000/dashboard/create/News",
        {
          method: "POST",
          body: formDataWithFile, // Send FormData as the body
        }
      );

      if (response.ok) {
        const data = await response.json();
        notifySuccess(data.message);
        navigate("/dashboard/News");
        console.log("News Created:", data);
      } else {
        console.error(
          "Error creating News:",
          response.status,
          response.statusText
        );
        // Handle errors here
      }
    } catch (error) {
      console.error("Error creating News:", error);
      // Handle other potential errors here
    }
  };

  return (
    <div className="CreateNews">
      <h2>Create News</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={NewsData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={NewsData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          News Image:
          <input
            type="file"
            id="file"
            name="uploadedFile"
            accept="image/jpeg, image/jpg, image/png, image/bmp"
            onChange={handleFileChange}
          />
        </label>
        <button type="submit">Create News</button>
      </form>
    </div>
  );
};

export default CreateNews;
