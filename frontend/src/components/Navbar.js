import React, { useState, useContext } from "react";
import VideoContext from "../context/VideoContext";
import { Link, useNavigate } from "react-router-dom";
import eoLogo from "../images/EO logo.png";
import profilePic from "../images/profile-pic.png";


const Navbar = () => {
    const navigate = useNavigate();
    let emp_name=localStorage.getItem("emp_name").split("-")[0];
    

  const { startVideoStream, stopVideoStream, setIsVideoOn } =
    useContext(VideoContext);
  let onVideo = () => {
    setIsVideoOn(true);
    startVideoStream();
  };
  let offVideo = () => {
    stopVideoStream();
  };

  let navStyle = {
    // border:"1px solid black",
    width: "1536%",
    fontSize: "17px",
    background: "linear-gradient(to right, rgb(140, 255, 237), rgb(69, 80, 164))",
    // backgroundColor:"rgb(45 64 92)",
    marginBottom: "20px",

  };


  let logoStyle = {
    width: "60px",
    height: "50px",
    borderRadius: "50px",
    backgroundColor: "white",
  };

  

  

  return (
    // {fixed-top} -> for stick nav bar
    <div
      className="d-flex"
      style={{ width: "139%", position: "relative", left: "-213px" }}
    >
      <nav className="navbar navbar-expand-lg " style={navStyle}>
        <img style={logoStyle} src={eoLogo} alt="logo" />
        <div className="container-fluid">
          {/* <img src={payrollIcon} alt="icon" style={{width:"100px", height:"100px"}}/> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <div className="d-flex" style={{position:"relative", top:"10px", margin:"0px 15px", fontSize:"18px"}}>
                  <p>Hii, &nbsp; </p>
                  <p><b>{emp_name}</b></p>
                </div>
              </li>



              {/* <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/mainUI"
                  color="white"
                >
                  MainUI
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/adminUi"
                  color="white"
                >
                  AdminUI
                </Link>
              </li> */}
            </ul>
            

            
            <div className="form-check form-switch">
              <input
                style={{
                  margin: "5px 0px 0px -30px",
                  width: "35px",
                  height: "18px",
                }}
                className="form-check-input"
                onChange={(event) => {
                  if (event.target.checked) {
                    onVideo();
                  } else {
                    offVideo();
                  }
                }}
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
              <label
                className="form-check-label mx-3"
                htmlFor="flexSwitchCheckDefault"
                style={{ color: "white", fontSize: "17px", fontWeight:"700", fontFamily:"cursive" }}
              >
                Work Status
              </label>
            </div>
            <div>
              <Link to="/my_profile">
                <img src={profilePic} alt="profile" style={{width:"50px", height:"50px", border:"3px solid gray", borderRadius:"50px", marginLeft:"10px"}}/>
              </Link>
            </div>
            <button style={{border: "none",marginLeft: "30px",width: "100px",height: "40px",borderRadius: "15px",backgroundColor: "#bae9e9",fontWeight: "700"}} onClick={()=>{localStorage.removeItem("emp_id");localStorage.removeItem("emp_name");navigate("/mainUI")}}>
              <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
