import React , {useState} from 'react'
import { Modal, Button } from 'react-bootstrap';

const TaskHeader = (props) => {

    // const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState({title: ''});
    const [showModal, setShowModal] = useState(false);

    const {setTasks} = props;

    const handleModalSubmit = async () => {
        console.log(taskName.title);
        setShowModal(false);
        try {
            const response = await fetch('https://effortlessops-backend.onrender.com/api/tasks/createTask', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    title:taskName.title
                }),
            });
            setTasks((prevTasks) => [
                ...prevTasks,
                {
                  taskName: taskName.title,
                },
            ]);
        } 
        catch (error) {
            console.error('Error creating event:', error);
        }
    }   

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <div className="d-flex flex-row m-3">
                <h2>Task Handler</h2>
                <button onClick={()=>setShowModal(true)} type="button" className="btn btn-success" style={{position: "absolute", right: "15px"}}>Create new task</button>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Task Details</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', flexDirection: 'column', marginLeft: '50px' }}>
                    <div className="my-3">
                        <label style={{ fontSize: '18px', marginRight: '61px' }}>Title:</label>
                        <input
                            type="text"
                            value={taskName.title}
                            onChange={(e) => setTaskName({ ...taskName, title: e.target.value })}
                            style={{width:"250px"}}
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
    )
}

export default TaskHeader
