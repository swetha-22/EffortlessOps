import React from 'react'
import loadGif from "../images/loadingGif.gif"

const SkeletonLoad = () => {
    let gifStyle={
        width:"270px",
        height:"290px",
        borderRadius:"10px",
        margin:"40px"
    }
  return (
    <div style={{position:'relative', right:"20px"}}>
      <div className='d-flex'>
        <img src={loadGif} alt="load" style={gifStyle}/>
        {/* <img src={loadGif} alt="load" style={gifStyle}/>
        <img src={loadGif} alt="load" style={gifStyle}/>
        <img src={loadGif} alt="load" style={gifStyle}/> */}
      </div>
    </div>
  )
}

export default SkeletonLoad