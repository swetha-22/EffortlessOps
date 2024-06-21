import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
    let navigate= useNavigate();

    const [name, setName] = useState("");
    const [fname, setFatherName] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");

    const [imageData, setImageData] = useState(null);
    
    const handleUpload = () => {
        console.log(imageData);
        console.log(name, email, password);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setImageData(base64String);
        };
        reader.readAsDataURL(file);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("file", imageData);
        formData.append("mobile", mobile);
    
        const response = await fetch(`https://effortlessops-backend.onrender.com/api/user/submit-form`, {
            method: 'POST',
            body: formData
        });
        const json= await response.json();
        console.log(json);
        if(json.success)
        {
            //re-direct
            localStorage.setItem('emp_id',json.emp_id);
            // navigate("/",{replace: true});
            let val=localStorage.getItem('emp_id');
            console.log(val);
            navigate("/mainUI");
        }
        else{
            console.log("ERROR")
        }
    };

    return (
        <div className='container' style={{height:"800px"}}>
            <div className="container h-100 whole">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: '25px',border:"2px solid rgb(3, 3, 73)",backgroundColor:"#2d2c3e" , color:"whitesmoke" }}>
                            <div className="card-body">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                    <i class="fa-solid fa-person-walking-arrow-loop-left" style={{position:"relative", left:"890px", fontSize:"25px", zIndex:"2"}} onClick={()=>{navigate('/mainUI')}}></i>
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                        <form className="mx-1 mx-4">
                                            {/* Name */}
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example1c" className="form-control" value={name}
                                                        onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
                                                </div>
                                            </div>
                                            {/* Father Name */}
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user-tie fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example2c" className="form-control" value={fname}
                                                        onChange={(e) => setFatherName(e.target.value)} 
                                                        placeholder="Your Father's Name" />
                                                </div>
                                            </div>
                                            {/* DOB */}
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-calendar-days fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="date" id="form3Example3c" className="form-control" value={dob}
                                                        onChange={(e) => setDob(e.target.value)} 
                                                        placeholder="Your Father's Name" />
                                                </div>
                                            </div>
                                            {/* Email */}
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="email" id="form3Example4c" className="form-control" 
                                                    placeholder="Your Email" value={email}
                                                        onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                            </div>
                                            {/* Password */}
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="password" id="pass" className="form-control" placeholder="Your Password" value={password}
                                                        onChange={(e) => setPassword(e.target.value)} />
                                                </div>
                                            </div>
                                            {/* Mobile */}
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-phone fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example6c" className="form-control" value={mobile}
                                                        onChange={(e) => setMobile(e.target.value)} placeholder="Your Mobile number" />
                                                </div>
                                            </div>
                                            {/* UPI */}
                                            {/* <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-credit-card fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example7c" className="form-control" value={upi}
                                                        onChange={(e) => setUpi(e.target.value)} placeholder="Your UPI Id" />
                                                </div>
                                            </div> */}
                                            {/* Image Upload */}
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-image fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <div className="input-group">
                                                        <input type="file" className="form-control" onChange={handleImageUpload} id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                                                        <button className="btn btn-outline-primary" type="button" id="inputGroupFileAddon04" onClick={handleUpload} >Upload</button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Submit button */}
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>Register</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="SampleImage" 
                                        style={{borderRadius:"10px", border:"3px solid #ecf0f1", boxShadow: "0px 0px 10px rgba(206, 237, 245, 0.8"}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp



// const SignUp = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [imageData, setImageData] = useState(null);

//     const handleImageUpload = (event) => {
//         const file = event.target.files[0];
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             const base64String = reader.result;
//             setImageData(base64String);
//         };
//         reader.readAsDataURL(file);
//     };

//     const handleUpload = () => {
//         console.log(name, email, password);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("name", name);
//         formData.append("email", email);
//         formData.append("password", password);
//         formData.append("file", imageData);
    
//         const response = await fetch(`https://effortlessops-backend.onrender.com/api/user/submit-form`, {
//             method: 'POST',
//             body: formData
//         });
//         console.log(response);
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             <input type="file" onChange={handleImageUpload} />
//             <button type="submit" onClick={handleUpload}>Upload</button>
//         </form>
//     );
// };

// export default SignUp