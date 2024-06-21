import React from 'react';
import { useNavigate } from 'react-router-dom';
import './buttonStyle.css';
import './ImgCol.css';

const UsersCards = (props) => {
    let navigate = useNavigate();

    const handleTrack = () => {
        navigate("/track-users", {
            state: {
                emp_id: props.emp_id,
            },
        });
    };

    let lineStyle = {
        color: "gray",
        width: "97%",
        position: "relative",
        left: "15px",
        margin: "22px 0px -10px 0px",
        height: "0px",
    };

    let statusBar = {
        width: "65px",
        display: "flex",
        justifyContent: "center",
        paddingTop: "0px",
        borderRadius: "5px",
        background: "linear-gradient(to right, #84d9d2, #07cdae)",
        color: "white"
    };

    return (
        <div>
            <div className='d-flex flex-row' style={{ fontSize: '17px', fontWeight: "400" }}>
                <div style={{ position: "relative", left: "40px", top: "10px" }}>
                    {/* Display the image using img tag with src attribute set to the Base64 encoded image data */}
                    <img src={props.image} alt="" style={{ width: "50px", height: "50px", borderRadius: "50px" }} />
                </div>
                <div style={{ position: "relative", left: "60px", top: "20px", width: "150px" }}>
                    {props.name}
                </div>
                <div style={{ position: "relative", left: "95px", top: "20px", width: "150px" }}>
                    {props.emp_id}
                </div>
                <div style={{ position: "relative", left: "170px", top: "20px", width: "165px" }}>
                    {props.role}
                </div>
                <div style={{ position: "relative", left: "260px", top: "20px", width: "150px" }}>
                    <div style={statusBar}>
                        {props.status}
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary" style={{ position: "relative", top: "18px", left: "290px", height: "30px", paddingTop: "2px" }} onClick={handleTrack}>Track</button>
                </div>
            </div>
            <hr style={lineStyle} />
        </div>
    );
};

export default UsersCards;
