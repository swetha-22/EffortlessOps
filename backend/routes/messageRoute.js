const express = require('express');
const MessageModel =require("../models/messageModel");
const router = express.Router();
// http://localhost:5000/api/message/
router.post('/', async (req, res) => {
    const { chatId, senderId, text } = req.body;
    const message = new MessageModel({
      chatId,
      senderId,
      text,
    });
    try {
      const result = await message.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  });


// http://localhost:5000/api/message/65893699233583b92c0b9b4b
router.get('/:chatId', async (req, res) => {
    const { chatId } = req.params;
    try {
      const result = await MessageModel.find({ chatId });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports=router;