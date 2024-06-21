var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
// var jwt=require('jsonwebtoken');
// const JWT_SECRET="AbhiIsaGoodb$oy";

const multer = require('multer');
const upload = multer({
    dest: './uploads/'
});




// Route 1
//uploading image and user details using Mongo Client and Multer
router.post('/submit-form', [upload.single('file'), body('email','Enter a valid email').isEmail(),body('password','Enter a valid password').exists(),] , async (req, res) => 
{
    //Validating details in req
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    //check whether the user with this email exists already
    // try{
    //     let user1=await UserSignup.findOne({email:req.body.email});
    //     if(user1){
    //         return res.status(400).json({success, error:"Sorry a user with this email already exists"});
    //     }
    // }
    // catch(err){
    //     console.error(err.message)
    // }

    //Encrypting password
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);

    //Generating emp id
    let emp_name=req.body.name;
    let rand=Math.floor(Math.random()*1000);
    let employee_id=emp_name+"-"+rand;

    //Connecting to MongoClient
    const { MongoClient } = require('mongodb');
    const uri = 'mongodb+srv://Abhishek:Sweetmom%40123@cluster0.kegmq6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    const client = await new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect((err) => { console.log(err) });

    //Insertion in Db - Mongo Client
    const db = client.db('Employees');
    const usersCollection = db.collection('All_Employees');
    const createCollection= db.collection(employee_id);
    createCollection.insertOne(
    { 
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        password:secPass,
        image:req.body.file,
        emp_id:employee_id,
        House_No:null,
        City:null,
        State:null,
        Aadhar_No:null,
        Pan_No:null,
        Account_No:null,
        UAN_No:null,
        Bank:null,
        Designation:null,
        Experience:null,
        Project:null,
        Hike:null,
        IsAdmin:false,
        date:Date.now,
    });
    usersCollection.insertOne(
    { 
        name:req.body.name,
        email:req.body.email,
        emp_id:employee_id,
        password:secPass,
        IsAdmin:false
    });
    success=true;
    res.send( {success, emp_id:employee_id} );
});





// Route 2
router.post('/login',[
    body('email','Enter a Valid email').isEmail(),
    body('password','Password entered is incorrect').exists(),
], async (req,res)=>{ 
    let success=false
    const { MongoClient } = require('mongodb');
    const uri = 'mongodb+srv://Abhishek:Sweetmom%40123@cluster0.kegmq6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    const client = await new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect((err) => { console.log(err) });
    //Insertion in Db - Mongo Client
    const db = client.db('Employees');
    const usersCollection = db.collection('All_Employees');
    //If there are errors return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //check whether the user with this email exists or not
    const {name,email,password}=req.body;
    try{
    let user=await usersCollection.findOne({email});
    if(!user){
        return res.status(400).json({success,error:"Please try to login with correct credentials"});
    }
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare)
    {
        return res.status(400).json({success,error:"Please try to login with correct credentials"});
    }
    console.log(req.body.email+" "+req.body.IsAdmin+" "+user.IsAdmin)
    if(req.body.IsAdmin!==user.IsAdmin){
        return res.status(400).json({success,error:"You are not an admin"});
    }
    const emp_id=user.emp_id
    success=true
    res.json({success,emp_id,user});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})
module.exports = router


