import React, { useState, useEffect, useContext } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { useMyContext } from "../../MyContext";

function Events() {
  const userEmail = localStorage.getItem("UserEmail");
  console.log(userEmail);
  const { userType, setUserType } = useMyContext();

  console.log(userType);
  const [EventData, setEventData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/dashboard/events")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setEventData(data);
      })
      .catch((error) => {
        console.error("Error fetching event data:", error);
      });
  }, []);


  return (
    <div className={'Events'}>
      <div className="events">
        {EventData.map((event) => (
          <EventCard key={event._id} eventData={event} />
        ))}
      </div>
      {userType === "alumni" && (
        <div className={'add'}>
          <Link to="/dashboard/create/event">
            <FaPlusCircle />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Events;
