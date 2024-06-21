// routes/leave.js
const express = require('express');
const { MongoClient, ObjectId} = require('mongodb');
const router = express.Router();

const uri = 'mongodb+srv://Abhishek:Sweetmom%40123@cluster0.kegmq6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// const uri = 'mongodb://127.0.0.1:27017/Leave-Management?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1';

router.post('/addAttendanceLog', async (req, res) => {
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('Attendance-Management');
        const data = {clockOut : null, effectiveHours : null};
        const originalDate = new Date();

        // Extract the year, month, and day from the Date object
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(originalDate.getDate()).padStart(2, '0');
        // Form the formatted date string in 'YYYY-MM-DD' format
        const formattedDateString = `${year}-${month}-${day}`;
        data["date"] = formattedDateString;
        
        // Extract the hours, minutes, and seconds from the Date object
        const hours = String(originalDate.getHours()).padStart(2, '0');
        const minutes = String(originalDate.getMinutes()).padStart(2, '0');
        const seconds = String(originalDate.getSeconds()).padStart(2, '0');
        // Form the formatted time string in 'HH:MM:SS' format
        const formattedTimeString = `${hours}:${minutes}:${seconds}`;
        data["clockIn"] = formattedTimeString;

        // Check if a document with the same emp_id and date exists
        const existingRecord = await db.collection(req.headers.emp_id).findOne({ date: formattedDateString });
        if (existingRecord) {
            // If a record already exists, send a response indicating the duplicate record
            res.status(400).send("Attendance already logged for this date.");
        } else {
            // If no record exists, insert the new record
            await db.collection(req.headers.emp_id).insertOne(data)
                .then(result => {
                    // Retrieve the _id of the inserted document
                    const insertedId = result.insertedId;
                    
                    // Convert the _id to string for sending as response
                    const insertedIdString = insertedId.toString();
                    
                    // Send the _id as response
                    res.send({ _id: insertedIdString, message: "Attendance logged successfully" });
                })
                .catch(error => {
                    console.error("Error inserting document:", error);
                    res.status(500).send("Error inserting document");
            });
        }

        client.close();
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// Route 2: Retrieve Leave Applications
router.get('/getAttendanceLogs', async (req, res) => {
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('Attendance-Management');
        const attendanceLogs = await db.collection(req.headers.emp_id).find().toArray();
        // Sort attendanceLogs array by the date field in descending order
        attendanceLogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        res.json(attendanceLogs);
        client.close();
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route 3: Update Leave Status
router.put('/updateAttendanceLogs/:id', async (req, res) => {
    try {
        let client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        let db = client.db('Attendance-Management');
        
        const logId = req.params.id;
        const { attendanceStatus } = req.body;

        // Get the current time for clockOut
        const originalDate = new Date();
        const hours = String(originalDate.getHours()).padStart(2, '0');
        const minutes = String(originalDate.getMinutes()).padStart(2, '0');
        const seconds = String(originalDate.getSeconds()).padStart(2, '0');
        const clockOut = `${hours}:${minutes}:${seconds}`;

        // Retrieve the clockIn time from the document
        const objectId = new ObjectId(logId);
        const logEntry = await db.collection(req.headers.emp_id).findOne({ _id: objectId });
        const clockIn = logEntry.clockIn;

        // Calculate the difference between clockOut and clockIn
        const clockInTime = new Date(`1970-01-01T${clockIn}`);
        const clockOutTime = new Date(`1970-01-01T${clockOut}`);
        const timeDifference = (clockOutTime - clockInTime) / 1000; // Difference in seconds

        // Convert the difference to hours (rounded to 2 decimal places)
        const effectiveHours = Math.round((timeDifference / 3600) * 100) / 100;

        // Update the document with clockOut and effectiveHours
        const result = await db.collection(req.headers.emp_id).updateOne(
            { _id: objectId },
            { $set: { clockOut: clockOut, effectiveHours: effectiveHours } }
        );

        // console.log(result);
        // res.send("Attendance clock-out updated successfully");
        client.close();
        
        
        client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db('Attendance-Management');
        const attendanceLogs = await db.collection(req.headers.emp_id).find().toArray();
        // Sort attendanceLogs array by the date field in descending order
        // attendanceLogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        res.json(attendanceLogs);
        console.log(attendanceLogs);
        client.close();

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;













// const cron = require('node-cron');

// cron.schedule('0 0 * * *', () => {
//   console.log('Adding attendance row...');
//   addAttendanceRow(); // Function to add attendance row
// });

// const addAttendanceRow = () => {
//     // Your logic to add attendance row to the database goes here
//     // This function could interact with your database (e.g., MongoDB) to add a new row
//     console.log('Attendance row added successfully');
//  };

// // Function to handle missed tasks and catch up
// const catchUpMissedTasks = () => {
//   const lastExecutionTime = getLastExecutionTime(); // Implement this function to get the last execution time from the database or file

//   const currentDate = new Date();
//   const daysSinceLastExecution = Math.floor((currentDate - lastExecutionTime) / (1000 * 60 * 60 * 24));

//   if (daysSinceLastExecution > 1) {
//     for (let i = 1; i < daysSinceLastExecution; i++) {
//       console.log(`Adding missed attendance row for day ${i}...`);
//       addAttendanceRow(); // Add missed row for each day
//     }
//   }
// };

// // Run the function to catch up missed tasks when the server starts
// catchUpMissedTasks();
