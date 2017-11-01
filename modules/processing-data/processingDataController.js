const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const processingDataSchema = new Schema({
	id:{
		type: String,
		require: true;
	},
	voters:{
		type: [],
		default: []
	},
	unvoters:{
		type: [],
		default: []
	}
},
{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, collection: 'po'});

module.exports = mongoose.model('processing-data', );