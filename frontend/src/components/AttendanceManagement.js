import React, { useState, useEffect } from 'react'
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import leaveBal from "../images/leave-balance.png"
import {Table } from 'react-bootstrap';
import {Link} from "react-router-dom"

const AttendanceManagement = () => {


    //styling
    const circleStyle = {
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        margin: '5px',
        display: 'inline-block',
        border:"0.5px solid #d3cbcb",
        fontSize:"13px",
        paddingLeft:'6px',
        paddingTop:"1px",
        color:'gray'
    };

    const highlightedCircleStyle = {
        ...circleStyle,
        backgroundColor: 'rgb(154, 85, 255)',
        border:"1px solid white",
        color:'white',
        fontWeight:"600"
    };

    const mainStyle = {
        width: "100%",
        position: "relative",
        // border: "1px solid gray",
        height:"auto",
        padding:"30px",
        // background: "linear-gradient(0deg, rgba(186,246,250,1) 30%, rgba(189,254,184,1) 83%)",
        display:"flex",
        top:"-20px",
        left:"-13px",
    };

    let box1Style={
        backgroundColor:"white",
        width:"425px",
        height:"180px",
        border:"1px solid gray",
        marginRight:"55px",
        borderRadius:"5px",
        padding:'10px',
    }
    let box2Style={
        backgroundColor:"white",
        width:"425px",
        height:"180px",
        border:"1px solid gray",
        marginRight:"55px",
        borderRadius:"5px",
        padding:'10px',
    }
    let box3Style={
        backgroundColor:"white",
        width:"425px",
        height:"180px",
        border:"1px solid gray",
        borderRadius:"5px",
        padding:'20px',
    }


    // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDay = new Date().getDay();
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const [isClockIn, setIsClockIn]=useState(true);
    const [clockInId, setClockInId]=useState("");

    let enterData = async () => {
        try {
            const response=await fetch("https://effortlessops-backend.onrender.com/api/log-attendance/addAttendanceLog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "emp_id":localStorage.getItem("emp_id"),
                },
            });
            if(response.status!==400){
                setIsClockIn(!isClockIn);
                const val = await response.text();
                const data = JSON.parse(val);
                setClockInId(data._id);
                localStorage.setItem('isClockIn', !isClockIn);
            }
            else{
                alert("You can't clock-in on same day multiple times.!");
            }
        } 
        catch (error) {
          console.error("Error fetching events:", error);
        }
    };


    const updateAttendanceLog = async (logId) => {
        try {
            const response = await fetch(`https://effortlessops-backend.onrender.com/api/log-attendance/updateAttendanceLogs/${logId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "emp_id":localStorage.getItem("emp_id"),
                },
            });
            const val = await response.text();
            const data = JSON.parse(val);
            setAttendanceData(data);
        } 
        catch (error) {
            console.error('Error updating leave status:', error);
        }
    };


    
    let handleClock=()=>{
        if(!isClockIn){
            const isConfirmed = window.confirm('Are you sure you want to clock out?');
            if(isConfirmed){
                setIsClockIn(!isClockIn);
                updateAttendanceLog(clockInId);
                localStorage.removeItem("isClockIn");
            }
        }
        else{
            enterData();
        }
        // console.log(isClockIn);
    }
    
    useEffect(() => {
        const storedValue = localStorage.getItem('isClockIn');
        const parsedValue = storedValue === 'true'; // Convert 'true' or 'false' string to boolean
        if(storedValue===null)
            setIsClockIn(true);
        else
            setIsClockIn(parsedValue);
    }, []);
    
    
    
    
    
    // attendance logs
    const [attendanceData, setAttendanceData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [month, setMonth] = useState("");

    const fetchAttendanceData = async (month) => {
        console.log(`Fetching attendance data for ${month}`);
        setMonth(month);
        try {
            const response = await fetch("https://effortlessops-backend.onrender.com/api/log-attendance/getAttendanceLogs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "emp_id":localStorage.getItem("emp_id"),
                },
            });
            const val = await response.text();
            const data = JSON.parse(val);
            setAttendanceData(data);
        }
        catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchAttendanceData(startDate.toLocaleString('default', { month: 'long', year: 'numeric' }));
    }, [startDate, attendanceData]);


    const isWeekend = (date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
    };


    
    return (
        <div>
            <Navbar/>
            <div className="d-flex" style={{width: "131%",position: "relative",right: "124px"}}> 
                <Sidebar/>
                <div style={mainStyle}>
                    <div>
                        <h4 style={{marginBottom:'20px'}}>Attendance Stats</h4> 
                        <div className='d-flex flex-row'>

                            {/* box 1 */}
                            <div style={box1Style}>
                                <p style={{marginLeft:'10px', fontSize:"15px"}}>Last Week</p>
                                <div className='d-flex flex-row'>
                                    <div style={{width:'40px', height:"40px", borderRadius:"50px", backgroundColor:'#fbc02d', marginLeft:'10px'}}>
                                        <i className="fa-solid fa-user" style={{color:"white", position: "relative",left: "13px", top: "7px" }}></i>
                                    </div>
                                    <div>
                                        <pre style={{position:"relative", top:"-22px", left:"88px", color:'gray'}}>Avg Hrs/Day     On Time Arrival</pre>
                                    </div>
                                    <div className='d-flex flex-row'>
                                        <p style={{position:"absolute", left:"100px", top:"135px"}}>Me</p>
                                        <h4 style={{position:"relative", right:'143px', top:"5px", color:"#626163"}}>9:45</h4>
                                        <h4 style={{position:"relative", right:'40px', top:"5px", color:"#626163"}}>100%</h4>
                                    </div>
                                </div>
                                <hr />
                                <div className='d-flex flex-row'>
                                    <div style={{width:'40px', height:"40px", borderRadius:"50px", backgroundColor:'rgb(141 45 251)', marginLeft:'10px'}}>
                                        <i className="fa-solid fa-user-group" style={{color:"white", position: "relative",left: "10px", top: "7px" }}></i>
                                    </div>
                                    <div className='d-flex flex-row'>
                                        <p style={{position:"absolute", left:"100px", top:"209px"}}>Team</p>
                                        <h4 style={{position:"relative", left:'95px', top:"5px", color:"#626163"}}>9:15</h4>
                                        <h4 style={{position:"relative", left:'212px', top:"5px", color:"#626163"}}>98%</h4>
                                    </div>
                                </div>
                            </div>

                            {/* box 2 */}
                            <div style={box2Style}>
                                <div>
                                    {days.map((day, index) => (
                                        <div key={index} style={index === currentDay ? highlightedCircleStyle : circleStyle}>{day}</div>
                                    ))}
                                </div>
                                <br /> <br />
                                <div>
                                    <p style={{marginLeft:"5px"}}>Timings (9:00Am - 6:00Pm) </p>
                                    <div className="d-flex flex-row">
                                        <div style={{width:"190px", height:"10px", borderRadius:"20px 0px 0px 20px", backgroundColor:"rgb(154, 85, 255)"}}></div>
                                        <div style={{width:"70px", height:"10px", backgroundColor:"rgb(208 184 242)"}}></div>
                                        <div style={{width:"190px", height:"10px", borderRadius:"0px 20px 20px 0px", backgroundColor:"rgb(154, 85, 255)"}}></div>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <p style={{fontSize:"12px", marginTop:"5px", color:"gray", marginLeft:"10px"}}>Duration : 9 hrs</p>
                                        <p style={{fontSize:"12px", marginTop:"5px", color:"gray", marginLeft:"220px"}}>Break : 30 mins</p>
                                    </div>

                                </div>
                            </div>

                            {/* box 3 */}
                            <div style={box3Style}>
                                <div className="d-flex flex-row">
                                    <div>
                                        <h6 style={{marginBottom:"20px"}}>Log your Attendance</h6>
                                        { isClockIn ?
                                            (<button onClick={handleClock} className='btn' style={{backgroundColor:"rgb(72 109 217)", color:"white"}}>
                                                Clock-in
                                            </button>) :
                                            (<button onClick={handleClock} className='btn' style={{backgroundColor:"rgb(228 140 70)", color:"white"}}>
                                                Clock-out
                                            </button>
                                            )
                                        }
                                        
                                    </div>
                                    <div style={{width: "1px",height: "160px",position: "relative",left: "60px",top: "-10px",border: "1px dashed gray",}}></div>
                                    <div>
                                        <img src={leaveBal} style={{width:"160px", height:"135px", position:"relative", left:"75px", top:"-18px", padding:"5px"}} />
                                        <Link to="/leave_balance">
                                            <h5 style={{position:"relative", top:"-20px", left:"90px", color:"rgb(138 64 246)"}}>
                                                Leave Balance
                                            </h5>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br /><br />
                        

                        {/* attendance logs */}
                        <div>
                            <h4>{month}</h4>
                            <Table hover style={{fontSize:"14px"}}>
                                <thead style={{backgroundColor:"#eef0f0"}}>
                                    <tr>
                                        <th>Date</th>
                                        <th>Clock-in</th>
                                        <th>Clock-out</th>
                                        <th>Effective Hours</th>
                                        <th>Log</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendanceData.length==0?<h5 style={{position:"relative", left:"550px", top:"10px", color:"brown"}}>No log entries to show</h5>:
                                        attendanceData.map((entry) => {
                                            // Convert MongoDB string date to JavaScript Date object
                                            const entryDate = new Date(entry.date);
                                            return (
                                                <tr key={entry._id} style={{ backgroundColor: isWeekend(entryDate) ? 'rgb(209 251 249)' : 'white', height: "60px", marginTop: "10px" }}>
                                                    <td>{entryDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}, {entryDate.toLocaleDateString('en-US', { weekday: 'short' })}</td>

                                                    <td>
                                                        {isWeekend(entryDate) ? (
                                                            <p style={{ position: "relative", left: "400px" }}>Full day Weekly-off</p>
                                                        ) : (
                                                            <>
                                                                <i className="fa-solid fa-circle-dot fa-small" style={{ color: "rgb(154, 85, 255)" }}> &nbsp; </i>
                                                                {entry.clockIn}
                                                            </>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {isWeekend(entryDate) ? null : (
                                                            <div className='d-flex flex-row'>
                                                                <i className="fa-solid fa-left-long" style={{ color: "red", marginTop:"5px" }}> &nbsp; </i>
                                                                {entry.clockOut==null
                                                                    ? "----"
                                                                    : entry.clockOut}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td style={{ position: "relative" }}>
                                                        {isWeekend(entryDate) ? null : (
                                                            <div className="d-flex flex-row">
                                                                <div style={{ width: "100px", height: "8px", backgroundColor: "rgb(154, 85, 255)", marginTop: "10px", borderRadius: "20px" }}></div>
                                                                <p style={{ margin: "3px 0px 0px 10px" }}> {entry.effectiveHours===null?"?":entry.effectiveHours}</p>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td>{isWeekend(entryDate) ? null : entry.clockOut==null ? 
                                                                <i class="fa-solid fa-circle-exclamation" style={{color:"#ffb800", fontSize:"20px"}}></i> : 
                                                                <i class="fa-regular fa-circle-check" style={{color:"#13bc13", fontSize:"20px"}}></i>}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AttendanceManagement;