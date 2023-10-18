import photo from "../../../Assets/photo.jpg";
import { useEffect, useState } from "react";

export default function Conversation({ conversation,currentUser}) {
  const [user, setUser] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [Messages,setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const friendEmail = conversation.members.find((m) => m !== currentUser);

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/get-user-details?friendEmail=${friendEmail}`
        );
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Handle the case when the user with the given email is not found.
          console.error("User not found");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    };

    fetchUserDetails();
  }, [currentUser, conversation]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (conversation) {
          const response = await fetch(
            `http://localhost:4000/dashboard/chat/messages/${conversation._id}`
          );
          if (response.ok) {
            const data = await response.json();
            setMessages(data);
          } else {
            console.error(
              "Failed to fetch messages. Response status:",
              response.status
            );
          }
        }
      } catch (err) {
        console.error("An error occurred:", err);
      }
    };

    getMessages();
  }, [conversation]);
  // console.log(conversation);


  // console.log(user.file);

  useEffect(() => {
    if (user && user.file) {
      const correctedImagePath = user.file.replace(/\\/g, "/");
      setImagePath(`http://localhost:4000/${correctedImagePath}`);
    }
  }, [user]);

  const findMostRecentMessage = () => {
    if (Messages.length === 0) return null; // Handle the case when there are no messages

    // Sort the messages by their 'createdAt' attribute in descending order
    const sortedMessages = Messages.slice().sort((a, b) =>
      a.createdAt > b.createdAt ? -1 : 1
    );

    return sortedMessages[0]; // The first message in the sorted array is the most recent one
  };

  const mostRecentMessage = findMostRecentMessage();
  console.log(mostRecentMessage);

  return (
    <div className="conversation">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <img className="conversationImg" src={imagePath || photo} alt="" />
          <span className="conversationName">
            {user?.Email || "User not found"}
          </span>
          {mostRecentMessage && (
            <>
            <p className="lastMessage" style={{overflow:"hidden"}}>{mostRecentMessage.text}</p>
            <p className="lastMessageTime">
              {new Date(mostRecentMessage.createdAt).toLocaleString()}
            </p>
            </>

          )}
        </>
      )}
    </div>
  );
}
