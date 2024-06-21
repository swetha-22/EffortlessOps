
import React, { useState, useEffect, useContext } from 'react';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from 'axios';
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import VideoContext from "../context/VideoContext";
import { useLocation } from 'react-router-dom';

const AdminAccessProfile = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [isRoleEditing, setIsRoleEditing] = useState(false);
    const [isEditingUser, setIsEditingUser] = useState(false);

    const [editedEmployee, setEditedEmployee] = useState({});

    const location = useLocation();

    // Access props passed via state
    const { id } = location.state;

    let currentUser=id;
    

    let fetchData = async () => {
        try {
          const response = await fetch(
            "https://effortlessops-backend.onrender.com/api/profile-data/getUser",{
                method: "GET",
                headers: {
                    "emp_id": currentUser,
                }
            }
          );
          const data = await response.json();
          setEditedEmployee(data[0]);
          console.log(editedEmployee);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
    };


    // Function to handle updating the left section data
    const updateLeftSection = async () => {
        try {
            await axios.put(`https://effortlessops-backend.onrender.com/api/profile-data/updateLeftSection`, editedEmployee, {
                headers: { 
                    'emp_id': currentUser,
                    'object_id':editedEmployee._id
                }
            });
            console.log('Left section data updated successfully');
        } catch (error) {
            console.error('Failed to update left section data:', error);
        }
    };


    // Function to handle updating the right section data
    const updateRightSection = async () => {
        const { ['image']: removedField, ...rest } = editedEmployee;
        try {
            await axios.put(`https://effortlessops-backend.onrender.com/api/profile-data/updateRightSection`, rest, {
                headers: { 
                    'emp_id': currentUser,
                    'object_id':editedEmployee._id
                }
            });
            console.log('Right section data updated successfully');
        } catch (error) {
            console.error('Failed to update right section data:', error);
        }
    };

    // Function to handle updating the role details data
    const updateRoleDetails = async () => {
        const { ['image']: removedField, ...rest } = editedEmployee;
        try {
            await axios.put(`https://effortlessops-backend.onrender.com/api/profile-data/updateRoleDetails`, rest, {
                headers: { 
                    'emp_id': currentUser,
                    'object_id':editedEmployee._id
                }
            });
            console.log('Role details data updated successfully');
        } catch (error) {
            console.error('Failed to update role details data:', error);
        }
    };

    
    // Handle file input change for profile image
    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setEditedEmployee({
                ...editedEmployee,
                image: reader.result, // Set the profile image to the base64 representation of the selected file
            });
        };
        if (file) {
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    
    const handleEdit = async (e) => {
        e.preventDefault();
        await updateRightSection();
        setIsEditing(!isEditing);
    };
    

    const handleEditUser = async (e) => {
        e.preventDefault();
        await updateLeftSection();
        setIsEditingUser(!isEditingUser);
    };
   
    const handleRoleEdit= async (e)=>{
        e.preventDefault();
        await updateRoleDetails();
        setIsRoleEditing(!isRoleEditing);
    }

    const mainStyle = {
        width: "100%",
        position: "relative",
        left: "-205px",
        height:"auto",
        padding:"30px",
        background: "#f9f9f9",
    };

    useEffect(() => {
        fetchData();
      }, []);


  return (
    <div>
        <AdminNavbar/>
        <div className="d-flex" style={{width:"137%"}}>
          <AdminSidebar/>
          <div style={mainStyle}>

<div className='d-flex flex-column' style={{ width:"1200px", height:"auto", position:"relative", left:"170px"}}>
    {/* Personal details */}
    <div className='d-flex flex-row' style={{width:"1200px", height:'500px'}}>
        {/* left section */}
        <div style={{ border: "1px solid", width: "450px", marginRight: "5px", borderRadius: "10px", backgroundColor:'white' }}>
            <div style={{ textAlign: "center" }}>
                {/* User profile image */}
                <img src={editedEmployee?.image} alt="Profile" style={{ width: "170px", height: "170px", borderRadius: "50%", marginBottom: "10px", position:"relative", top:"75px", left:"150px", backgroundColor:"#f9f9f9", display:isEditingUser?"none":"block" }} />
                {/* Image selector */}
                {isEditingUser && (
                    <input style={{position:'relative', top:"135px", left:"50px"}} type="file" accept="image/*" onChange={handleImageChange} />
                )}
            </div>
            <div style={{position:"absolute", left:"140px", top:"280px"}}>
                <h4 style={{marginBottom:"15px", marginLeft:"30px"}}> {editedEmployee?.name}</h4>
                <p> <i class="fa-regular fa-id-card"></i> &nbsp; {editedEmployee?.emp_id}</p>
                <p> <i class="fa-solid fa-envelope"></i> &nbsp; {editedEmployee?.email}</p>
                <p> <i class="fa-solid fa-phone"></i> &nbsp; {editedEmployee?.mobile}</p>
                <p> <i class="fa-solid fa-code"></i> &nbsp; {editedEmployee?.Designation}</p>
            </div>
        </div>

        {/* right section */}
        <div style={{border:"1px solid", width:"700px", marginLeft:"5px", borderRadius:"10px", paddingLeft:'20px', backgroundColor:"white"}}>
            <br />
            {isEditing ? (
            <>
                <br />
                <h4 style={{marginBottom:"10px"}}>Contact Information</h4>
                <div>
                    <div className='d-flex flex-row'>
                        <p>House No. </p>
                        <input style={{width:"150px", height:"30px", position:"relative", left:"312px" }}  type="text" name="name" value={editedEmployee?.House_No} onChange={(e)=>{setEditedEmployee({...editedEmployee, House_No: e.target.value})}} />
                    </div>
                    <div className='d-flex flex-row'>
                        <p>City </p>
                        <input style={{width:"150px", height:"30px", position:"relative", left:"359px" }}  type="text" name="email" value={editedEmployee?.City} onChange={(e)=>{setEditedEmployee({...editedEmployee, City: e.target.value})}} />
                    </div>
                    <div className='d-flex flex-row'>
                        <p>State </p>
                        <input style={{width:"150px", height:"30px", position:"relative", left:"350px" }}  type="text" name="department" value={editedEmployee?.State} onChange={(e)=>{setEditedEmployee({...editedEmployee, State: e.target.value})}}/>
                    </div>
                </div>
                <br />
                <h4 style={{marginBottom:"10px"}}>Statutary Information</h4>
                <div>
                    <div className='d-flex flex-row'>
                        <p>Aadhar No. </p>
                        <input style={{width:"150px", height:"30px", position:"relative", left:"305px" }}  type="text" name="name" value={editedEmployee?.Aadhar_No} onChange={(e)=>{setEditedEmployee({...editedEmployee, Aadhar_No: e.target.value})}} />
                        <br />
                    </div>
                    <div className='d-flex flex-row'>
                        <p>Pan No. </p>
                        <input style={{width:"150px", height:"30px", position:"relative", left:"330px" }}  type="text" name="email" value={editedEmployee?.Pan_No} onChange={(e)=>{setEditedEmployee({...editedEmployee, Pan_No: e.target.value})}} />
                        <br />
                    </div>
                    <div className='d-flex flex-row'>
                        <p>Account No. </p>
                        <input style={{width:"150px", height:"30px", position:"relative", left:"298px" }}  type="text" name="department" value={editedEmployee?.Account_No} onChange={(e)=>{setEditedEmployee({...editedEmployee, Account_No: e.target.value})}} />
                        <br />
                    </div>
                    <div className='d-flex flex-row'>
                    <p>UAN No. </p>
                        <input style={{width:"150px", height:"30px", position:"relative", left:"323px" }}  type="text" name="department" value={editedEmployee?.UAN_No} onChange={(e)=>{setEditedEmployee({...editedEmployee, UAN_No: e.target.value})}} />
                        <br />
                    </div>
                    <div className='d-flex flex-row'>
                        <p>Bank </p>
                        <input style={{width:"150px", height:"30px", position:"relative", left:"351px" }}  type="text" name="department" value={editedEmployee?.Bank} onChange={(e)=>{setEditedEmployee({...editedEmployee, Bank: e.target.value})}} />
                    </div>
                </div>
            </>
            ) : (
                <div>
                    <br />
                    <h4>Contact Information</h4>
                    <div className='d-flex flex-row'>
                        <p>House No. </p>
                        <p style={{position:"relative", left:"350px"}}>{editedEmployee?.House_No}</p>
                    </div>
                    <div className='d-flex flex-row'>
                        <p>City </p>
                        <p style={{position:"relative", left:"397px"}}>{editedEmployee?.City}</p>
                    </div>
                    <div className='d-flex flex-row'>
                        <p>State: </p>
                        <p style={{position:"relative", left:"385px"}}>{editedEmployee?.State}</p>
                    </div>
                    <br />
                    <h4>Statutary Information</h4>
                    <div className='d-flex flex-row'>
                        <p>Aadhar No. </p>
                        <p style={{position:"relative", left:"343px"}}>{editedEmployee?.Aadhar_No}</p>
                    </div>
                    <div className='d-flex flex-row'>
                        <p>Pan No.</p>
                        <p style={{position:"relative", left:"370px"}}>{editedEmployee?.Pan_No}</p>
                    </div>
                    <div className='d-flex flex-row'>
                        <p>Account No. </p>
                        <p style={{position:"relative", left:"338px"}}>{editedEmployee?.Account_No}</p>
                    </div>
                    <div className='d-flex flex-row'>
                        <p>UAN No. </p>
                        <p style={{position:"relative", left:"363px"}}>{editedEmployee?.UAN_No}</p>
                    </div>
                    <div className='d-flex flex-row'>
                        <p>Bank</p>
                        <p style={{position:"relative", left:"391px"}}>{editedEmployee?.Bank}</p>
                    </div>
                </div>
            
            )}
        </div>
    </div>
    {/* role details */}
    <div style={{border:"1px solid", width:"1160px", height:'180px', marginTop:"10px", borderRadius:"10px", backgroundColor:"white"}}>
        <br /> 
        {isRoleEditing ? (
        <>
            <div className='d-flex flex-row'>
                <div className='d-flex flex-column' style={{marginLeft:'100px', marginRight:"130px"}}>
                    <p style={{fontWeight:"bold", fontSize:"16px"}}>Current Designation</p>
                    <input style={{width:"150px", height:"30px", marginTop:"-10px" }}  type="text" name="department" value={editedEmployee.Designation} onChange={(e)=>{setEditedEmployee({...editedEmployee, Designation: e.target.value})}} />
                </div>
                <div className='d-flex flex-column' style={{marginRight:'100px'}}>
                    <p style={{fontWeight:"bold", fontSize:"16px"}}>Current Project</p>
                    <input style={{width:"150px", height:"30px", marginTop:"-10px" }}  type="text" name="department" value={editedEmployee.Project} onChange={(e)=>{setEditedEmployee({...editedEmployee, Project: e.target.value})}} />
                </div>
                <div className='d-flex flex-column' style={{marginRight:'100px'}}>
                    <p style={{fontWeight:"bold", fontSize:"16px"}}>Experience(in months)</p>
                    <input style={{width:"150px", height:"30px", marginTop:"-10px" }}  type="text" name="department" value={editedEmployee.Experience} onChange={(e)=>{setEditedEmployee({...editedEmployee, Experience: e.target.value})}} />
                </div>
                <div className='d-flex flex-column' style={{marginRight:'100px'}}>
                    <p style={{fontWeight:"bold", fontSize:"16px"}}>Salary (Hike %)</p>
                    <input style={{width:"150px", height:"30px", marginTop:"-10px" }}  type="text" name="department" value={editedEmployee.Hike} onChange={(e)=>{setEditedEmployee({...editedEmployee, Hike: e.target.value})}} />
                </div>
            </div>
        </> ) :
        <>
            <div className='d-flex flex-row'>
                <div className='d-flex flex-column' style={{marginRight:'100px', marginLeft:'130px'}}>
                    <p style={{fontWeight:"bold", fontSize:"16px"}}>Current Designation</p>
                    <p style={{fontSize:"20px", marginTop:"-15px"}}>{editedEmployee.Designation}</p>
                </div>
                <div className='d-flex flex-column' style={{marginRight:'100px'}}>
                    <p style={{fontWeight:"bold", fontSize:"16px"}}>Current Project</p>
                    <p style={{fontSize:"20px", marginTop:"-15px"}}>{editedEmployee.Project}</p>
                </div>
                <div className='d-flex flex-column' style={{marginRight:'100px'}}>
                    <p style={{fontWeight:"bold", fontSize:"16px"}}>Experience(in months)</p>
                    <p style={{fontSize:"20px", marginTop:"-15px"}}>{editedEmployee.Experience}</p>
                </div>
                <div className='d-flex flex-column' style={{marginRight:'100px'}}>
                    <p style={{fontWeight:"bold", fontSize:"16px"}}>Salary (Hike %)</p>
                    <p style={{fontSize:"20px", marginTop:"-15px"}}>{editedEmployee.Hike}</p>
                </div>
            </div>
        </>}
        <button 
            // className='disabled-button'
            style={{ 
                position: 'absolute', 
                top: '622px', 
                right: '140px', 
                width:"960px", 
                borderRadius:"10px", 
                backgroundColor:"rgb(154, 85, 255)", 
                color:"white",
            }} 
            onClick={handleRoleEdit}
        >
            <b>{isRoleEditing ? 'SAVE' : 'UPDATE'}</b>
        </button>

    </div>
</div> 
</div>
        </div>
    </div>
  );
};

export default AdminAccessProfile;