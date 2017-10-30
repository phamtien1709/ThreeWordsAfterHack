const express = require('express');

const userController = require('./users/userController.js');
const imageController = require('./images/imageController.js');
const wordController = require('./words/wordController.js');

const Router = express.Router();

Router.post('/update', (req, res) => {
	let updatedWord = req.body;
	wordController.updateWord(updatedWord)
	.then((data) => {
		res.send(data);
	})
	.catch((err) => console.log(err));

})


module.exports = Router;