// routes/events.js
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();

const uri = 'mongodb+srv://Abhishek:Sweetmom%40123@cluster0.kegmq6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';



// Route 1: Create task collection
router.post('/createTask', async (req, res) => {
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('Task-Manager');
        await db.createCollection(req.body.title);
        await db.collection('All_Tasks').insertOne({taskName:req.body.title});
        client.close();
        res.send("Task created");
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  });



// Route 2: Fetch tasks from given collection name
router.get('/fetchTasks', async (req, res) => {
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('Task-Manager');
        const tasks = await db.collection('All_Tasks').find().toArray();
        res.json(tasks);
        client.close();
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});




// Route 3: Delete a task
router.delete('/deleteTask/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('Task-Manager');
        const taskId = req.params.id;
        if (!ObjectId.isValid(taskId)) {
            return res.status(400).send('Invalid Task ID');
        }


        // Convert eventId to ObjectId & Delete the event by ObjectId
        const objectId = new ObjectId(taskId);
        const result = await db.collection('All_Tasks').deleteOne({ _id: objectId });


        // Drop (delete) the specified collection
        const coll_name = req.headers['task_name'];
        const collection = db.collection(coll_name.toString());
        await collection.drop();

        // send status
        if (result.deletedCount === 1) {
            res.json({ message: 'Task deleted successfully' });
        } 
        else {
            res.status(404).json({ error: 'Task not found' });
        }
        client.close();
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



// Route 4: Store checkpoints
router.post('/putCheckpoints', async (req, res) => {
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('Task-Manager');
        const {coll_name, records}=req.body;
        await db.collection(coll_name).insertOne(records);
        res.send("Data inserted successfully");
    } 
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;






