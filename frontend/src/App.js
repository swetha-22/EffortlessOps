import React from "react";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import VideoState from "./context/VideoState";
import ImgCollection from "./components/ImgCollection";
import EmployeeList from "./components/EmployeeList";
import SelfieApp from "./components/SelfieApp";
import SignUp from "./components/SignUp";
import Graphs from "./components/Graphs";
import Admin from "./components/Admin";
import AdminUI from "./components/AdminUI";
import MainUI from "./components/MainUI";
import Login from "./components/Login";
import Videocall from "./components/Videocall";
import Progress from "./components/Progress";
import "./global.css"
import Statistics from "./components/Statistics";
import TrackUsers from "./components/TrackUsers";
import LeaveRequest from "./components/LeaveRequest";
import PaySlip from "./components/PaySlip";
import AttendanceManagement from "./components/AttendanceManagement";
import Profile from "./components/Profile";
import AdminEmployeeTracker from "./components/AdminEmployeeTracker";
import EmployeeLeaves from "./components/EmployeeLeaves";
import Chat from "./components/Chat";
import EmployeeTracker from "./components/EmployeeTracker";
import AdminAccessProfile from "./components/AdminAccessProfile";

let containerStyle={

}

function App() {
  return (
    <>
      <VideoState>
        <Router>
          <div className="container" style={containerStyle}>
            <Routes>
              <Route exact path="/" element={<MainUI />}/>
              <Route exact path="/employeeUI" element={<SelfieApp />}/>
              <Route exact path="/mainUI" element={<MainUI/>}/>
              <Route exact path="/signup" element={<SignUp/>}/>
              <Route exact path="/login" element={<Login/>}/>
              <Route exact path="/graphs" element={<Graphs/>}/>
              <Route exact path="/admin" element={<Admin/>}/>
              <Route exact path="/adminUi" element={<AdminUI/>}/>
              <Route exact path="/videoCall" element={<Videocall/>}/>
              <Route exact path="/progress" element={<Progress/>}/>
              <Route exact path="/emp-list" element={<EmployeeList/>}/>
              <Route exact path="/payroll" element={<PaySlip/>}/>
              <Route exact path="/statistics" element={<Statistics/>}/>
              <Route exact path="/track-users" element={<TrackUsers/>}/>
              <Route exact path="/leaves" element={<LeaveRequest/>}/>
              <Route exact path="/attendance" element={<AttendanceManagement/>}/>
              <Route exact path="/my_profile" element={<Profile/>}/>
              <Route exact path="/admin_emp_track" element={<AdminEmployeeTracker/>}/>
              <Route exact path="/admin_ui" element={<AdminUI/>}/>
              <Route exact path="/leave_balance" element={<EmployeeLeaves/>}/>
              <Route exact path="/chat" element={<Chat/>}/>
              <Route exact path="/task-tracker" element={<EmployeeTracker/>}/>
              <Route exact path="/admin-access-profile" element={<AdminAccessProfile/>}/>
            </Routes>
          </div>
        </Router>
      </VideoState>
    </>
  );
}

export default App;
