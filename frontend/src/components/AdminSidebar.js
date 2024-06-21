import React from 'react';
import './Sidebar.css'; 
import { Link, useLocation } from 'react-router-dom';
import Elogo from "../images/bars_icon-removebg-preview.png"

const AdminSidebar = () => {
    
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
    
      const activeLinkStyle = {
        backgroundColor: '#eef3fb',
        color: 'black',
      };
    
      const isLinkActive = (path) => {
        return location.pathname === path;
      };

    return (
        <div className='adminSidebar' >
                <h4 className="m-3 side-heading" style={{color:"white"}}>Effortless-Ops</h4>
                <img className='logo' src={Elogo} alt="elogo" />
                <hr />

                <div className="d-flex flex-row align-items-center mb-2">
                <Link
                    className="link"
                    style={{ ...linkStyle, ...(isLinkActive('/admin_ui') && activeLinkStyle) }}
                    to="/admin_ui" 
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

                {/* <div className="d-flex flex-row align-items-center mb-2">
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
                </div> */}

                {/* <div className="d-flex flex-row align-items-center mb-2">
                <Link
                    className="link"
                    style={{ ...linkStyle, ...(isLinkActive('/statistics') && activeLinkStyle) }}
                    to="/statistics" 
                >
                    <div className='d-flex flex-row'>
                    <i className="fa fa-line-chart fa-lg me-3 fa-fw mb-2 mx-3"/>
                    <div className="side-elements">Statistics</div>
                    </div>
                </Link>
                </div> */}

                <div className="d-flex flex-row align-items-center mb-2">
                <Link
                    className="link"
                    style={{ ...linkStyle, ...(isLinkActive('/leaves') && activeLinkStyle) }}
                    to="/leaves" 
                >
                    <div className='d-flex flex-row'>
                    <i className="fa fa-sign-out-alt fa-lg me-3 fa-fw mb-2 mx-3"/>

                    <div className="side-elements">Leaves</div>
                    </div>
                </Link>
                </div>

                {/* <div className="d-flex flex-row align-items-center mb-2">
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
                </div> */}

                <div className="d-flex flex-row align-items-center mb-2">
                <Link
                    className="link"
                    style={{ ...linkStyle, ...(isLinkActive('/admin_emp_track') && activeLinkStyle) }}
                    to="/admin_emp_track" 
                >
                    <div className='d-flex flex-row'>
                    <i className="fa-brands fa-searchengin fa-lg me-3 fa-fw mb-2 mx-3"/>

                    <div className="side-elements">Employees</div>
                    </div>
                </Link>
                </div>

        </div>
    )
}

export default AdminSidebar
