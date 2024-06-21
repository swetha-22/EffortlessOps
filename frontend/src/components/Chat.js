import React, { useRef, useState, useCallback } from "react";
import { useEffect, useContext } from "react";
import { userChats } from "../api/ChatRequests";
import Conversation from "./Conversation";
import ChatBox from "./ChatBox";
import './Chat.css'
import { io } from "socket.io-client";
import chatLogo from "../images/chat-icon.png"
// navbar ad side bar

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import SearchChat from "./SearchChat";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import VideoContext from "../context/VideoContext";


const Chat = () => {

  let mainStyle = {
        width: "90%",
        marginTop: "10px",
        position: "relative",
        // border: "1px solid",
        height: "579px",
        left: "100px",
  };


  const socket = useRef();

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  
  const [currentMember, setCurrentMember] = useState("");

  const handleSetCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, [currentChat]);

  useEffect(() => {
    if(isAdministrator){
      setCurrentMember("admin_id");
    }
    else{
      setCurrentMember("emp_id");
    }
    const getChats = async () => {
      try {
        const { data } = await userChats(localStorage.getItem(currentMember));
        // console.log(data);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  },[localStorage.getItem(currentMember),currentChat]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", localStorage.getItem(currentMember));
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [localStorage.getItem(currentMember)]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage, currentChat]);

      
  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      // console.log(data)
      setReceivedMessage(data);
    }

    );
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== localStorage.getItem(currentMember));
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  let {isAdministrator} =useContext(VideoContext);
    
  return (
    <div>

        {isAdministrator===true?<AdminNavbar/>:<Navbar/>}
        <div className="d-flex">
          {isAdministrator===true?<AdminSidebar/>:<Sidebar/>}
            <div className='myComponent' style={mainStyle}>
              <div className='Chat'>
                <div className='Left-side-chat'>
                  <div className="Chat-container">
                    <div className="d-flex">
                      <img style={{width:'100px', height:"70px", position:"relative", top:"12px"}} src={chatLogo} alt="" />
                      <h4 style={{position:"relative", top:"14px", left:"10px"}}>Speak Space</h4>
                    </div>
                  <div>
                  
                  <SearchChat handleSetCurrentChat={handleSetCurrentChat} />

                  <div className="Chat-list" style={{position:"absolute", top:"150px"}}>
                  {chats.map((chat) => (
                    <div style={{marginBottom:"-30px"}}
                    onClick={() => {
                      setCurrentChat(chat);
                    }}
                  >
                      <Conversation data={chat} currentUser={localStorage.getItem(currentMember)} online={checkOnlineStatus(chat)}/>
                    </div>
                  ))}
                  </div>
                  </div>
                  </div>
                </div>

                <div className='Right-side-chat'>
                <ChatBox chat={currentChat} currentUser={localStorage.getItem(currentMember)} setSendMessage={setSendMessage} receivedMessage={receivedMessage}/>
                </div>
              </div>
            </div>
        </div>
    </div>
  );
}

export default Chat;