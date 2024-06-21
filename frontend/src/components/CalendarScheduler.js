// import React, { useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import moment from 'moment';

// import { Modal, Button } from 'react-bootstrap';

// import './modal.css';

// const localizer = momentLocalizer(moment);

// const CalendarScheduler = () => {
//   const [events, setEvents] = useState([]);
//   const [eventFormData, setEventFormData] = useState({
//     title: '',
//     time: '',
//     duration: '',
//   });

//   const [selectedSlot, setSelectedSlot] = useState(null);

//   const handleSelect = (slotInfo) => {
//     setEventFormData({
//       title: '',
//       time: '',
//       duration: '',
//     });
//     setSelectedSlot(slotInfo);
//     setShowModal(true);
//   };

//   const handleModalSubmit = () => {
//     const { title, time, duration } = eventFormData;

//     if (title && time && duration && selectedSlot) {
//       const start = moment(selectedSlot.start).set({
//         hour: moment(time, 'HH:mm').hour(),
//         minute: moment(time, 'HH:mm').minute(),
//       });

//       const end = start.clone().add(duration, 'minutes');

//       const newEvent = {
//         start: start.toDate(),
//         end: end.toDate(),
//         title,
//         time,
//         duration,
//       };

//       setEvents([...events, newEvent]);
//       setShowModal(false);
//     }
//   };

//   const handleDelete = (event) => {
//     const updatedEvents = events.filter((e) => e !== event);
//     setEvents(updatedEvents);
//   };

//   const [showModal, setShowModal] = useState(false);

//   const handleCloseModal = () => {
//     setSelectedSlot(null);
//     setShowModal(false);
//   };

//   return (
//     <div>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: '400px', backgroundColor: 'azure' }}
//         selectable
//         onSelectSlot={handleSelect}
//         components={{
//           event: EventComponent,
//           agenda: {
//             event: CustomAgendaEvent,
//           },
//         }}
//       />

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Enter Meeting Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ display: 'flex', flexDirection: 'column', marginLeft: '50px' }}>
//           <h3 style={{ marginLeft: '-50px' }}>Add Event</h3>
//           <div className="my-3">
//             <label style={{ fontSize: '18px', marginRight: '55px' }}>Title:</label>
//             <input
//               type="text"
//               value={eventFormData.title}
//               onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
//             />
//           </div>
//           <div className="mb-3">
//             <label style={{ fontSize: '18px', marginRight: '50px' }}>Time:</label>
//             <input
//               type="time"
//               value={eventFormData.time}
//               onChange={(e) => setEventFormData({ ...eventFormData, time: e.target.value })}
//             />
//           </div>
//           <div className="mb-3">
//             <label style={{ fontSize: '18px', marginRight: '20px' }}>Duration (minutes):</label>
//             <input
//               type="number"
//               value={eventFormData.duration}
//               onChange={(e) => setEventFormData({ ...eventFormData, duration: e.target.value })}
//             />
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleModalSubmit}>
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );

//   function EventComponent({ event }) {
//     return (
//       <div>
//         <strong>{event.title}</strong>
//         <p>{event.time}</p>
//         <p>{event.duration}</p>
//         <button onClick={() => handleDelete(event)}>Delete</button>
//       </div>
//     );
//   }

//   function CustomAgendaEvent({ event }) {
//     return (
//       <div style={{ marginBottom: '10px' }}>
//         <strong>{event.title}</strong>
//         <p>{event.time}</p>
//         <p>{event.duration}</p>
//         <button onClick={() => handleDelete(event)}>Delete</button>
//       </div>
//     );
//   }
// };

// export default CalendarScheduler;











import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';

const localizer = momentLocalizer(moment);

const CalendarScheduler = (props) => {
  const [events, setEvents] = useState([]);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    start: '',
    end: '',
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);
  
  const fetchEvents = async () => {
    try {
      const response = await fetch('https://effortlessops-backend.onrender.com/api/calendar/fetchEvents');
      const data = await response.json();
  
      // Parse date strings to Date objects
      const parsedEvents = data.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
  
      setEvents(parsedEvents);
    } 
    catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  

  const handleSelect = () => {
    setEventFormData({
      title: '',
      start: '',
      end: '',
    });
    setShowModal(true);
  };

  const handleModalSubmit = async () => {
  const { title, start, end } = eventFormData;

  if (title && start && end) {
    try {
      const response = await fetch('https://effortlessops-backend.onrender.com/api/calendar/putEvents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          start: new Date(start),
          end: new Date(end),
        }),
      });

      if (response.ok) {
        setShowModal(false);
        const newEvent = await response.json();

        setEvents((prevEvents) => [
          ...prevEvents,
          {
            title: newEvent.title,
            start: new Date(newEvent.start),
            end: new Date(newEvent.end),
          },
        ]);

      } else {
        console.error('Error creating event:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  }
};

  
  

const handleDelete = async (event) => {
  try {
    const response = await fetch(`https://effortlessops-backend.onrender.com/api/calendar/deleteEvent/${event._id.toString()}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const updatedEvents = events.filter((e) => e._id !== event._id);
      setEvents(updatedEvents);
    } 
    else {
      console.error('Error deleting event:', response.statusText);
    }
  } 
  catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
          left: "-250px",
          width: "875px",
          position: "relative",
          height: '400px',
          // backgroundColor: 'rgb(215 233 251)', // Whole calendar color
          // backgroundColor: '#f5e1ff', // Whole calendar color
          // background: props.roll==="admin"?"linear-gradient(rgb(207, 251, 228) 20%, #96d6c4);":"linear-gradient(rgb(207, 251, 228) 20%, #96d6c4);",
          // background: "linear-gradient(180deg, rgba(207,251,228,1) 20%, rgba(138,255,222,1) 57%)",

          background: "rgb(210,255,232)",
          background: "linear-gradient(180deg, rgba(210,255,232,1) 49%, rgba(150,214,196,1) 73%)",

          color: 'black', // Text color
          border: '1px dotted gray', // Border color
        }}
        selectable
        onSelectSlot={handleSelect}
        components={{
          event: EventComponent,
          agenda: {
            event: CustomAgendaEvent,
          },
        }}
        formats={{
          // Customize the agenda header color for the current day
          agendaHeaderFormat: (date, culture, localizer) =>
            localizer.format(date, 'dddd, MMMM DD', culture) ===
            localizer.format(new Date(), 'dddd, MMMM DD', culture)
              ? 'red' // Current day color
              : 'white', // Other days color
        }}
        dayPropGetter={(date) => {
          const isInCurrentMonth = moment(date).isSame(moment(), 'month');
      
          return {
            style: {
              backgroundColor: isInCurrentMonth ? 'inherit' : '#f3f7f8', // Use your preferred color
            },
          };
        }}
      />


      <Modal show={showModal} onHide={handleCloseModal} >
        <Modal.Header closeButton style={{backgroundColor:"rgb(231, 246, 242)"}}>
          <Modal.Title>Enter Meeting Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: 'flex', flexDirection: 'column', backgroundColor:"rgb(231, 246, 242)"}}>
          <h3>Add Event</h3>
          <div className="my-3" style={{marginLeft:"50px"}}>
            <label style={{ fontSize: '18px', marginRight: '61px' }}>Title:</label>
            <input
              type="text"
              value={eventFormData.title}
              onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
            />
          </div>
          <div className="mb-3" style={{marginLeft:"50px"}}>
            <label style={{ fontSize: '18px', marginRight: '14px' }}>Start Time:</label>
            <input
              type="datetime-local"
              value={eventFormData.start}
              onChange={(e) => setEventFormData({ ...eventFormData, start: e.target.value })}
            />
          </div>
          <div className="mb-3" style={{marginLeft:"50px"}}>
            <label style={{ fontSize: '18px', marginRight: '20px' }}>End Time:</label>
            <input
              type="datetime-local"
              value={eventFormData.end}
              onChange={(e) => setEventFormData({ ...eventFormData, end: e.target.value })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:"rgb(231, 246, 242)"}}>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

  function EventComponent({ event }) {
    return (
      <div>
        <strong>{event.title}</strong>
        <p>{moment(event.start).format('YYYY-MM-DD HH:mm')}</p>
        <p>{moment(event.end).format('YYYY-MM-DD HH:mm')}</p>
        <button onClick={() => handleDelete(event)}>Delete</button>
      </div>
    );
  }

  function CustomAgendaEvent({ event }) {
    return (
      <div style={{ marginBottom: '10px' }}>
        <strong>{event.title}</strong>
        <p>{moment(event.start).format('YYYY-MM-DD HH:mm')}</p>
        <p>{moment(event.end).format('YYYY-MM-DD HH:mm')}</p>
        <button onClick={() => handleDelete(event)}>Delete</button>
      </div>
    );
  }
};

export default CalendarScheduler;
