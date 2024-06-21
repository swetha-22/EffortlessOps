import React, { useId, useState } from "react";
import { useEffect } from "react";

const Conversation = ({ data, currentUser,online}) => {
    const [userData, setUserData] = useState({})

    const userId = data.members.find((id)=>id!==currentUser)
    useEffect(()=> {

        const getUserData = async ()=> {
          try {
            // console.log(userId);
            const response = await fetch("https://effortlessops-backend.onrender.com/api/profile-data/getUser",{
                  method: "GET",
                  headers: {
                      "emp_id": userId,
                  }
                }
              );
              const data = await response.json();
              // console.log(data);
              setUserData(data);
          }
          catch(error)
          {
            console.log(error)
          }
        
        };
        getUserData();
      }, [])
      return (
        <>
          <div className="follower conversation">
            {/* {online && <div className="online-dot"></div>} */}
              {/* profile image */}
              <div className="d-flex">
                <img src={userData[0]?.image} style={{width:"40px", height:"40px", borderRadius:"50px"}} alt="" />
                <div className="name" style={{fontSize: "19px",position: "relative",left: "10px",top: "5px",fontWeight: "500",}}>
                  <span>
                    {userData[0]?.name}
                  </span>
                </div>
                <div style={{backgroundColor: online?"#51e200":"red", marginLeft:"15px" ,width:'10px', height:"10px", borderRadius:"50px"}}></div>
              </div>
            </div>
          <hr style={{ border: "0.1px solid #ececec", marginTop:"0px" }} />
        </>
      );
}

export default Conversation;
