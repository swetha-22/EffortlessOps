// employeeRoutes.js

const { MongoClient } = require('mongodb');
const express = require('express');
const router = express.Router();
const uri = 'mongodb+srv://Abhishek:Sweetmom%40123@cluster0.kegmq6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Endpoint to fetch all employee IDs
router.get('/search', async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db('Employees');
    const employeeIds = await db.collection('All_Employees').find({}, { _id: 0, emp_id: 1 }).toArray();
    res.json(employeeIds.map(employee => employee.emp_id)); 
  } 
  catch (error) {
    console.error('Error fetching employee IDs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;