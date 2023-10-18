import React, { useEffect, useState } from 'react'

const Message = ({message,own}) => {

  console.log(message.sender);

  const [imagePath, setImagePath] = useState("https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500");
  const [sender, setSender] = useState(null); // Initialize sender as null

  useEffect(() => {
    fetch("http://localhost:4000/alumni")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Find the alumni with the matching email
        const matchingAlumni = data.find((alumni) => alumni.Email === message.sender);
        if (matchingAlumni) {
          setSender(matchingAlumni);
        }
      })
      .catch((error) => {
        console.error("Error fetching alumni data:", error);
      });
  }, [message.sender]);

  console.log(sender);
 
  const image =sender&& sender.file;
  useEffect(() => {
    if (image) {
      const correctedImagePath = image.replace(/\\/g, "/");
      setImagePath("http://localhost:4000/" + correctedImagePath);
      console.log(imagePath);
    }
  }, [imagePath, image]);

  return (
    <div className={own ? "message own" : "message"}>
    <div className="messageTop">
      <img
        className="messageImg"
        src={imagePath}
        alt=""
      />
      <p className="messageText">{message.text}</p>
    </div>
    <div className="messageBottom">{new Date(message.createdAt).toLocaleString()}</div>
  </div>
  )
}

export default Message
