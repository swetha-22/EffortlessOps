import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import UsersCards from './UsersCards';
import './buttonStyle.css';

function SelfieApp() {

  useEffect(() => {
    getUsers();
  }, []);

  

  const [users, setUsers] = useState([]);
    const getUsers = async () => {
        try {
            const response = await fetch("https://effortlessops-backend.onrender.com/api/signup/getUsers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'emp_id':localStorage.getItem("emp_id")
                },
            });
            const val = await response.text();
            const data = JSON.parse(val);
            const filteredData=data.filter((ele) => ele.IsAdmin === false);
            setUsers(filteredData);
        }
        catch (error) {
            console.error(error);
        }
    }
  

    let mainStyle = {
        width: "82%",
        height:"auto",
        left:"50px",
        position: "relative",
        marginBottom:"90px",
    }

    let userStyles={
        border:"1px solid gray", 
        borderRadius:"10px",
        padding:"5px", 
        position:"relative",
        top:"50px",
        backgroundColor:"white",
    }


  return (
    <div>
        <AdminNavbar/>
        <div className="d-flex" style={{width:"120%"}}>
            <AdminSidebar/>
            <div className='myComponent' style={mainStyle}>
                <div style={userStyles} >
                    <div className="d-flex flex-row" style={{marginTop:"12px"}}>
                        <div style={{position:"relative", left:"50px"}}>
                            <h5>Employee</h5>
                        </div>
                        <div style={{position:"relative", left:"230px"}}>
                            <h5>E-  Id</h5>
                        </div>
                        <div style={{position:"relative", left:"430px"}}>
                            <h5>Role</h5>
                        </div>
                        <div style={{position:"relative", left:"600px"}}>
                            <h5>Task Status</h5>
                        </div>
                    </div>
                    <hr />
                    {users.map((user, index) => {
                        return <div className='my-3' key={index}>
                            <UsersCards emp_id={user.emp_id} role={"Software Developer"} name={user.name} image={user.image} status={"Done"}/>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
  );
}
export default SelfieApp;


