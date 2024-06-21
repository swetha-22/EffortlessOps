import React from 'react'
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const PaySlip = () => {

    const mainStyle = {
        width: "100%",
        position: "relative",
        left: "20px",
        padding:"30px",
        // background: "linear-gradient(0deg, rgba(186,246,250,1) 30%, rgba(189,254,184,1) 83%)",
        // background: "rgb(249, 249, 249)",
        display:"flex",
        paddingBottom:"50px"
    };

    let payHeader={
        position:'relative',
        left:"85px"
    }

    let paySlipOuterStyle={
        width:"1000px",
        height:"auto",
        border:"1px solid gray",
        backgroundColor:"#343a40",
        position:"relative",
        left:"150px",
        paddingBottom:"100px"
    }

    let paySlipStyle = {
        width:"800px",
        height:"auto",
        background:"white",
        border:"1px solid gray",
        position:"relative",
        left:"104px",
        top:"50px"
        
    }


    return (
        <div>
            <Navbar />
            <div className="d-flex" style={{width: "137%",position: "relative",right: "225px", top:"-20px"}}> 
                <Sidebar />
                <div style={mainStyle}>
                    <div style={payHeader}>
                        <div style={{width:"250px", height:"40px", border:"1px solid gray", paddingTop:'7px', fontWeight:"bolder", backgroundColor:"#7cb2c3"}}>
                            <pre style={{marginLeft:"80px", color:"white"}}>Payslips          <i class="fa-solid fa-down-long"></i></pre>
                        </div>
                        <div style={{width:"250px", height:"40px", backgroundColor:"#D6E8F7", border:"0.5px solid gray", paddingTop:'7px'}}>
                            <p style={{marginLeft:"80px"}}>February</p>
                        </div>
                    </div>
                    <div style={paySlipOuterStyle}>
                        <div style={{backgroundColor:"gray", height:"50px"}}>
                            <h6 style={{position:"relative", top:"12px", left :"20px", color:"white", fontSize:"20px"}}>
                                January, 2024
                            </h6>
                        </div>
                        <div style={paySlipStyle}>
                        <div className="container mt-3 mb-5">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="text-center lh-1 mb-2">
                                            <h3 className="fw-bold">PAYSLIP</h3> 
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-md-10" style={{position:"relative", left:"120px"}}>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className='d-flex flex-row'> 
                                                            <span className="fw-bolder">EMP ID</span> 
                                                            <p className="ms-3">39124</p> 
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className='d-flex flex-row'> <span className="fw-bolder">EMP Name</span> <p className="ms-3">Sanjana</p> </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className='d-flex flex-row'> <span className="fw-bolder">PF No.</span> <p className="ms-3">101523065714</p> </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className='d-flex flex-row'> <span className="fw-bolder">Mode of Pay</span> <p className="ms-3">SBI</p> </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className='d-flex flex-row'> <span className="fw-bolder">Designation</span> <p className="ms-3">Marketing Staff (MK)</p> </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className='d-flex flex-row'> <span className="fw-bolder">Ac No.</span> <p className="ms-3">*******0701</p> </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <table className="mt-4 table table-bordered">
                                                <thead className="bg-dark text-white">
                                                    <tr>
                                                        <th scope="col">Earnings</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Deductions</th>
                                                        <th scope="col">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">Basic</th>
                                                        <td>16250.00</td>
                                                        <td><b>PF</b></td>
                                                        <td>1800.00</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">HRA</th>
                                                        <td>1650.00 </td>
                                                        <td><b>Professional Tax</b></td>
                                                        <td>0.00</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">MA</th>
                                                        <td>3000.00</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Special Allowance</th>
                                                        <td>100.00</td>
                                                        <td colspan="2"></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Bonus</th>
                                                        <td>1400.00</td>
                                                        <td colspan="2"></td>
                                                    </tr>
                                                    <tr className="border-top">
                                                        <th scope="row">Total Earning</th>
                                                        <td>25970.00</td>
                                                        <td><b>Total Deductions</b></td>
                                                        <td>2442.00</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4"> <br /> <span className="fw-bold">Net Pay : 24528.00</span> </div>
                                            {/* <div className="border col-md-8">
                                                <div className="d-flex flex-column"> <span>In Words</span> <span>Twenty Five thousand nine hundred seventy only</span> </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default PaySlip

