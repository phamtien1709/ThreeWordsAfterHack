const path = require('path');
const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

const userModel = require('./userSchema');
const userLogModel = require('./userLogSchema');

const getLog = (userId, imageId) => {
	return new Promise(function(resolve, reject){
		userLogModel.findOne( {"userId": userId, "imageId": imageId})
		.exec((err, data) => {
			if(err) reject(err);
				else resolve(data);
		})	
	})
}

const appendWordId = (logId, addedWordId) => {
	return new Promise(function(resolve, reject){
		userLogModel.update(
		{ "_id": objectId(logId) },
		{ $push: {threewords: objectId(addedWordId)} }, (err, data) => {
			if(err) reject(err);
				else resolve(data);
		})
	})
}

const createLog = (logInfo) => {
	return new Promise(function(resolve, reject){
		newLog = new userLogModel({
			userId: logInfo.userId,
			imageId: logInfo.imageId
		});
		newLog.save( (err, data) => {
			if(err) reject(err);
				else resolve(data);
		});
	})	
}

module.exports = {
	getLog,
	appendWordId,
	createLog
}