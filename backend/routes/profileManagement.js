// routes/leave.js
const express = require('express');
const { MongoClient, ObjectId} = require('mongodb');
const router = express.Router();

const uri = 'mongodb+srv://Abhishek:Sweetmom%40123@cluster0.kegmq6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


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





router.put('/updateLeftSection', async (req, res) => {
    try {
        const empId = req.headers.emp_id;
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('Employees');
        const { image } = req.body;
        const objectId = new ObjectId(req.headers.object_id);
        console.log(objectId);
        await db.collection(empId).updateOne(
            { _id: objectId },
            { 
                $set: { 
                    image:image
                }
            }
        );
        client.close();
        res.status(200).send('Left section data updated successfully');
    } catch (err) {
        console.error('Failed to update left section data:', err);
        res.status(500).send('Failed to update left section data');
    }
});



router.put('/updateRightSection', async (req, res) => {
    try {
        const empId = req.headers.emp_id;
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('Employees');
        const { House_No, City, State, Pan_No, UAN_No, Account_No, Aadhar_No, Bank } = req.body;
        const objectId = new ObjectId(req.headers.object_id);
        console.log(objectId);
        await db.collection(empId).updateOne(
            { _id: objectId },
            { 
                $set: { 
                    State: State,
                    House_No: House_No,
                    City: City,
                    Pan_No: Pan_No,
                    UAN_No: UAN_No,
                    Account_No: Account_No,
                    Aadhar_No: Aadhar_No,
                    Bank: Bank
                }
            }
        );
        client.close();
        res.status(200).send('Right section data updated successfully');
    } catch (err) {
        console.error('Failed to update right section data:', err);
        res.status(500).send('Failed to update right section data');
    }
});



router.put('/updateRoleDetails', async (req, res) => {
    try {
        const empId = req.headers.emp_id;
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('Employees');
        const { Designation, Experience, Project, Hike } = req.body;
        const objectId = new ObjectId(req.headers.object_id);
        console.log(objectId);
        console.log("hi"+Designation,Experience,Project);
        await db.collection(empId).updateOne(
            { _id: objectId },
            { 
                $set: { 
                    Designation: Designation,
                    Experience: Experience,
                    Project: Project,
                    Hike: Hike,
                }
            }
        );
        client.close();
        res.status(200).send('Role details updated successfully');
    } catch (err) {
        console.error('Failed to update role details:', err);
        res.status(500).send('Failed to update role details');
    }
});


router.get('/getUser', async (req, res) => {
    try {
        const empId = req.headers.emp_id;
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


        const db = client.db('Employees');
        const usersCollection = db.collection(empId);
        const docs = await usersCollection.find({}).toArray();

        res.send(docs); 

        client.close();
    }
    catch (err) {
        console.error('Failed to fetch documents:', err);
        res.status(500).send('Failed to fetch documents');
    }
});



module.exports = router
