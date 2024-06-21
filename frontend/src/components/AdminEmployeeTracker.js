import React, {useState, useEffect} from 'react'
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminEmpCards from './AdminEmpCards';

const AdminEmployeeTracker = () => {

    let mainStyle = {
        width: "90%",
        height:"auto",
        top: "175px",
        left:"180px",
        position: "relative",
    };

    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        try {
            const response = await fetch('https://effortlessops-backend.onrender.com/api/signup/getUsers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'emp_id':localStorage.getItem("emp_id")
                },
            });
            const data = await response.json();
            const filteredData = data.filter(user => !user.IsAdmin);
            setUsers(filteredData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(()=>{
        getUsers();
    },[])
    
    return (
        <div>
            <AdminNavbar/>
            <div className="d-flex" style={{position:"relative", right:"270px", width:"137%", top:"-175px"}}>
                <AdminSidebar/>
                <div className='myComponent' style={mainStyle}>
                    <div className='row py-5' style={{marginTop:"10px", padding:"10px", paddingRight:"20px", marginLeft:"10px"}}>
                        {users.map((data, index) => {
                            return <div className="col-md-4" key={index}>
                                        <AdminEmpCards imageUrl={data.image} name={data.name} id={data.emp_id} />
                                    </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminEmployeeTracker;