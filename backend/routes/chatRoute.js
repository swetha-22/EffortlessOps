const express = require('express');
const ChatModel =require("../models/chatModel");
const router = express.Router()

// http://localhost:5000/api/chat/

// router.post('/', async (req, res) => {
//     const newChat = new ChatModel({
//       members: [req.body.senderId, req.body.receiverId],
//     });
//     try {
//       const result = await newChat.save();
//       res.status(200).json(result);
//     } catch (error) {
//       res.status(500).json(error);
//       console.error;
//     }
//   });

router.post('/', async (req, res) => {
  const senderId = req.body.senderId;
  const receiverId = req.body.receiverId;

  try {
    // Check if a chat exists between the sender and receiver
    const existingChat = await ChatModel.findOne({
      members: { $all: [senderId, receiverId] }
    });

    if (existingChat) {
      // If chat exists, return it
      res.status(200).json(existingChat);
    } else {
      // If chat doesn't exist, create a new chat
      const newChat = new ChatModel({
        members: [senderId, receiverId],
      });
      const result = await newChat.save();
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.error('Error creating or fetching chat:', error);
  }
});

// http://localhost:5000/api/chat/sanjana
router.get('/:userId', async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
});

// http://localhost:5000/api/chat/find/abhishek/sanjana
router.get('/find/:firstId/:secondId', async (req, res) => {
    try {
      const chat = await ChatModel.findOne({
        members: { $all: [req.params.firstId, req.params.secondId] },
      });
      res.status(200).json(chat)
    } catch (error) {
      res.status(500).json(error)
    }
  });

  module.exports=router;