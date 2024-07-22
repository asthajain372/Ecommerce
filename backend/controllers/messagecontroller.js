// const MesssageModel = require('../db/Message');
const MesssageModel = require('../db/Message');
const Conversation = require('../db/Conversation');
const usermodel = require('../db/User');
// const getReceiverSocketId = require('socket.io');
const {getReceiverSocketId  } = require('../socket');
const {io} = require('../socket');

async function sendmessage (req , res){
    // Productmodel
    try{
        // const data = await new MesssageModel.find();

        const{ message } = req.body;
        const{ id:receiverId } = req.params;
			// console.log(message);
        const senderId = req.userId;

    	let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new MesssageModel({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

        await Promise.all([conversation.save(), newMessage.save()]);

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

        res.status(201).json(newMessage);

    } catch(err){
        console.log(err);  
    }      
}  

async function getmessages(req , res){
    try {
		const { id: userToChatId } = req.params;
		const senderId = req.userId;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

module.exports = { sendmessage , getmessages };

