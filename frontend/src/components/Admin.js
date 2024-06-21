import './buttonStyle.css';
import React from 'react';
import { useState } from "react";
import UsersCards from './UsersCards';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [click, setClick] = useState(false);
    const getUsers = async () => {
        try {
            const response = await fetch("https://effortlessops-backend.onrender.com/api/signup/getUsers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const val = await response.text();
            const data = JSON.parse(val);
            // console.log(data);

            const newUsers = [];
            for (let i = 0; i < data.length; i++) {
                newUsers.push(data[i].emp_id);
            }
            setUsers(data);
            console.log(newUsers);
            setClick(true)
        }
        catch (error) {
            console.error(error);
        }
    }
    let styles = {
        // border: "2px solid black",
        display : click ? "none" : "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        top: "50px",
        width: "100%",
        height: "500px",
    }
    let userStyles={
        display : click ? "" : "none",
        border:"2px solid black", 
        borderRadius:"20px",
        backgroundColor:"azure",
        padding:"5px", 
        position:"relative",
        top:"50px",
    }
    return (
        <>
            <div className="container" style={styles}>
                <div className="card text-center" style={{width:"1000px",height:"300px", borderRadius:"20px", border:"1px solid black"}}>
                    <div className="card-header" style={{backgroundColor:"rgb(2, 2, 66)", borderRadius:"20px 20px 0px 0px", color:"whitesmoke"}}>
                        Project
                    </div>
                    <div className="card-body" style={{backgroundColor:"azure"}}>
                        <h1 className="card-title mb-1">SPAYROLL</h1>
                        <h5 className="card-text">Smart Payroll System to Track your Employees</h5>
                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                        {/* <Link to="/users"> */}
                            <button className="btn mt-3 button-72" onClick={getUsers} style={{left:"380px" , width:"200px"}}>Get users</button>
                        {/* </Link> */}
                    </div>
                    <div className="card-footer" style={{backgroundColor:"rgb(2, 2, 66)", borderRadius:"0px 0px 20px 20px",color:"whitesmoke"}}>
                        Started on 13/3/2023
                    </div>
                </div>
            </div>
            <div className='container' style={userStyles} >
                <div className="container d-flex">
                    <h1 className='' style={{margin:"15px 0px 15px 20px", fontFamily: 'Alkatra', fontSize:'50px'}}>Employees</h1>
                    <button className='btn btn-primary' onClick={()=>{setClick(false)}} style={{width:"150px",height:"50px",backgroundColor:"rgb(20, 10, 66)" , color:"white" , borderRadius:"10px" , fontSize:"22px" , margin:"15px 0px 0px 660px"}}>Go Back</button>
                </div>
                {users.map((user, index) => {
                    return <div className='container my-4' key={index}>
                        <UsersCards emp_id={user.emp_id} role={"Software Developer"} name={user.name} image={user.image}/>
                    </div>
                })}
            </div>
        </>
    )
}

export default Admin
