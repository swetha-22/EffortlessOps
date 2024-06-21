// routes/events.js
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();

// const uri = 'mongodb://127.0.0.1:27017/scheduled-Events?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1';
const uri = 'mongodb+srv://Abhishek:Sweetmom%40123@cluster0.kegmq6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';



// Route 1: Store checkpoints
router.post('/putCheckpoint', async (req, res) => {
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('Task-Manager');
        const data=req.body;
        let currentDate = new Date();
        data["start_date"] = currentDate.toLocaleDateString();
        await db.collection(req.body.coll_name).insertOne(req.body);
        res.send("Data inserted successfully");
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// Route 2: Fetch checkpoints
router.get('/getCheckpoints', async (req, res) => {
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('Task-Manager');
        const checkpoints = await db.collection(req.headers['coll_name']).find().toArray();
        res.json(checkpoints);
        client.close();
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



// Route 3: Delete a task
router.delete('/deleteCheckpoint/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('Task-Manager');
        const CheckpointId = req.params.id;
        if (!ObjectId.isValid(CheckpointId)) {
            return res.status(400).send('Invalid Checkpoint ID');
        }

        // Convert eventId to ObjectId & Delete the event by ObjectId
        const objectId = new ObjectId(CheckpointId);
        const result = await db.collection(req.headers['coll_name']).deleteOne({ _id: objectId });

        // send status
        if (result.deletedCount === 1) {
            res.json({ message: 'Checkpoint deleted successfully' });
        } 
        else {
            res.status(404).json({ error: 'Checkpoint not found' });
        }
        client.close();
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;






