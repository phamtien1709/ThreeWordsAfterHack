const express = require('express');
const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

const Router = express.Router();

const imageController = require('./images/imageController.js');
const wordController = require('./words/wordController.js');

Router.post('/comment', (req, res) => {
	let word = req.body;
	
	wordController.addWord(word)
	.then((addedWordId) => {
		console.log("comment added");
		res.send(addedWordId);
		imageController.appendWord(addedWordId, word.targetPicture)
		.then(() => {
			console.log("appended to picture");
		})
		.catch((err) => {
			console.log(err);
		})
	})
	.catch((err) => {
		console.log(err);
	})
});

Router.get('/:id', (req, res) => {
	let imageId = req.params.id;
	try{
		objectId(imageId);
		imageController.getById(imageId)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			console.log(err);
		})
	}
	catch(err){
		console.log('Catched err');
	}
});

module.exports = Router;
