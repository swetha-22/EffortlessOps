import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import "./ChatBox.css";
import { addMessage, getMessages } from "../api/MessageRequests";
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'

const ChatBox = ({chat,currentUser,setSendMessage,receivedMessage}) => {
    const [userData, setUserData] = useState({});
    const [messages,setMessages]=useState([]);
    const [newMessage, setNewMessage] = useState("");

    const handleChange = (newMessage)=> {
      setNewMessage(newMessage)
    }
    
  
    useEffect(() => {
        const userId = chat?.members?.find((id)=>id!==currentUser);
        let getUserData = async () => {
          try {
            const response = await fetch(
              "https://effortlessops-backend.onrender.com/api/profile-data/getUser",{
                  method: "GET",
                  headers: {
                      "emp_id": userId,
                  }
              }
              );
              const data = await response.json();
              setUserData(data);
              // console.log(data)
          } catch (error) {
            console.error("Error fetching events:", error);
          }
        };
        if(chat!==null) {getUserData();}
      },[chat,currentUser])

      // fetch messages
      useEffect(() => {
        const fetchMessages = async () => {
          try {
            const { data } = await getMessages(chat._id);
            setMessages(data);
          } catch (error) {
            console.log(error);
          }
        };
    
        if (chat !== null) fetchMessages();
      }, [chat]);

      // Always scroll to last Message
      useEffect(()=> {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
      },[messages])

      // Send Message
      const handleSend = async(e)=> {
        e.preventDefault()
        const message = {
          senderId : currentUser,
          text: newMessage,
          chatId: chat._id,
      }
      const receiverId = chat.members.find((id)=>id!==currentUser);
      // send message to socket server
      setSendMessage({...message, receiverId})
      // send message to database
      try {
        const { data } = await addMessage(message);
        setMessages([...messages, data]);
        setNewMessage("");
      }
      catch
      {
        console.log("error")
      }
    }
    
    // Receive Message from parent component
    useEffect(()=> {
      console.log("Message Arrived: ", receivedMessage)
      if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
        setMessages([...messages, receivedMessage]);
      }
    },[receivedMessage])
    
    const scroll = useRef();
    const imageRef = useRef();
      
  return (
    <>
    <div className="ChatBox-container" style={{backgroundColor:"#d8ecfe", position:"relative", left:"-16px",width:"778px"}}>
      {chat?(
        <>
        <div className="chat-header">
              <div className="follower">
              <div className="d-flex" style={{margin:"-3px"}}>
                {/* profile pic here */}
                <img src={userData[0]?.image} style={{width:"40px", height:"40px", borderRadius:"50px"}} alt="" />
                <div className="name" style={{fontSize: "25px",fontWeight: "bold",color: "#023058",position: "relative",left: "13px",}}>
                  <span>
                    {userData[0]?.name}
                  </span>
                </div>
              </div>
               </div>
               <hr
                 style={{
                   width: "104%",
                   border: "0.1px solid #ececec",
                   marginTop: "13px",
                   marginLeft:"-17px"
                 }}
               />
         </div>
         {/* chat-body */}
         <div className="chat-body"  >
           {messages.map((message) => (
                 <>
                   <div ref={scroll}
                     className={
                       message.senderId === currentUser
                         ? "message own"
                         : "message"
                     }
                   >
                     <span>{message.text}</span>{" "}
                     <span>{format(message.createdAt)}</span>
                   </div>
                 </>
               ))}
         </div>
         <div className="chat-sender">
         <div style={{fontSize:"19px"}} onClick={() => imageRef.current.click()}><i class="fa-solid fa-link"></i></div>
           <InputEmoji
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                          e.preventDefault(); // Prevent default behavior of Enter key
                          handleSend(e); // Call handleSend function when Enter key is pressed
                      }
                  }}
              
                value={newMessage}
                onChange={handleChange}
               />
           <div className="send-button button" onClick = {handleSend}>Send</div>
           <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
         </div>{" "}
       </>
      ): (
        <span className="chatbox-empty-message">
          <i class="fa-regular fa-comment" style={{position: "relative",top: "245px",color: "#dedfe1",fontSize: "475px",}}></i>
          <h3 style={{position:"absolute", top:"250px", color:"#063258", animation: "bounce 1s infinite"}}>Tap to start conversation...</h3>
        </span>
      )}
      
    </div>
    </>
  );
};

export default ChatBox;
