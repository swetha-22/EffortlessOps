import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Progress = ({ percentage, maxPercentage }) => {
  const limitedPercentage = Math.min(percentage, maxPercentage);

  return (
    <>
      <h4 style={{margin:"14px 0px 20px 14px"}}>Work Status 📋</h4>
      <div style={{ width: '140px', margin: 'auto' }}>
        <CircularProgressbarWithChildren
          value={limitedPercentage}
          strokeWidth={12}
          styles={{
            path: { stroke: `rgba(62, 152, 199, ${limitedPercentage / 100})` },
            trail: { stroke: '#d6d6d6' },
          }}
        >
          <div style={{ fontSize: '18px', color: '#3498db' }}>{`${limitedPercentage}%`}</div>
        </CircularProgressbarWithChildren>
      </div>
      <div className='d-flex flex-row'>
        <div className='d-flex flex-column' style={{margin:"15px"}}>
          <h3 style={{marginLeft:"20px"}}>✅</h3>
          <p style={{width:"100px", fontWeight:"500"}}>Tasks Done</p>
          <h5 style={{position: "relative", top: "-16px", left: "30px", fontWeight: "400",}}>18</h5>
        </div>
        <div className='d-flex flex-column' style={{margin:"15px 0px 15px 0px"}}>
          <h3 style={{marginLeft:"20px"}}>⌛</h3>
          <p style={{width:"100px", fontWeight:"500"}}>Tasks Left</p>
          <h5 style={{position: "relative", top: "-16px", left: "30px", fontWeight: "400",}}>24</h5>
        </div>
        <div className='d-flex flex-column' style={{margin:"15px 0px"}}>
          <h3 style={{marginLeft:"20px"}}>⏰</h3>
          <p style={{width:"115px", fontWeight:"500"}}>Hours Worked</p>
          <h5 style={{position: "relative", top: "-16px", left: "35px", fontWeight: "400",}}>9</h5>
        </div>
        
      </div>
    </>
  );
};

export default Progress;
