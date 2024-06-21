import React from 'react'
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import TaskMonitor from './TaskMonitor';

const Project = () => {

    let mainStyle = {
        width: "90%",
        height:"auto",
        top: "175px",
        left:"180px",
        position: "relative",
    };
    
    return (
        <div>
            <AdminNavbar/>
            <div className="d-flex" style={{position:"relative", right:"270px", width:"137%", top:"-175px"}}>
                <AdminSidebar/>
                <div className='myComponent' style={mainStyle}>
                    <div style={taskStyle}>
                        {tasks.map((data, index) => {
                            return <div className="md-3" key={index}>
                                <TaskMonitor coll_name={data.taskName} id={data._id} setTasks={setTasks} tasks={tasks} role={"user"}/>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project;