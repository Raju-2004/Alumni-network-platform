import React, { useEffect, useState } from "react";
import event from "../../../Assets/event.jpeg";
const EventCard = ({ eventData }) => {
  const [imagePath, setImagePath] = useState("");
  const [countdown, setCountdown] = useState("");
  const image = eventData.Image;
  const eventDate = new Date(eventData.date);
  const currentDate = new Date();

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (image) {
      const correctedImagePath = image.replace(/\\/g, "/");
      setImagePath("http://localhost:4000/" + correctedImagePath);
    }
    const timer = setInterval(() => {
      const timeDiff = eventDate - new Date();
      if (timeDiff <= 0) {
        clearInterval(timer);
        setCountdown("Completed");
      } else {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [imagePath, image, eventDate]);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="event-card">
      {/*  <div className="event-card-inner"> */}
      <div className="event-card-front">
        <img
          style={{ height: 250, width: 320 }}
          src={imagePath !== "" ? imagePath : event}
          alt="Event"
          className="event-image"
        />
      </div>
      <div className="event-card-back">
        <h3 className="event-title">
          <span>Title : </span>
          {eventData.title}
        </h3>
        <p className="event-date">
          <span>Date: </span>
          {new Date(eventData.date).toLocaleDateString()}
        </p>
        <p className="event-date">
          <span>Status: </span>
          {countdown}
        </p>
        <p className="event-time">
          <span>Time: </span>
          {eventData.time}
        </p>
        {eventData.isOnline ? (
          <p className="event-location">
            <span>Location:</span>Online Event
          </p>
        ) : (
          <p className="event-location">
            <span>Location:</span> {eventData.location}
          </p>
        )}
        <p className="event-creator">
          {eventData.creator && eventData.creator.Email}
        </p>
        <button className="toggle-button" onClick={toggleDescription}>
          {expanded ? "View less" : "View more"}
        </button>
      </div>
      <div
        className="expanded-details"
        style={{ display: expanded ? "block" : "none" }}
      >
        <p className="event-description">
          <span>Description:</span>
          {eventData.description} 
        </p>
      </div>

      {/* </div> */}
    </div>
  );
};

export default EventCard;
