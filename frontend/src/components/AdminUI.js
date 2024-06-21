import React, { useState, useEffect, useContext } from "react";
// import TaskMonitor from "./TaskMonitor";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import CalendarScheduler from "./CalendarScheduler";
// import TaskHeader from "./TaskHeader";
import circle from "../images/circles.svg"
import { Link } from "react-router-dom";

import VideoContext from "../context/VideoContext";

import videoCallGif from "../images/video-1-unscreen.gif";
import chatGif from "../images/chat-1-unscreen (1).gif";

function SelfieApp() {

  let {setIsAdministrator} =useContext(VideoContext);

  useEffect(() => {
    setIsAdministrator(true);
    // fetchTasks();
  }, []);
  

  // // Fetch Tasks
  // const [tasks, setTasks] = useState([]);
  // const fetchTasks = async () => {
  //   try {
  //     const response = await fetch('https://effortlessops-backend.onrender.com/api/tasks/fetchTasks');
  //     const data = await response.json();
  //     setTasks(data);
  //   } 
  //   catch (error) {
  //     console.error('Error fetching events:', error);
  //   }
  // };
  

  let mainStyle = {
    width: "90%",
    height:"auto",
    top: "175px",
    left:"65px",
    position: "relative",
  };
  
  let calendarStyle={
    width: "900px",
    left: "150px",
    position: "relative",
    marginBottom:"20px",
    marginTop:"30px",
    top:'120px'
  }

  // let taskStyle={
  //   border: "1px solid",
  //   width: "874px",
  //   position: "relative",
  //   top: "25px",
  //   left:"-100px"
  //   // backgroundColor:"rgb(241, 243, 243)"
  // }

  let card1Style={
    width:'320px',
    height:"200px",
    marginRight:"50px",
    // background: "linear-gradient(to right, #ffbf96, #fe7096)",
    background: "linear-gradient(to right, rgb(147 222 148), rgb(150, 214, 196))",
    borderRadius:"10px"
}
let card2Style={
    width:'320px',
    height:"200px",
    marginRight:"50px",
    background: "linear-gradient(to right, rgb(172 197 249), rgb(130 93 255))",
    // background: "linear-gradient(to right, #90caf9, #047edf 99%)",
    borderRadius:"10px",
}
let card3Style={
    width:'320px',
    height:"200px",
    marginRight:"50px",
    // background: "linear-gradient(to right, #da8cff, #9a55ff)",
    background: "linear-gradient(to right, rgb(153 225 215), rgb(41 179 212) 99%)",
    borderRadius:"10px",
 }

 let rightBar={
  // border: "1px solid black",
  width: "350px",
  height: "auto",
  position: "absolute",
  top: "105px",
  left: "860px",
}

let chatStyle={
  height: "214px",
  marginTop: "23px",
  border: "1px solid gray",
  borderRadius: "5px",
  background:"linear-gradient(rgb(209, 254, 227) 36%, rgb(166 237 194) 80%)"
}

let videoStyle={
  height: "214px",
  marginTop: "30px",
  border: "1px solid gray",
  borderRadius: "5px",
  background:"linear-gradient(rgb(215 244 250) 18%, rgb(187, 218, 255) 74%)"
}


let videoCallGifStyle={
  height: "212px",
  width: "348px",
  position: "relative",
  left: "-16px",
  top: "-40px",
  borderRadius: "5px",
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

 let circleStyle={width:"163px", position:"relative", left:"158px", borderRadius:"0px 10px 10px 0px",}

 

  return (
    <div>
        <AdminNavbar/>
        <div className="d-flex">
            <AdminSidebar/>
            <div className='myComponent' style={mainStyle}>
              <div className='d-flex flex-row' style={{position: "absolute", left: "10px", top: "-115px"}}>
                  <div style={card1Style}>
                      <img src={circle} alt="circle" style={circleStyle}/>
                      <Link to="/emp-list" style={{position: "absolute",left: "30px",color: "black",fontSize: "21px",fontWeight: "500",top: "80px",fontFamily: "revert-layer",}}>
                        Track Legitimacy
                      </Link>
                  </div>
                  <div style={card2Style}>
                      <img src={circle} alt="circle" style={circleStyle}/>
                      <Link to="/task-tracker" style={{position: "absolute",left: "400px",color: "black",fontSize: "21px",fontWeight: "500",top: "80px",fontFamily: "revert-layer",}}>
                        Track Tasks
                      </Link>
                  </div>
                  <div style={card3Style}>
                      <img src={circle} alt="circle" style={circleStyle}/>
                      <Link to="/admin_emp_track" style={{position: "absolute",left: "770px",color: "black",fontSize: "21px",fontWeight: "500",top: "80px",fontFamily: "revert-layer",}}>
                        Track Employees
                      </Link>
                  </div>
              </div>
              <div className="d-flex">
                <div>
                  <div style={calendarStyle}>
                    <CalendarScheduler roll={"admin"}/>
                  </div>
                  {/* <div style={taskStyle}>
                    <TaskHeader setTasks={setTasks}/>
                    {tasks.map((data, index) => {
                        return <div className="md-3" key={index}>
                            <TaskMonitor coll_name={data.taskName} id={data._id} setTasks={setTasks} tasks={tasks} />
                        </div>
                    })}
                  </div> */}
                </div>
                <div className="d-flex flex-column" style={rightBar}>
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
              </div>
            </div>
        </div>
    </div>
  );
}
export default SelfieApp;


