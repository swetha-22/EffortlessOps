import React, {useState, useEffect} from 'react'
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

import TaskHeader from "./TaskHeader";
import TaskMonitor from "./TaskMonitor";

const EmployeeTracker = () => {

    let mainStyle = {
        width: "90%",
        height:"auto",
        top: "175px",
        left:"180px",
        position: "relative",
    };

    let taskStyle={
        // border: "1px solid",
        width: "874px",
        position: "relative",
        top: "25px",
        left:"200px"
    }

    // Fetch Tasks
    const [tasks, setTasks] = useState([]);
    const fetchTasks = async () => {
        try {
        const response = await fetch('https://effortlessops-backend.onrender.com/api/tasks/fetchTasks');
        const data = await response.json();
        setTasks(data);
        } 
        catch (error) {
        console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
      }, []);
    
    return (
        <div>
            <AdminNavbar/>
            <div className="d-flex" style={{position:"relative", right:"270px", width:"137%", top:"-175px"}}>
                <AdminSidebar/>
                <div className='myComponent' style={mainStyle}>
                    <div style={taskStyle}>
                    <TaskHeader setTasks={setTasks}/>
                    {tasks.map((data, index) => {
                        return <div className="md-3" key={index}>
                            <TaskMonitor coll_name={data.taskName} id={data._id} setTasks={setTasks} tasks={tasks} />
                        </div>
                    })}
                  </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeTracker;