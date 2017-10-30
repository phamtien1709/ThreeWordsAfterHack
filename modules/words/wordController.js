const path = require('path');
const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId();

const wordModel = require('./wordSchema');

const addWord = (word) => {
	return new Promise(function(resolve, reject){
		var newWord = new wordModel({
			content : word.content,
			targetOwner : word.targetOwner,
			targetPicture : word.targetPicture,
			voters : [word.authorId]
		});

		newWord.save( (err, data) => {
			if(err) reject(err);
				else resolve(data);
		});
	});
}

const updateWord = (updatedWord) => {
	return new Promise(function(resolve, reject){
		wordModel.findOne( { "_id": updatedWord._id })
		.exec((err, data) => {
			data.set(updatedWord);
			if(updatedWord.voters === undefined){
				data.set({vote: 0});
				data.set({voters: []});
			};

			data.save((err, updatedData) =>{
				if (err) reject(err);
					else resolve(updatedData);
			})
		})
	})
}

module.exports = {
	addWord,
	updateWord
}