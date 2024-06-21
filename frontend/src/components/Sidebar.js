import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css'; 
import Elogo from "../images/bars_icon-removebg-preview.png"
import { useState } from 'react';

const Sidebar = () => {

  const location = useLocation();

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    paddingTop: '16px',
    marginBottom: '10px',
    marginLeft: '4px',
    marginRight:"10px",
    borderRadius: '20px',
    fontSize:"17px",
    width: "170px",
    height: "33px",
  };

  let iconStyle = {
    position: "absolute",
    width: "177px",
    height: "60px",
    zIndex: "1",
    left: "10px",
  };

  const activeLinkStyle = {
    backgroundColor: '#eef3fb',
    color: 'black',
  };

  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [reason, setReason] = useState();
  const [leaveType, setLeaveType] = useState();

  const handleLeaveSubmit = () => {

    fetch('https://effortlessops-backend.onrender.com/api/apply-leave/submitLeave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "emp_id":  localStorage.getItem("emp_id"),
        "emp_name":  localStorage.getItem("emp_name")
      },
      body: JSON.stringify({ start, end, leaveType, reason }),
    })
    .then(data => {
        setStart('');
        setEnd('');
        setLeaveType('');
        setReason('');
    })
  };

  return (
    <>
    {/* <i class="fa fa-tachometer" aria-hidden="true"></i> */}
      <div className="sidebar">
        <h4 className="m-3 side-heading" style={{color:'white'}}>Effortless-Ops</h4>
        <img className='logo' src={Elogo} alt="elogo" />
        {/* <i class="fa-solid fa-earth-americas"></i> */}
        <hr />

        <div className="d-flex flex-row align-items-center mb-2">
          <Link
            className="link"
            style={{ ...linkStyle, ...(isLinkActive('/employeeUI') && activeLinkStyle) }}
            to="/employeeUI" 
          >
            <div className='d-flex flex-row'>
              <i className="fas fa-user fa-lg me-3 fa-fw mb-2 mx-3" />
              <div className="side-elements">Home</div>
            </div>
          </Link>
        </div>

        <div className="d-flex flex-row align-items-center mb-2">
          <Link
            className="link"
            style={{ ...linkStyle, ...(isLinkActive('/chat') && activeLinkStyle) }}
            to="/chat" 
          >
            <div className='d-flex flex-row'>
              <i className="fas fa-comment fa-lg me-3 fa-fw mb-2 mx-3" />
              <div className="side-elements">Chat</div>
            </div>
          </Link>
        </div>

        <div className="d-flex flex-row align-items-center mb-2">
          <Link
            className="link"
            style={{ ...linkStyle, ...(isLinkActive('/videoCall') && activeLinkStyle) }}
            to="/videoCall" 
          >
            <div className='d-flex flex-row'>
              <i className="fas fa-video-camera fa-lg me-3 fa-fw mb-2 mx-3" />
              <div className="side-elements">Video Call</div>
            </div>
          </Link>
        </div>

        <div className="d-flex flex-row align-items-center mb-2">
          <Link
            className="link"
            style={{ ...linkStyle, ...(isLinkActive('/payroll') && activeLinkStyle) }}
            to="/payroll" 
          >
            <div className='d-flex flex-row'>
              <i className="fa fa-paypal fa-lg me-3 fa-fw mb-2 mx-3" aria-hidden="true"/>
              <div className="side-elements">Payroll</div>
            </div>
          </Link>
        </div>

        <div className="d-flex flex-row align-items-center mb-2">
          <Link
            className="link"
            style={{ ...linkStyle, ...(isLinkActive('/attendance') && activeLinkStyle) }}
            to="/attendance" 
          >
            <div className='d-flex flex-row'>
              <i className="fa fa-calendar-check fa-lg me-3 fa-fw mb-2 mx-3"/>

              <div className="side-elements">Attendance</div>
            </div>
          </Link>
        </div>

        <div className="d-flex flex-row align-items-center mb-2">
          <Link
            className="link"
            style={{ ...linkStyle, ...(isLinkActive('/admin_emp_track') && activeLinkStyle) }}
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <div className='d-flex flex-row'>
              <i style={{fontSize:"26px"}} className="fa-solid fa-person-walking-arrow-right fa-lg me-3 fa-fw mb-2 mx-3"/>
              {/* <i class="fa-solid fa-person-walking-arrow-right"></i> */}
              <div className="side-elements">Request Leave</div>
            </div>
          </Link>
        </div>

      <div>
          <div
            style={{backgroundColor:"rgb(231 244 241)"}}
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-header">
              <h4 id="offcanvasRightLabel" style={{color:"black", marginBottom:"5px", marginTop:"8px"}}>Apply for a Leave</h4>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              {/* start */}
              <div className="dflex">
                <div style={{color:"black", marginBottom:"5px"}}>Start Date</div>
                <div className="form-outline flex-fill mb-0">
                  <input
                    style={{border:"2px solid black"}}
                    type="date"
                    id="form3Example3c"
                    className="form-control"
                    defaultValue={start}
                    onChange={(e) => setStart(e.target.value)}
                    placeholder="MM-DD-YYYY"
                    required
                  />
                </div>
              </div>
              <br />
              {/* end */}
              <div className="dflex">
                <div style={{color:"black", marginBottom:"5px"}}>End Date</div>
                <div className="form-outline flex-fill mb-0">
                  <input
                    style={{border:"2px solid black"}}
                    type="date"
                    id="form3Example3c"
                    className="form-control"
                    defaultValue={end}
                    onChange={(e) => setEnd(e.target.value)}
                    placeholder="MM-DD-YYYY"
                    required
                    />
                </div>
              </div>
              <br />
              {/* type of leave */}
              <div>
                <div style={{color:"black", marginBottom:"5px"}}>Select type of leave you want to apply</div>
                <select
                  style={{border:"2px solid black"}}
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  required

                >
                  <option  style={{color:"black", marginBottom:"5px"}}>Select the option</option>
                  <option defaultValue="paid" style={{color:"black", marginBottom:"5px"}}>Paid Leave</option>
                  <option defaultValue="optional" style={{color:"black", marginBottom:"5px"}}>Optional Holiday</option>
                  <option defaultValue="unpaid" style={{color:"black", marginBottom:"5px"}}>Unpaid Leave</option>
                </select>
              </div>
              <br />
              {/* reason */}
              <div className="dflex">
                <div style={{color:"black", marginBottom:"5px"}}>Reason</div>
                <div className="form-outline flex-fill mb-0">
                  <textarea
                    style={{border:"2px solid black"}}
                    id="form3Example3c"
                    className="form-control"
                    defaultValue={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                  />
                </div>
              </div>
              <br />
              {/* submit */}
                <div>
                    <button 
                data-bs-dismiss="offcanvas"
                aria-label="Close" className="btn btn-primary" onClick={handleLeaveSubmit} style={{position:"relative", left:"140px"}}>Submit</button>
                </div>
              <br />
            </div>
          </div>
        </div>

      </div>
    </>

  );
};

export default Sidebar;
