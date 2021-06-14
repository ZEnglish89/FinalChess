

var mongoose = require("mongoose");

//Schema is a decription (the definition) of the mongoDB document.
var infoSchema = mongoose.Schema({
	ident: {
		required: true,
		unique: true,
		type:String
	},
	name: String,
	wins: Number,
	losses: Number
});

var Info = mongoose.model("Info", infoSchema);

module.exports = Info;
