import React from 'react'
import AdminAccessProfile from './AdminAccessProfile';
import { useNavigate } from 'react-router-dom';

const AdminEmpCards = (props) => {
    let { imageUrl, name, id } = props;

    let navigate=useNavigate();
    return (
        <>
        <div className='container mx-3 mb-5'>
            <div className="card" style={{width:"400px", height:"200px"}}>
                <div className='d-flex'>
                    <img src={imageUrl} className="card-img-top" alt="..." style={{width:"170px",borderRadius:"100px", height:"170px", margin:"15px 0px 0px 20px"}} />
                    <div className="card-body m-3">
                        <h5>{name}</h5>
                        <p style={{position:'relative', top:"5px"}}>{id}</p>
                        <p>Web Developer</p>
                        <button 
                            className='btn btn-success' 
                            style={{width:"170px", position:"relative", right:"27px", height:"30px", paddingTop:"2px"}} 
                            onClick={() => navigate('/admin-access-profile', { state: { id: id } })}
                        >
                            Change Designation
                        </button>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default AdminEmpCards;
