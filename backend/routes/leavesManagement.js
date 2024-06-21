// routes/leave.js
const express = require('express');
const { MongoClient, ObjectId} = require('mongodb');
const router = express.Router();

// const uri = 'mongodb://127.0.0.1:27017/Leave-Management?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1';
const uri = 'mongodb+srv://Abhishek:Sweetmom%40123@cluster0.kegmq6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Route 1: Submit Leave Application
router.post('/submitLeave', async (req, res) => {
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('Leave-Management');
        const leaveData = req.body;
        const originalDate = new Date();

        // Extract the year, month, and day from the Date object
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(originalDate.getDate()).padStart(2, '0');
        
        // Form the formatted date string in 'YYYY-MM-DD' format
          const formattedDateString = `${year}-${month}-${day}`;
        leaveData["submissionDate"] = formattedDateString;
        leaveData["leaveStatus"] = 0; // 0->pending
        leaveData["empName"] = req.headers.emp_name; 
        leaveData["empId"] = req.headers.emp_id;
        // leaveData["empName"] = 'Abhishek'; 
        // leaveData["empId"] = 'abhishek-356';
        await db.collection('leaveApplications').insertOne(leaveData);
        res.send("Leave application submitted successfully");
        client.close();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route 2: Retrieve Leave Applications
router.get('/getLeaveApplications', async (req, res) => {
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('Leave-Management');
        const leaveApplications = await db.collection('leaveApplications').find().toArray();
        res.json(leaveApplications);
        client.close();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route 3: Update Leave Status
router.put('/updateLeaveStatus/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('Leave-Management');
        
        const leaveId = req.params.id;
        const { leaveStatus } = req.body;
        // Check if leaveStatus is a valid value (you might want to add additional validation)
        if (leaveStatus !== undefined && (leaveStatus === 0 || leaveStatus === 1 || leaveStatus === 2)) {
            const objectId = new ObjectId(leaveId);
            let result= await db.collection('leaveApplications').updateOne(
                { _id: objectId },
                { $set: { leaveStatus: leaveStatus } }
            );
            console.log(result);
            res.send("Leave leaveStatus updated successfully");
        } else {
            res.status(400).send("Invalid leaveStatus value");
        }
        client.close();
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});




// Route 4: Retrieve Leave Applications 
router.get('/getSpecificEmployeeLeaveApplications', async (req, res) => {
    try {
        const empId = req.headers.emp_id; // Get emp_id from headers
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('Leave-Management');
        // Filter leave applications based on empId
        const leaveApplications = await db.collection('leaveApplications').find({ empId: empId }).toArray();
        res.json(leaveApplications);
        client.close();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;


