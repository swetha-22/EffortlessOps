import React from 'react'
import eoLogo from "../images/EO logo.png";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../images/admin-profile.jpg";

const AdminNavbar = () => {
    const navigate = useNavigate();
    let emp_name=localStorage.getItem("admin_name");

    let navStyle={
        border:"1px solid black",
        width:"139%",
        height:"75px",
        fontSize:"17px",
        marginLeft:"-213px",
        background: "linear-gradient(to right, rgb(140 255 237), rgb(69 80 164))",
    }

    let logoStyle = {
        width: "65px",
        height: "55px",
        borderRadius: "50px",
        backgroundColor: "white",
        margin:"7px 0px 0px 20px"
    };

    return (
        // {fixed-top} -> for stick nav bar
        <div className='d-flex' style={navStyle}>
            {/* <img src={adminBG} alt="" style={{width:"101%", height:"33%" ,position:"absolute"}}/> */}
            <div className='d-flex'>
                <img style={logoStyle} src={eoLogo} alt="logo" />
                <div>
                    <div className="d-flex" style={{position:"relative", top:"24px", margin:"0px 15px", left:"10px", fontSize:"19px"}}>
                        <p>Hii, &nbsp; </p>
                        <p><b>{emp_name}</b></p>
                    </div>
                </div>

                {/* <div className='d-flex' style={{position:'relative', left:"207%", top:"6px"}}>
                    <img src={profilePic} alt="profile" style={{width:"60px", height:"60px", border:"3px solid gray", borderRadius:"50px", zIndex:"2"}} onClick={()=>{console.log("clicked"); navigate('/my_profile');}}/> 
                    <h5 style={{position:'relative', top:"19px", left:'10px', color:'aliceblue'}}>Profile</h5>
                </div> */}

                <button style={{border: "none",marginLeft: "30px",width: "100px",height: "40px",borderRadius: "15px",backgroundColor: "#bae9e9",fontWeight: "700", position:'relative', top:"17px", left:"325%"}} onClick={()=>{localStorage.removeItem("admin_id");localStorage.removeItem("admin_name");navigate("/mainUI")}}>
                    <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
                </button>
            </div>
        </div>
    )
}


export default AdminNavbar
