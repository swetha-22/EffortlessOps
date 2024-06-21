import React, { useEffect, useState , useContext } from 'react';
import UserTracking from './UserTracking';
import { useLocation } from "react-router-dom";
import VideoContext from "../context/VideoContext";
import SkeletonLoad from './SkeletonLoad';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
const TrackUsers = () => {
  const location = useLocation();
  // let emp_id= localStorage.getItem('emp_id');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getImages = async () => {
    try {
        console.log(location.state.emp_id);
        const response = await fetch("https://effortlessops-backend.onrender.com/api/signup/getImage", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "emp_id": location.state.emp_id,
            },
        });
        const val = await response.text();
        const data = JSON.parse(val);
        const newImages = [];
        for (let i = 0; i < data.length; i++) {
            newImages.push(data[i].image);
        }
        // setImages(newImages);
        setImages(data);
        // console.log(images);
        } 
        catch (error) {
            console.error(error);
        }
    };

    let {setThresholdCalc}=useContext(VideoContext);
    let handleAnalyse=()=>{
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 4000);
        setThresholdCalc(1);
    }
    let analyseStyle={
        position:"relative",
        top:"22px",
        left:'1150px',
        width:"100px"
    }

    const mainStyle = {
        width: "100%",
        position: "relative",
        // border: "1px solid",
        left: "10px",
        height:"auto",
        // background: "linear-gradient(0deg, rgba(237,209,251,1) 29%, rgba(255,255,226,1) 83%)",
    };

    useEffect(()=>{
        getImages();
    },[])

    return (
    <>
        <AdminNavbar />
        <div className="d-flex" style={{width:"120%", position:"relative", left:"-65px"}}>
            <AdminSidebar />
            <div style={mainStyle}>
                {images.length!==0?
                <>
                <h4 style={{position: "absolute",top: "20px",left: "40px",color: "#554d55",}}>
                    Track your employees here...
                </h4>
                <button className='btn btn-success' onClick={handleAnalyse} style={analyseStyle}>
                    {/* <img src={analyseImg} style={{width: "100px",height: "73px",position: "absolute", top: "-20px",right: "-20px",borderRadius: "12px",}} alt="" /> */}
                    <div style={{fontSize:"18px", fontWeight:600}}>Analyse</div>
                </button>
                </>: <div></div>}
                
                <div className='row py-5' style={{marginTop:"5px", padding:"10px", paddingRight:"20px"}}>
                    {images.length===0 ? 
                            <>
                                <i class="fa-solid fa-triangle-exclamation" style={{position: "relative",left: "450px",top: "20px",fontSize: "350px",color: "rgb(199 198 194)",}}></i> 
                                <h3 style={{position:"relative",fontWeight:"800", left:"508px", top:"10px", color:'rgb(242 130 86)'}}>
                                    Entries not found
                                </h3>
                            </>
                            : 
                            images.map((data, index) => { return <div className="col-md-3" key={index}>
                                    {isLoading===true ? 
                                        <SkeletonLoad/> 
                                        :
                                    <UserTracking imageUrl={data.image} date={data.date} time={data.time} threshold={data.accuracy}/>}
                                </div>
                    })}
                </div>
            </div>
        </div>
    </>
    )
}

export default TrackUsers;
