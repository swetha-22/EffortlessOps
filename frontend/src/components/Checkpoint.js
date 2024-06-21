import React, {useEffect, useState} from 'react'
import badge1 from "../images/task-1.png"
import badge2 from "../images/task-2.png"
import badge3 from "../images/task-3.png"
import badge4 from "../images/task-4.png"
import badge5 from "../images/task-5.png"
import deleteIcon from "../images/delete-icon-removebg-preview.png"

const Checkpoint = (props) => {

    const {role, member, start_date, dead_line, id, coll_name, checkpoints, setCheckpoints, index, length} = props;

    let subTaskStyle={
        border: "1px solid",
        width: "700px",
        height: "150px",
        position: "relative",
        left: "45px",
    }

    let badgeImgStyle={
        width: "90px",
        height: "115px",
        position: "relative",
        top: "15px",
        left: "122px",
    }

    let matterStyle={
        border:"1px solid gray",
        width: "auto",
        position: "relative",
        left: "260px",
        top:"15px",
        padding: "10px 40px 5px 40px",
        // backgroundColor: "rgb(241, 243, 243)",
        borderRadius:"10px"
    }

    let lineStyle={
        width: "10px",
        height: "115px",
        backgroundColor: "#beb9b9",
        borderRadius: "60px",
        position: "relative",
        left: "160px",
        top: "-7px",
        zIndex: "-1",
        marginBottom:"-40px",
        display: length-1==index ? 'none' : 'block'
    }

    let deleteIconStyle={
        width: "2px",
        height: "2px",
        border: "none",
        backgroundColor:"white",
        position:"relative", 
        top:"60px",
        right:'-340px',
        display: props.user==="user"?"none":"block"
    }

    const [badgeImg, setBadgeImg] = useState(null);

  // useEffect to set the badgeImg based on the index
  useEffect(() => {
    if (index % 5 === 0) {
      setBadgeImg(badge1);
    } else if (index % 5 === 1) {
      setBadgeImg(badge2);
    } else if (index % 5 === 2) {
      setBadgeImg(badge3);
    } else if (index % 5 === 3) {
      setBadgeImg(badge4);
    } else if (index % 5 === 4) {
      setBadgeImg(badge5);
    }
  }, [index]);

    let handleDelete = async ()=>{
        try {
            console.log(id);
            const response = await fetch(`https://effortlessops-backend.onrender.com/api/checkpoints/deleteCheckpoint/${id.toString()}`, {
              method: 'DELETE',
              headers: {
                'Content-Type' : 'application/json',
                'coll_name' : coll_name.toString(),
              },
            });
            if (response.ok) {
              const updatedCheckpoints= checkpoints.filter((e) => e._id !== id);
              setCheckpoints(updatedCheckpoints);
            } 
            else {
              console.error('Error deleting event:', response.statusText);
            }
          } 
          catch (error) {
            console.error('Error deleting event:', error);
          }
    }

  return (
    <>
        <div style={{subTaskStyle}} className='d-flex flex-row'>
            <img src={badgeImg} alt="chechpoint" style={badgeImgStyle}/>
            <div style={matterStyle}>
                <div className='d-flex flex-row'>
                <h6>Role  &nbsp;  &nbsp;  &nbsp;  &nbsp; : </h6>
                <h6 className='ml-3'>{role}</h6>
                </div>
                <div className='d-flex flex-row'>
                <h6>Member  &nbsp; : </h6>
                <h6 className='ml-3'>{member}</h6>
                </div>
                <div className='d-flex flex-row'>
                <h6>Start  &nbsp;  &nbsp;  &nbsp;  &nbsp;  : </h6>
                <h6 className='ml-3'>{start_date}</h6>
                </div>
                <div className='d-flex flex-row'>
                <h6>Deadline &nbsp; :</h6>
                <h6 className='ml-3'>{dead_line}</h6>
                </div>
            </div>
            <button style={deleteIconStyle} onClick={handleDelete}>
                <img style={{width:"25px", height:"25px"}} src={deleteIcon} alt="delete btn" />
            </button>
        </div>
        <div style={lineStyle}>
        </div>
    </>
  )
}

export default Checkpoint
