import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import './ButtonGroup.css';
//Images import
import Admin from '../images/Admin.png';
import Arrow from '../images/arrow-removebg-preview.png';
import ExistingUser from '../images/ExistingUser2.png';
import NewUser from '../images/NewUser.png';
import VideoContext from "../context/VideoContext";
import { useNavigate } from "react-router-dom";
import Logo from '../images/EO logo.png';
// import videoSrc from '../images/UIPerson-unscreen.gif';

const MainButtons= () => {
    let {setIsAdmin}=useContext(VideoContext);
    const navigate = useNavigate();

    let LogoStyle={
        width: "150px",
        height: "150px",
        position: "relative",
        top: "88px",
        right: "-80px",
    }
    // let VideoStyle={
    //     width: "120px",
    //     height: "200px",
    //     position: "absolute",
    //     top: "50px",
    //     right: "235px",
    // }
    let LogoTextStyle={
        fontSize: "120px",
        position: "relative",
        top: "-62px",
        left: "260px",
        color: "#041e56",
        fontFamily: "fangsong",
        fontWeight: "600",
    }

    return (
        <>
        <img style={LogoStyle} src={Logo} alt="logo" />
        {/* <img style={VideoStyle} src={videoSrc} alt="video" /> */}
        {/* <img style={LogoTextStyle} src={LogoText} alt="logo" /> */}
        <h1 style={LogoTextStyle}>EffortlessOps</h1>
        <div className="container box">
            <label className='role'><h1 style={{fontSize:"45px"}}>Select your role to Login</h1></label>
            <div className="button-group-container">
                {/* <Link to={{ pathname: '/login'}} onClick={setIsAdmin(true)}> */}
                    <button className="button-group-item" onClick={()=>{setIsAdmin(true);navigate('/login');}}>
                        <img src={Admin} alt="hey" />
                        <span>Admin</span>
                    </button>
                {/* </Link> */}
                <img src={Arrow} alt="" id='arrow'/>
                {/* <Link to={{ pathname: '/login'}} onClick={setIsAdmin(false)}> */}
                    <button className="button-group-item" onClick={()=>{setIsAdmin(false);navigate('/login');}}>
                        <img src={ExistingUser} alt="existing user" />
                        <span>Existing User</span>
                    </button>
                {/* </Link> */}
                <img src={Arrow} alt="" id='arrow'/>
                <Link to="/signup">
                    <button className="button-group-item">
                        <img src={NewUser} alt="new user" />
                        <span>New User</span>
                    </button>
                </Link>
            </div>
        </div>
        </>
    );
};

export default MainButtons;
