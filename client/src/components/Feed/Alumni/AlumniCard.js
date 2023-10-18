import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FaRocketchat } from "react-icons/fa6";

function AlumniCard({
  name,
  id,
  current_role,
  image,
  email,
  graduation,
  LinkedIn,
  expertise,
  achievements,
}) {

  const [conversationId, setConversationId] = useState(null);
  const isUserLoggedIn = localStorage.getItem("UserEmail");
  // const {Posts,setPosts} = useContext(MyContext);
  //   const [expanded, setExpanded] = useState(false);
  const [imagePath, setImagePath] = useState(
    "https://www.patterns.dev/img/reactjs/react-logo@3x.svg"
  );

  //   console.log(image);
  /* const [iconClicked, setIconClicked] = useState(false); */
  useEffect(() => {
    if (image) {
      const correctedImagePath = image.replace(/\\/g, "/");
      setImagePath("http://localhost:4000/" + correctedImagePath);
      // console.log(imagePath);
    }
  }, [imagePath, image]);

  console.log(email+"---");

  const onChatClick  = async ()=>{
    try {
      // Make an API request to create or get the conversation
      const response = await fetch('http://localhost:4000/conversation/createOrGetConversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ members: [isUserLoggedIn,email] }),
      });

      if (response.ok) {
        const data = await response.json();
        const { conversation } = data;
        if (conversation) {
          setConversationId(conversation._id);
        }
      } else {
        // Handle the error
        console.error('Failed to create or get the conversation');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="Alumni-card">
      <div className="Alumni-card-image">
        <img style={{ height: 250, width: 320 }} src={imagePath} alt={name} />
      </div>
      <div className="Alumni-card-content">
        <h2 className="Alumni-card-name">Name:{name}</h2>
        <p className="Alumni-card-current_role">current_role: {current_role}</p>
        <p className="Alumni-card-graduationYear">
          Graduation-year : {graduation}
        </p>
        <p className="Alumni-card-linkedin">
          LinkedIn : <Link to={LinkedIn}>LinkedIn-profile</Link>
        </p>
        <p className="Alumni-card-expertise">expertise : {expertise}</p>
        <p className="Alumni-card-achievements">
          achievements : {achievements}
        </p>
        {/* <p className="Alumni-card-description">{description}</p> */}
      </div>
      <div className="Alumni-card-actions">
        <Link to={`/dashboard/chat/${email || conversationId}`}>
          <FaRocketchat className="Alumni-card-chat"  onClick={onChatClick}/>
        </Link>
      </div>
    </div>
  );
}

export default AlumniCard;
