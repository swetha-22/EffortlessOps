import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import LeaveApplicantDetails from "./LeaveApplicantDetails";

function LeaveRequest() {
  let [leaveApplications, setLeaveApplications] = useState([]);
  let [pendingApplications, setPendingApplications] = useState([]);
  let [processedApplications, setProcessedApplications] = useState([]);
  let [isPending, setIsPending] = useState(true);

  let fetchData = async () => {
    try {
      const response = await fetch(
        "https://effortlessops-backend.onrender.com/api/apply-leave/getLeaveApplications"
      );
      const data = await response.json();
      setLeaveApplications(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pendingApplications, processedApplications]);

  useEffect(() => {
    updateLeaveApplications();
  }, [leaveApplications]);

  let updateLeaveApplications = () => {
    const pending = leaveApplications.filter(
      (application) => application.leaveStatus === 0
    );
    const processed = leaveApplications.filter(
      (application) => application.leaveStatus !== 0
    );
    setPendingApplications(pending);
    setProcessedApplications(processed);
  };

  const tableStyle = {
    width: "129%",
    // background:"linear-gradient(rgb(218, 255, 253) 27%, rgb(243, 213, 255) 56%)",
    position: "relative",
    right: "126px",
    top: "7px",
    // border: "1px solid",
  };

  const mainStyle = {
    width: "100%",
    position: "relative",
    left: "10px",
    height: "auto",
    padding: "30px",
    // background: "linear-gradient(0deg, rgba(186,246,250,1) 30%, rgba(189,254,184,1) 83%)",
  };

  let userStyles = {
    border: "1px solid gray",
    borderRadius: "10px",
    padding: "5px",
    position: "relative",
    width: "1392px",
    right: "20px",
    backgroundColor: "white",
    marginTop:"10px"
  };

  return (
    <div>
      <AdminNavbar />
      <div className="d-flex" style={tableStyle}>
        <AdminSidebar />
        <div className="myComponent" style={mainStyle}>
          <div
            class="btn-group"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="btnradio1"
              autocomplete="off"
              checked={isPending ? true : false}
              onClick={() => {
                setIsPending(true);
              }}
            />
            <label class="btn btn-outline-dark" for="btnradio1" style={{
              borderRadius: "5px 0px 0px 5px"}}>
              Pending Leaves
            </label>

            <input
              type="radio"
              checked={isPending ? false : true}
              onClick={() => {
                setIsPending(false);
              }}
              class="btn-check"
              name="btnradio"
              id="btnradio2"
              autocomplete="off"
            />
            <label class="btn btn-outline-dark" for="btnradio2">
              Processed Leaves
            </label>
          </div>
          <div style={userStyles}>
            <div className="d-flex flex-row" style={{ marginTop: "12px" }}>
              <div style={{ position: "relative", left: "29px" }}>
                <h5>Employee</h5>
              </div>
              <div style={{ position: "relative", left: "107px" }}>
                <h5>Emp-Id</h5>
              </div>
              <div style={{ position: "relative", left: "213px" }}>
                <h5>Start Date</h5>
              </div>
              <div style={{ position: "relative", left: "295px" }}>
                <h5>End Date</h5>
              </div>
              <div style={{ position: "relative", left: "369px" }}>
                <h5>Applied on</h5>
              </div>
              <div style={{ position: "relative", left: "430px" }}>
                <h5>Leave Type</h5>
              </div>
              <div style={{ position: "relative", left: "520px" }}>
                <h5>Reason</h5>
              </div>
              <div style={{ position: "relative", left: "657px" }}>
                <h5>Status</h5>
              </div>
            </div>
            <hr />
            {isPending
              ? pendingApplications.map((user, index) => {
                  return (
                    <div className="my-3" key={index}>
                      <LeaveApplicantDetails
                        empName={user.empName}
                        empId={user.empId}
                        leaveType={user.leaveType}
                        start={user.start}
                        end={user.end}
                        reason={user.reason}
                        updateLeaveApplications={updateLeaveApplications}
                        leaveId={user._id}
                        leaveStatus={user.leaveStatus}
                        submission_date={user.submissionDate}
                        leaveApplications={leaveApplications}
                        setPendingApplications={setPendingApplications}
                      />
                    </div>
                  );
                })
              : processedApplications.map((user, index) => {
                  return (
                    <div className="my-3" key={index}>
                      <LeaveApplicantDetails
                        empName={user.empName}
                        empId={user.empId}
                        leaveType={user.leaveType}
                        start={user.start}
                        end={user.end}
                        reason={user.reason}
                        updateLeaveApplications={updateLeaveApplications}
                        leaveId={user._id}
                        leaveStatus={user.leaveStatus}
                        submission_date={user.submissionDate}
                      />
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveRequest;
