import React, { useEffect, useState , useContext } from 'react';
import UserTracking from './UserTracking';
import { useLocation } from "react-router-dom";
import VideoContext from "../context/VideoContext";
import './ImgCol.css';

const ImgCollection = (props) => {
  const location = useLocation();
  // let emp_id= localStorage.getItem('emp_id');
  const [images, setImages] = useState([]);
  const getImages = async () => {
    try {
      const response = await fetch("https://effortlessops-backend.onrender.com/api/signup/getImage", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "emp_id": emp_id,
          "emp_id": location.state.emp_id,
        },
      });

      const val = await response.text();
      const data = JSON.parse(val);
      // console.log(data);

      const newImages = [];
      for (let i = 0; i < data.length; i++) {
        newImages.push(data[i].image);
      }

      setImages(newImages);
      setImages(data);
      console.log(images);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    getImages();
  },[])

  let myStyle={
    border:"2px solid rgb(3, 3, 73)",
    marginTop:"100px",
    backgroundColor:"azure",
    borderRadius:"20px",
    width:"1180px"
  }

  let {setThresholdCalc}=useContext(VideoContext);
  
  let handleAnalyse=()=>{
    setThresholdCalc(1);
  }

  let analyseStyle={
    position:"absolute",
    top:"115px",
    left:"1230px",
    // backgroundColor:"rgb(3, 3, 73)",
    // color:"white",
    // boxShadow: "0px 0px 5px orange",
    borderRadius:"10px 10px 0px 0px",
    fontSize:"24px",
  }
  return (
    <>
    <button className="myButton third" onClick={handleAnalyse} style={analyseStyle}>Analyse</button>
    <div className='row py-5' style={myStyle}>
        {images.map((data, index) => {
            // <img src={`${image}`} key={index} alt="" />
            return <div className="col-md-4" key={index}>
                        <UserTracking imageUrl={data.image} name={"abhi"} time={"12:00"} threshold={data.accuracy}/>
                    </div>
        })}
    </div>
    </>
  )
}

export default ImgCollection;
