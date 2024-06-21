import React from 'react';

const LeaveApplicantDetails = (props) => {
    const updateLeaveStatus = async () => {
        console.log(props.leaveId)
        try {
            const response = await fetch(`https://effortlessops-backend.onrender.com/api/apply-leave/updateLeaveStatus/${props.leaveId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ leaveStatus: 1 }),
            });
    
            if (response.ok) {
                console.log('Leave status updated successfully');
            } else {
                console.error('Failed to update leave status');
            }
            props.updateLeaveApplications();
        } catch (error) {
            console.error('Error updating leave status:', error);
        }
    };

    let statusBar={
        width: "90px",
        display: "flex",
        justifyContent: "center",
        paddingTop: "0px",
        borderRadius: "5px",
        backgroundColor: props.leaveStatus === 1 ? "rgb(6 192 162)" : "rgb(203 15 3)",
        color:"white",
        height:"30px"
    }

    return (
        <div>
            <div className='d-flex flex-row' style={{ fontSize: '17px', fontWeight: "400" }}>
                <div style={{ width: "150px", textAlign: "center"}}>
                    {props.empName}
                </div>
                <div style={{ width: "150px", textAlign: "center"}}>
                    {props.empId}
                </div>
                <div style={{ width: "150px", textAlign: "center", position:"relative", left:"38px" }}>
                    {props.start}
                </div>
                <div style={{ width: "150px", textAlign: "center", position:"relative", left:"55px" }}>
                    {props.end}
                </div>
                <div style={{ width: "165px", textAlign: "center", position:"relative", left:"65px" }}>
                    {props.submission_date}
                </div>
                <div style={{ width: "150px", textAlign: "center", position:"relative", left:"62px" }}>
                    {props.leaveType}
                </div>
                <div style={{ width: "190px", textAlign: "center", position:"relative", left:"65px" }}>
                    {props.reason}
                </div>
                {(props.leaveStatus === 0) ?
                    (
                        <div style={{ width: "250px", textAlign: "center", position:"relative", left:"50px" }}>
                            <div className="dflex flex-row">
                                <button className='btn btn-success' style={{ marginRight: "10px", width: "80px", padding: "4px 4px 6px 3px" }} onClick={() => { updateLeaveStatus(1) }}>
                                    Approve
                                </button>
                                <button className='btn btn-danger' style={{ width: "80px", padding: "4px 4px 6px 3px" }} onClick={() => { updateLeaveStatus(2) }}>
                                    Reject
                                </button>
                            </div>
                        </div>
                    ) :
                    (
                        <div style={{ width: "150px", textAlign: "center", position:"relative", left:"130px" }}>
                            <div style={statusBar}>
                                {(props.leaveStatus === 1 ? "Approved" : "Rejected")}
                            </div>
                        </div>
                    )
                }
            </div>
            <hr />
        </div>
    )
}

export default LeaveApplicantDetails;
