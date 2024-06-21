import React ,{useContext} from 'react'
import VideoContext from "../context/VideoContext";

const UserTracking = (props) => {
    let { imageUrl, time, threshold, date } = props;
    let borderColor;
    
    let {thresholdCalc, setThresholdCalc}=useContext(VideoContext);

    if(thresholdCalc===1){
        if (threshold >= 70) {
          borderColor = 'green';
        } else if (threshold > 50) {
          borderColor = 'yellow';
        } else {
          borderColor = 'red';
        }
        setThresholdCalc(0);
    }

    let styles={
        width:"260px",
        height:"270px",
        border:`3px solid ${borderColor}`,
        boxShadow: "0px 0px 4px grey",
        borderRadius:"10px",
    }

    return (
        <>
        <div className='container mx-3 mb-5'>
            <div className="card" style={styles}>
                <img src={imageUrl} className="card-img-top" alt="..." style={{width:"255px",borderRadius:"10px 10px 0px 0px", height:"165px", position:'relative'}} />
                <div className="card-body" style={{height:"0px", borderRadius:"0px 0px 10px 10px", backgroundColor:"rgb(242 238 246)", fontFamily:"sans-serif"}}>
                    <h6 className="card-text"><i class="fa-regular fa-clock"></i> &nbsp; Time : {time}</h6>
                    <h6 className="card-text"><i class="fa-regular fa-calendar"></i> &nbsp; Date : {date}</h6>
                    <h6 className="card-text"><i class="fa-solid fa-gear"></i> &nbsp; Accuracy : {threshold}</h6>
                </div>
            </div>
        </div>
        </>
    )
}

export default UserTracking
