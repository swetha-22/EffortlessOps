import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginImg from '../images/loginImage.png';
import VideoContext from "../context/VideoContext";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  let {isAdminContext}=useContext(VideoContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://effortlessops-backend.onrender.com/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Uname: name,
        email: email,
        password: password,
        IsAdmin: isAdminContext
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      if (isAdminContext) {
        localStorage.setItem("admin_id", json.emp_id);
        localStorage.setItem("admin_name", json.user.name);
        localStorage.setItem("is_admin", json.user.IsAdmin);
        navigate("/admin_ui");
      } 
      else {
        localStorage.setItem("emp_id", json.emp_id);
        localStorage.setItem("emp_name", json.user.name);
        localStorage.setItem("is_admin", json.user.IsAdmin);
        navigate("/employeeUI");
      }
    } 
    else {
      console.log("ERROR");
      if (response.status === 400) {
        // Display the error message from the backend
        setErrorMessage(json.error);
      }
    }
  };

  return (
    <div className="container" style={{ position: "absolute", top: "140px", width: "1050px" }}>
      <div className="container h-100 mt-3" >
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px', backgroundColor: "#2d2c3e", color: "whitesmoke" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <div className="row justify-content-center">
                      <i class="fa-solid fa-person-walking-arrow-loop-left" style={{position:"relative", top:"-38px", left:"811px", fontSize:"25px"}} onClick={()=>{navigate('/mainUI')}}></i>
                      <h2 style={{ marginBottom: "40px" }}>Login</h2>
                      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="email"
                              className="form-control"
                              placeholder="Your Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="password"
                              className="form-control"
                              placeholder="Your Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>
                        <button style={{position:"relative", left:"122px"}} type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src={LoginImg} className="img-fluid mx-3" style={{ borderRadius: "10px", width: "430px", height: "300px", border: "3px solid #ecf0f1", boxShadow: "0px 0px 10px rgba(206, 237, 245, 0.8" }} alt="Smartphone with Login Screen" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
