import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../MyContext";

const CreateEvent = () => {
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

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    isOnline: true, // Default to an online event
    location: "", // Location is empty by default
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setEventData({ ...eventData, [name]: newValue });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (eventData.isOnline) {
      setEventData({ ...eventData, location: "This is an online event" });
    }

    // Combine eventData with creator information
    const eventDataWithCreator = {
      ...eventData,
      creator: Alumni._id, // Assuming _id is the alumni ID property
    };

    // Create FormData with the selected file
    const formDataWithFile = new FormData();
    formDataWithFile.append("file", selectedFile);

    // Append event data with creator to FormData
    for (const key in eventDataWithCreator) {
      formDataWithFile.append(key, eventDataWithCreator[key]);
    }

    try {
      const response = await fetch(
        "http://localhost:4000/dashboard/create/event",
        {
          method: "POST",
          body: formDataWithFile, // Send FormData as the body
        }
      );

      if (response.ok) {
        const data = await response.json();
        notifySuccess(data.message);
        navigate("/dashboard/events");
        console.log("Event Created:", data);
      } else {
        console.error(
          "Error creating event:",
          response.status,
          response.statusText
        );
        // Handle errors here
      }
    } catch (error) {
      console.error("Error creating event:", error);
      // Handle other potential errors here
    }
  };

  return (
    <div className="CreateEvent">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Event Image:
          <input
            type="file"
            id="file"
            name="uploadedFile"
            accept="image/jpeg, image/jpg, image/png, image/bmp"
            onChange={handleFileChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={eventData.time}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Is Online Event:
          <input
            type="checkbox"
            name="isOnline"
            checked={eventData.isOnline}
            onChange={handleInputChange}
          />
        </label>
        {eventData.isOnline ? (
          <p>This is an online event.</p>
        ) : (
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleInputChange}
            />
          </label>
        )}
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
