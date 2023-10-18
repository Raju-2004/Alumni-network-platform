import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useMyContext } from "../../MyContext";
import Message from "./Message";
import Conversation from "./Conversation";
import {io} from "socket.io-client";
const Chat = () => {
  const [message, setMessage] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setmessages] = useState([]);
  const [fromMail, setFromMail] = useState("");
  // const [newMessage,setnewMessage] = useState("");
  const [toMail, setToMail] = useState("");
  // const { userType, setUserType } = useMyContext();
  const [conversations, setConversations] = useState([]);
  const scrollRef = useRef();

  // const [socket,setSocket] = useState(null);
  const socket = useRef();
  const [arrivalMessage,setArrivalMessage] = useState(null);

  const { email } = useParams();
  const userEmail = localStorage.getItem("UserEmail");
  //   console.log(email);


  useEffect(()=>{
    socket.current =io("ws://localhost:8900");
    socket.current.on("getMessage",data=>{
      setArrivalMessage({
        sender :data.senderId,
        text : data.text,
        createdAt : Date.now()
      })

      setmessages((prev) => [...prev, {
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      }]);
    });
    
  },[])

  useEffect(()=>{
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
    setMessage((prev) => [...prev,arrivalMessage])
  },[arrivalMessage,currentChat])

  useEffect(()=>{
    socket.current.emit("addUser",userEmail)
    socket.current.on("getUsers",users=>{
      console.log(users); 
    })
  },[userEmail])

  console.log(socket);

  useEffect(()=>{
    socket?.current.on("welcome",socketMessage=>{
      console.log(socketMessage)
    })
  },[socket])

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  console.log(message);


  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])

  /* console.log("sender mail" + fromMail);
  console.log("receiver mail" + toMail); */
  useEffect(() => {
    setFromMail(userEmail);
    setToMail(email);
  }, [email, userEmail]);

  useEffect(() => {
    fetch(`http://localhost:4000/conversation/${userEmail}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the conversation data here
        console.log("Conversation data:", data);
        setConversations(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [email, userEmail]);

  const onHandleClick = async () => {
    try {
      // Create a message object to send to the server
      const messageData = {
        conversationId: currentChat._id,
        sender: userEmail,
        text: message,
      };

      const receiverId = currentChat.members.find(member=> member!==userEmail);

      socket.current.emit('sendMessage',{
        senderId : userEmail,
        receiverId,
        text : message
      })

      // console.log(messageData);
      const response = await fetch(
        "http://localhost:4000/dashboard/chat/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageData),
        }
      );

      if (response.status === 200) {
        const data = await response.json(); // Parse the response
        console.log("Message sent successfully.");
        setmessages([...messages, data]); // Use the parsed data
        setMessage("");
      } else {
        console.error("Failed to send message.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };




  // console.log(currentChat);
  console.log(messages);
  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          const response = await fetch(
            `http://localhost:4000/dashboard/chat/messages/${currentChat._id}`
          );
          if (response.ok) {
            const data = await response.json();
            setmessages(data);
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
  }, [currentChat]);

  // console.log(messages);

  return (
    <div className="Chat">
      <div className="chatMenu">
        {conversations.map((c) => (
          <div key={c._id} onClick={() => setCurrentChat(c)}>
            <Conversation conversation={c} messages= {messages} currentUser={userEmail} />
          </div>
        ))}
      </div>
      <div className="chatBox">
        <div className="chat-messages">
          {currentChat ? (
            <>
              {messages &&
                messages.map((m) => (
                  <div key={m._id} ref={scrollRef}>
                    <Message
                      message={m}
                      own={m.sender === userEmail}
                      key={m._id}
                    />
                  </div>
                ))}
            </>
          ) : (
            <span style={{fontSize:"3.5rem"}}>Open a conversation to start a chat</span>
          )}
        </div>
        <div className="inputField">
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder="Type a message..."
          />
          <button type="button" onClick={onHandleClick}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
