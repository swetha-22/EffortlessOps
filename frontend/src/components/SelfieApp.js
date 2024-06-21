import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VideoContext from "../context/VideoContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import CalendarScheduler from "./CalendarScheduler";
import Progress from './Progress'; 
import camera from "../images/snap-btn.png";
import TaskMonitor from "./TaskMonitor";
import videoImg from "../images/male-user.png"
import videoCallGif from "../images/video-1-unscreen.gif";
import chatGif from "../images/chat-1-unscreen (1).gif";


function SelfieApp() {

  // Work status bar
  const [completionPercentage, setCompletionPercentage] = useState(0);
  useEffect(() => {
    setIsAdministrator(false);
    fetchTasks();
    const interval = setInterval(() => {
      setCompletionPercentage((prevPercentage) =>
        prevPercentage < 100 ? prevPercentage + 10 : prevPercentage
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  // Video Status
  let {videoRef, takeSnapshot, setIsAdministrator}=useContext(VideoContext);

  // Fetch Tasks
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    try {
      const response = await fetch('https://effortlessops-backend.onrender.com/api/tasks/fetchTasks');
      const data = await response.json();
      setTasks(data);
    } 
    catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  

  let mainStyle = {
    width: "86%",
    marginTop: "10px",
    position: "relative",
    // backgroundColor:"rgb(241, 243, 243)"
  };


  let videoBox={
    width: "270px",
    height: "215px",
    position: "absolute",
    right: "-1018px",
    top: "-30px"
  }

  let videoImgStyle={
    width: "270px",
    height: "203px",
    position: "relative",
    left: "1019px",
    backgroundColor: "rgb(215, 244, 250)",
    top:"-59px",
    borderRadius:"10px"
  }


  let calendarStyle={
    width: "900px",
    left: "-50px",
    position: "relative",
    top: "11px",
  }

  let rightBar={
    // border: "1px solid black",
    width: "350px",
    height: "800px",
    position: "absolute",
    top: "310px",
    right: "25px",
  }

  let progressStyle={
    border:"1px solid gray",
    borderRadius:"10px",
    // backgroundColor:"rgb(226 250 237)"
    background:"linear-gradient(rgb(210, 255, 232) 35%, rgb(215 245 250) 81%)"
  }

  let chatStyle={
    height: "214px",
    marginTop: "15px",
    border: "1px solid gray",
    borderRadius: "10px",
    // background:"linear-gradient(180deg, rgba(209,254,227,1) 36%, rgba(255,235,187,1) 80%)"
    background:"linear-gradient(rgb(209, 254, 227) 36%, rgb(166 237 194) 80%)"
  }

  let videoStyle={
    height: "214px",
    marginTop: "15px",
    border: "1px solid gray",
    borderRadius: "10px",
    // backgroundColor: "rgb(241, 243, 243)",
    background:"linear-gradient(rgb(215 244 250) 18%, rgb(187, 218, 255) 74%)"
  }
  
  let taskStyle={
    width: "874px",
    position: "absolute",
    top: "500px",
    left: "175px",
    marginTop:"25px",
    // backgroundColor:"rgb(241, 243, 243)"
  }
  
  let videoCallGifStyle={
    height: "212px",
    width: "348px",
    position: "relative",
    left: "-16px",
    top: "-40px",
    borderRadius: "10px",
    background:"linear-gradient(rgb(215 244 250) 18%, rgb(187, 218, 255) 74%)"
  }

  let chatGifStyle={
    height: "212px",
    width: "320px",
    position: "relative",
    left: "12px",
    top: "-40px",
    borderRadius: "20px",
    background:"linear-gradient(rgb(209, 254, 227) 36%, rgb(166 237 194) 80%)"
  }

  return (
    <div>
        <Navbar/>
        <div className="d-flex">
            <Sidebar/>
            <div className='myComponent' style={mainStyle}>
                <div>
                  {/* <button className="btn btn-primary" style={{position:"relative", zIndex:"2", left:"910px",}} onClick={takeSnapshot}>
                  </button> */}
                  <img style={{width:"60px", height:"53px", position:"relative", zIndex:"2", left:"943px", borderRadius:"50px"}} src={camera} alt="Take Snapshot" onClick={takeSnapshot} />
                  <img src={videoImg} style={videoImgStyle} alt="" />
                  <video ref={videoRef} style={videoBox} className="my-3" />
                </div>
            </div>
            <div style={calendarStyle}>
              <CalendarScheduler roll={"employee"}/>
            </div>
            <div className="d-flex flex-column" style={rightBar}>
              <div style={progressStyle}>
                <Progress percentage={completionPercentage} maxPercentage={75} />
              </div>
              <div style={chatStyle}>
                <h5 style={{position: "relative", top:"10px", left:"10px", zIndex:"2"}}>
                  Goto Chat
                </h5>
                <Link className="nav-link" to="/chat">
                  <img style={chatGifStyle} src={chatGif} alt="chat app" />
                </Link>
              </div>
              <div style={videoStyle}>
                <h5 style={{position: "relative", top:"10px", left:"10px", zIndex:"2"}}>
                  Connect to Video-call
                </h5>
                <Link className="nav-link" to="/videoCall">
                  <img style={videoCallGifStyle} src={videoCallGif} alt="video call" />
                </Link>
              </div>
            </div>
            <div style={taskStyle}>
              {tasks.map((data, index) => {
                  return <div className="md-3" key={index}>
                      <TaskMonitor coll_name={data.taskName} id={data._id} setTasks={setTasks} tasks={tasks} role={"user"}/>
                  </div>
              })}
            </div>
        </div>
    </div>
  );
}
export default SelfieApp;



//Programatically click a button

// const InputComponent = () => {
// 	const inputElement = React.useRef()

// 	return <input ref={inputElement} />
// }
// inputElement.click()