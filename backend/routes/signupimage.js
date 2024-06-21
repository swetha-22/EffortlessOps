var express = require('express');
var router = express.Router();
const UserImage = require('../models/UserImage');
var fs = require('fs');

const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://Abhishek:Sweetmom%40123@cluster0.kegmq6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const app = express();
app.use(express.json({ limit: '50mb' }));



// imports 
const faceapi = require('face-api.js')
const canvas = require('canvas')
const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })
// Load the Tiny Face Detector model 
const MODEL_URL = '../face-api/models'
const detectionOptions = new faceapi.TinyFaceDetectorOptions({ inputSize: 160 })

// router.post('/upload', async (req, res) => {

//     async function loadModels() {
//         await faceapi.nets.tinyFaceDetector.loadFromDisk(MODEL_URL)
//         await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL)
//         await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL)
//         console.log('Models loaded')
//     }

//     async function compareImage(imageData1, imageData2) {
//         console.log('Started comparing two images')
//         const image1 = await loadImage(imageData1)
//         const image2 = await loadImage(imageData2)

//         // Use the Tiny Face Detector model and smaller input size for face detection
//         const detection1 = await faceapi.detectSingleFace(image1, detectionOptions).withFaceLandmarks().withFaceDescriptor()
//         const detection2 = await faceapi.detectSingleFace(image2, detectionOptions).withFaceLandmarks().withFaceDescriptor()

//         if (!detection1) {
//             console.log('No face detected in image1')
//             return false
//         }
//         if (!detection2) {
//             console.log('No face detected in image2')
//             return false
//         }
//         const distance = faceapi.euclideanDistance(detection1.descriptor, detection2.descriptor)
//         const similarity = 100 - (distance * 100)
//         console.log(`Similarity Percentage: ${similarity.toFixed(2)}%`)
//         console.log("returning similarities");
//         return similarity
//     }

//     async function loadImage(imageData) {
//         return new Promise((resolve, reject) => {
//           const img = new Image()
//           img.onload = () => {
//             const imgCanvas = canvas.createCanvas(img.width, img.height)
//             const ctx = imgCanvas.getContext('2d')
//             ctx.drawImage(img, 0, 0, img.width, img.height)
//             resolve(imgCanvas)
//           }
//           img.onerror = reject
//           img.src = imageData
//         })
//     }      

//     try {
//         await loadModels()
//         const base64ImageData1 = req.body.image;
//         const base64ImageData2 = req.body.image;
//         const similarity = await compareImage(base64ImageData1, base64ImageData2)
//         // const similarity=70;
//         console.log(similarity)
//         const imageData = req.body.image;
//         const image = new UserImage({ image: imageData, accuracy: similarity});
//         await image.save();
//         res.send('Image saved successfully');
//     } catch (err) {
//         console.log("Error saving image")
//         console.error(err);
//         res.status(500).send('Error saving image');
//     }



//     try {
//         await loadModels()
//         const base64ImageData1 = req.body.image;
//         const base64ImageData2 = req.body.image;
//         const similarity = await compareImage(base64ImageData1, base64ImageData2)
//         const base64ImageData = req.body.image;

        
//         // Ensure that base64ImageData is a string
//         if (typeof base64ImageData !== 'string') {
//             throw new Error('Invalid image data');
//         }
//         // Save the base64-encoded string to MongoDB
//         const image = new UserImage({
//             image: base64ImageData,
//             accuracy: similarity, // You can replace this with the actual accuracy value
//         });
//         await image.save();
//         res.send('Image saved successfully');
//     } 
//     catch (err) {
//         console.log("Error saving image")
//         console.error(err);
//         res.status(500).send('Error saving image');
//     }
// });


// Route:1 , Fetching image


router.get('/fetchImage', async (req, res) => {
    try {
        const img = await UserImage.find({ _id: "64244a232935f16dd30159b5" });
        res.json(img);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error has occured");
    }
})


// Route:2 , Generating image
router.get("/save-image", async (req, res) => {
    const imageData = await UserImage.findOne({ _id: "64244a232935f16dd30159b5" });
    //   console.log(imageData.image);
    res.send("image created");
    const fileName = `snapshot.jpeg`;
    const filePath = `./${fileName}`;

    // remove the data URL prefix and decode the base64-encoded image data
    const base64Data = imageData.image.replace(/^data:image\/jpeg;base64,/, "");
    const binaryData = Buffer.from(base64Data, "base64");

    // save the image to the server
    fs.writeFile(filePath, binaryData, "binary", (error) => {
        if (error) {
            console.log("Image not saved error");
            console.error(error);
            // res.status(500).send("Error saving the image.");
        }
        else {
            console.log(`Image saved as ${fileName}.`);
            // res.send("Image saved successfully.");
        }
    });
});

// Route 3 : Uploading image in mongo
router.post('/upload', async (req, res) => {

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    async function loadModels() {
        await faceapi.nets.tinyFaceDetector.loadFromDisk(MODEL_URL)
        await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL)
        await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL)
        console.log('Models loaded')
    }

    async function compareImage(imageData1, imageData2) {
        console.log('Started comparing two images')
        const image1 = await loadImage(imageData1)
        const image2 = await loadImage(imageData2)

        // Use the Tiny Face Detector model and smaller input size for face detection
        const detection1 = await faceapi.detectSingleFace(image1, detectionOptions).withFaceLandmarks().withFaceDescriptor()
        const detection2 = await faceapi.detectSingleFace(image2, detectionOptions).withFaceLandmarks().withFaceDescriptor()

        if (!detection1) {
            console.log('No face detected in image1')
            return false
        }
        if (!detection2) {
            console.log('No face detected in image2')
            return false
        }
        const distance = faceapi.euclideanDistance(detection1.descriptor, detection2.descriptor)
        const similarity = 100 - (distance * 100)
        console.log(`Similarity Percentage: ${similarity.toFixed(2)}%`)
        console.log("returning similarities");
        return similarity
    }

    async function loadImage(imageData) {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => {
            const imgCanvas = canvas.createCanvas(img.width, img.height)
            const ctx = imgCanvas.getContext('2d')
            ctx.drawImage(img, 0, 0, img.width, img.height)
            resolve(imgCanvas)
          }
          img.onerror = reject
          img.src = imageData
        })
    }      
    let similarity=0;
    //get actual image
    let empId=req.headers.emp_id;
    await client.connect();
    const db = client.db('Employees');
    const usersCollection = db.collection(empId);
    const docs = await usersCollection.find({}).toArray();
    try {
        await loadModels()
        const base64ImageData1 = req.body.image;
        const base64ImageData2 = docs[0].image;
        let accuracy = await compareImage(base64ImageData1, base64ImageData2);
        similarity=parseFloat(accuracy.toFixed(2));
        console.log(similarity)
    } 
    catch (err) {
        console.log("Error solving accuracy")
        console.error(err);
        res.status(500).send('Error solving accuracy');
    }
    try {
        await client.connect();
        const db = client.db("Employees");
        const collection = db.collection(req.headers.emp_id);
        const currentDate = new Date(); // Get the current date and time

        // Function to pad single digit numbers with leading zero
        const padZero = (num) => (num < 10 ? "0" + num : num);

        // Format date in "dd-mm-yyyy" format
        const formattedDate = `${padZero(currentDate.getDate())}-${padZero(currentDate.getMonth() + 1)}-${currentDate.getFullYear()}`;

        // Format time in "hh:mm:ss" format
        const formattedTime = `${padZero(currentDate.getHours())}:${padZero(currentDate.getMinutes())}:${padZero(currentDate.getSeconds())}`;

        await collection.insertOne({
            image: req.body.image,
            accuracy: similarity,
            date: formattedDate,
            time: formattedTime
        });

        // await collection.insertOne({image:req.body.image,accuracy:similarity});
        res.send('Image saved successfully');
    } 
    catch (err) {
        console.error('Error saving image:', err);
    } 
    finally {
        client.close();
    }
});


// Route 4: Retrieval image from a particular collection
router.get('/getImage', async (req, res) => {
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('Employees');
        // const usersCollection = db.collection(req.header('emp_id'));
        const usersCollection = db.collection(req.headers.emp_id);

        // const docs = await usersCollection.find({}).toArray();
        const docs = await usersCollection.find({}).toArray(); // Fetch all documents
        docs.shift(); // Remove the first entry
        docs.sort((a, b) => b.date - a.date); // Sort the remaining documents by date in descending order

        res.send(docs);
        client.close();
    }
    catch (err) {
        console.error('Failed to fetch documents:', err);
        res.status(500).send('Failed to fetch documents');
    }
});

// Route 5: Retrieve all user details from a employee(test-user) collection
router.get('/getUsers', async (req, res) => {
    try {
        const empId = req.headers.emp_id;
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        const db1 = client.db('Employees');
        const usersCollection1 = db1.collection('All_Employees');

        // const docs = await usersCollection.find({}).toArray();
        const docs1 = await usersCollection1.find({}).sort({ date: -1 }).toArray();

        const db = client.db('Employees');
        const usersCollection = db.collection(empId);

        const docs = await usersCollection.find({}).toArray();

        for (let i = 0; i < docs1.length; i++) {
            const empId = docs1[i].emp_id;
            const userCollection = db.collection(empId);
            const userData = await userCollection.findOne({});
            // Assuming image is stored in the userData as base64 string
            docs1[i].image = userData.image;
        }

        res.send(docs1); 
        client.close();
    }
    catch (err) {
        console.error('Failed to fetch documents:', err);
        res.status(500).send('Failed to fetch documents');
    }
});


module.exports = router