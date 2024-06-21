import React , {useState, useEffect} from 'react'
import { Modal, Button } from 'react-bootstrap';
import deleteIcon from "../images/delete-btn-removebg-preview.png"
import Checkpoint from './Checkpoint';

const TaskMonitor = (props) => {

  let taskStyle={
    border: "1px solid gray",
    width: "800px",
    position: "relative",
    left: "35px",
    borderRadius: "10px",
    marginBottom:"50px",
    paddingBottom:"30px",
    zIndex:"0",
    // background: "linear-gradient(180deg, rgba(218,255,253,1) 27%, rgba(243,213,255,1) 56%)"
    backgroundColor:"rgb(225 242 246 / 96%)"
  }

  let deleteBtnStyle={
    width: "41px",
    position: "absolute",
    right: "25px",
    border: "none",
    top: "8px",
    background: "none",
    display: props.role==="user"?"none":"block"
  }

  const {setTasks, tasks}=props;
  const [showModal, setShowModal] = useState(false);

  const [checkpoints, setCheckpoints] = useState([]);
  const [checkpointData, setCheckpointData] = useState({
    role: '',
    member: '',
    dead_line: '',
  });

  let handleDelete = async ()=>{
    try {
      const response = await fetch(`https://effortlessops-backend.onrender.com/api/tasks/deleteTask/${props.id.toString()}`, {
        method: 'DELETE',
        headers: {
          'Content-Type' : 'application/json',
          'task_name' : props.coll_name.toString(),
        },
      });
      if (response.ok) {
        const updatedTasks= tasks.filter((e) => e._id !== props.id);
        setTasks(updatedTasks);
      } 
      else {
        console.error('Error deleting event:', response.statusText);
      }
    } 
    catch (error) {
      console.error('Error deleting event:', error);
    }
  }

  const handleModalSubmit = async () => {
    const {role, member, dead_line} = checkpointData;
    try {
      const response = await fetch('https://effortlessops-backend.onrender.com/api/checkpoints/putCheckpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coll_name:props.coll_name,
          role,
          member,
          dead_line
        }),
      });
      if (response.ok) {
        setShowModal(false);
        setCheckpoints((prevCheckpoints) => [
          ...prevCheckpoints,
          {
            role,
            member,
            dead_line,
          },
        ]);
      }
    } 
    catch (error) {
      console.error('Error creating event:', error);
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchCheckpoints = async() =>{
    try {
      const response = await fetch('https://effortlessops-backend.onrender.com/api/checkpoints/getCheckpoints', {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'coll_name' : props.coll_name
        }
      });
      const data = await response.json();
      setCheckpoints(data);
    } 
    catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  useEffect(() => {
    fetchCheckpoints();
  }, []);

  return (
    <div style={taskStyle}>
      <div className='d-flex flex-row' style={{display: "flex", justifyContent: "center", paddingTop:"15px", height:"60px", backgroundColor:"rgb(88 151 158)", borderRadius:"10px 10px 0px 0px", color:"white"}}>
        <h5>Task : {props.coll_name} </h5>
        <button className='btn btn-primary' onClick={()=>setShowModal(true)} style={{backgroundColor:"rgb(31 92 99)", height:"26px", paddingTop:"0px", border:"1px solid gray" ,marginLeft:"300px", display: props.role==="user"?"none":"block"}}>
          Add Check-Point
        </button>
        <button style={deleteBtnStyle} onClick={handleDelete}>
          <img style={{width:"41px"}} src={deleteIcon} alt="delete-button" />
        </button>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
              <Modal.Title>Mark a Checkpoint</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ display: 'flex', flexDirection: 'column', marginLeft: '50px' }}>
            <div className="my-3">
              <label style={{ fontSize: '18px', marginRight: '61px' }}>Role : </label>
              <input
                type="text"
                value={checkpointData.role}
                onChange={(e) => setCheckpointData({ ...checkpointData, role: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label style={{ fontSize: '18px', marginRight: '29px' }}>Member : </label>
              <input
                type="text"
                value={checkpointData.member}
                onChange={(e) => setCheckpointData({ ...checkpointData, member: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label style={{ fontSize: '18px', marginRight: '23px' }}>End Time : </label>
              <input
                style={{width:"188px", height:"29px"}}
                type="date"
                value={checkpointData.dead_line}
                onChange={(e) => setCheckpointData({ ...checkpointData, dead_line: e.target.value })}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                  Close
              </Button>
              <Button variant="primary" onClick={handleModalSubmit}>
                  Submit
              </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <hr style={{margin:"-2px"}} />
      {/* for loop */}
      {checkpoints.map((data, index) => <Checkpoint key={index} role={data.role} member={data.member} start_date={data.start_date} dead_line={data.dead_line} checkpoints={checkpoints} setCheckpoints={setCheckpoints} index={index} length={checkpoints.length} coll_name={props.coll_name} id={data._id} user={props.role}/>
      )}
    </div>
  )
}

export default TaskMonitor
