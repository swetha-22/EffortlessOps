import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import leave1 from "../images/leaveOne-removebg-preview.png"
import leave2 from "../images/leaveTwo-removebg-preview.png"
import leave3 from "../images/leaveThree-removebg-preview.png"

const EmployeeLeaves = () => {
    let [leaveApplications, setLeaveApplications] = useState([]);
    let [totalLeaves, setTotalLeaves] = useState(20);
    let [approvedLeaves, setApprovedLeaves] = useState(0);
    let [remainingLeaves, setRemainingLeaves] = useState(20);

    let [counterOne, setCounterOne] = useState(0);
    let [counterTwo, setCounterTwo] = useState(0);
    let [counterThree, setCounterThree] = useState(0);

    function counterOneFun(start, end, duration) {
        let current = start;
        let range = end - start;
        let step = Math.abs(Math.floor(duration / range));
        let timer = setInterval(() => {
            current += 1;
            setCounterOne(current);
            if (current == end) {
                clearInterval(timer);
            }
        }, step);
    }
    function counterTwoFun(start, end, duration) {
        let current = start;
        let range = end - start;
        let step = Math.abs(Math.floor(duration / range));
        if(end==0)
            return;
        let timer = setInterval(() => {
            current += 1;
            setCounterTwo(current);
            if (current == end) {
                clearInterval(timer);
            }
        }, step);
    }
    function counterThreeFun(start, end, duration) {
        let current = start;
        let range = end - start;
        let step = Math.abs(Math.floor(duration / range));
        console.log(start+' '+end);
        if(start==end)
            return;
        let timer = setInterval(() => {
            current -= 1;
            setCounterThree(current);
            if (current == end) {
                clearInterval(timer);
            }
        }, step);
    }

    let fetchData = async () => {
        try {
            const response = await fetch(
                "https://effortlessops-backend.onrender.com/api/apply-leave/getSpecificEmployeeLeaveApplications", {
                    method: "GET",
                    headers: {
                        "emp_id": localStorage.getItem("emp_id"),
                    }
                }
            );
            const data = await response.json();
            setLeaveApplications(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Calculate the count of approved leaves
        const countApprovedLeaves = leaveApplications.filter(application => application.leaveStatus === 1).length;
        setApprovedLeaves(countApprovedLeaves);
        setRemainingLeaves(totalLeaves-approvedLeaves);
    }, [leaveApplications]);


    useEffect(() => {
        // console.log(totalLeaves, approvedLeaves, remainingLeaves);
        counterOneFun(0, totalLeaves, 2000);
        counterTwoFun(0, approvedLeaves, 2000);
        counterThreeFun(totalLeaves, remainingLeaves, 2000);

    }, [remainingLeaves]);

    


    const tableStyle = {
        width: "129%",
        position: "relative",
        right: "126px",
        top: "7px",
    };

    let userStyles = {
        border: "1px solid gray",
        borderRadius: "10px",
        padding: "5px",
        position: "relative",
        width: "1392px",
        right: "-100px",
        backgroundColor: "white",
        marginTop: "10px"
    };

    let lineStyle = {
        color: "gray",
        width: "97%",
        position: "relative",
        left: "15px",
        margin: "22px 0px -10px 0px",
        height: "0px",
    }

    const mainStyle = {
        width: "100%",
        position: "relative",
        left: "10px",
        height: "auto",
        padding: "30px",
    };

    return (
        <div>
            <Navbar />
            <div className="d-flex" style={tableStyle}>
                <div className="d-flex" style={{ width: "131%", position: "relative", right: "124px" }}>
                    <Sidebar />
                    <div style={mainStyle}>
                        <div className="d-flex" style={{position:"relative", width:"80%", height:"250px", backgroundColor:"#323335", left:"175px", margin:"0px 50px 50px 50px", borderRadius:"10px"}}>
                            <h2 style={{color:'white', position:"absolute", top:'20px', left:"25px"}}>Leave Balance</h2>
                            <div className="d-flex" style={{width:"30%", position:"relative", left:"20px"}}>
                                <div style={{position:'relative', left:"60px", top:"96px", borderRadius:"100px", width:"125px", height:"125px", backgroundColor:"#e1e5e6"}}>
                                    <img src={leave1} alt="" style={{width:"85px", height:"85px", position:"relative", left:"25px", top:"15px"}} />
                                </div>
                                <h3 style={{color:"white", position:"relative", left:"110px", top:"129px"}}>
                                    {counterOne}
                                    <br />
                                    <div style={{fontSize:"18px", position:"relative", top:"14px", right:"23px"}}>Total Leaves</div>
                                </h3>
                            </div>
                            <div className="d-flex" style={{width:"30%", position:"relative", left:"20px"}}>
                                <div style={{position:'relative', left:"60px", top:"96px", borderRadius:"100px", width:"125px", height:"125px", backgroundColor:"#e1e5e6"}}>
                                    <img src={leave2} alt="" style={{width:"85px", height:"85px", position:"relative", left:"25px", top:"20px"}} />
                                </div>
                                <h3 style={{color:"white", position:"relative", left:"140px", top:"129px"}}>
                                    {counterTwo}
                                    <br />
                                    <div style={{fontSize:"18px", position:"relative", top:"14px", right:"53px"}}>Approved Leaves</div>
                                </h3>
                            </div>
                            <div className="d-flex" style={{width:"30%", position:"relative", left:"20px"}}>
                                <div style={{position:'relative', left:"60px", top:"96px", borderRadius:"100px", width:"125px", height:"125px", backgroundColor:"#e1e5e6"}}>
                                    <img src={leave3} alt="" style={{width:"80px", height:"80px", position:"relative", left:"22px", top:"22px"}} />
                                </div>
                                <h3 style={{color:"white", position:"relative", left:"130px", top:"129px"}}>
                                    {counterThree}
                                    <br />
                                    <div style={{fontSize:"18px", position:"relative", top:"14px", right:"43px"}}>Remaining Leaves</div>
                                </h3>
                            </div>
                        </div>
                        <h2 style={{ position: "relative", left: "110px" }}>Leave History</h2>
                        <br />
                        <div style={userStyles}>
                            <div className="d-flex flex-row" style={{ marginTop: "12px" }}>
                                <div style={{ position: "relative", left: "29px" }}>
                                    <h5>Employee</h5>
                                </div>
                                <div style={{ position: "relative", left: "107px" }}>
                                    <h5>Emp-Id</h5>
                                </div>
                                <div style={{ position: "relative", left: "178px" }}>
                                    <h5>Start Date</h5>
                                </div>
                                <div style={{ position: "relative", left: "236px" }}>
                                    <h5>End Date</h5>
                                </div>
                                <div style={{ position: "relative", left: "307px" }}>
                                    <h5>Applied on</h5>
                                </div>
                                <div style={{ position: "relative", left: "355px" }}>
                                    <h5>Leave Type</h5>
                                </div>
                                <div style={{ position: "relative", left: "475px" }}>
                                    <h5>Reason</h5>
                                </div>
                                <div style={{ position: "relative", left: "640px" }}>
                                    <h5>Status</h5>
                                </div>
                            </div>
                            <hr />
                            {leaveApplications.map((user, index) => {
                                return (
                                    <div className="my-3" key={index}>
                                        <div className='d-flex flex-row' style={{ fontSize: '17px', fontWeight: "400" }}>
                                            <div style={{ width: "150px", textAlign: "center" }}>
                                                {user.empName}
                                            </div>
                                            <div style={{ width: "150px", textAlign: "center" }}>
                                                {user.empId}
                                            </div>
                                            <div style={{ width: "150px", textAlign: "center" }}>
                                                {user.start}
                                            </div>
                                            <div style={{ width: "150px", textAlign: "center" }}>
                                                {user.end}
                                            </div>
                                            <div style={{ width: "170px", textAlign: "center" }}>
                                                {user.submissionDate}
                                            </div>
                                            <div style={{ width: "120px", textAlign: "center" }}>
                                                {user.leaveType}
                                            </div>
                                            <div style={{ width: "300px", textAlign: "center" }}>
                                                {user.reason}
                                            </div>
                                            <div style={{ width: "150px", textAlign: "center" }}>
                                                {(user.leaveStatus === 0 ? "Pending" : (user.leaveStatus === 1 ? "Approved" : "Rejected"))}
                                            </div>
                                        </div>
                                        <hr style={lineStyle} />
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeLeaves
