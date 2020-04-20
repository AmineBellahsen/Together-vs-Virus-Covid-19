
const crypto 		= require('crypto');
const moment 		= require('moment');
const MongoClient 	= require('mongodb').MongoClient;

var db, businesses;
MongoClient.connect(process.env.DB_URL, { useNewUrlParser: true }, function(e, client) {
	if (e){
		console.log(e);
	}	else{
		db = client.db(process.env.DB_NAME);
		businesses = db.collection('businesses');
		console.log('mongo :: connected to database :: "'+process.env.DB_NAME+'"');
	}
});

/*
	record insertion, update & deletion methods
*/

exports.addNewBusiness = function(newData, callback)
{
	newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
	businesses.insertOne(newData, callback);
}
/*
exports.updateAccount = function(newData, callback)
{
	let findOneAndUpdate = function(data){
		var o = {
			name : data.name,
			email : data.email,
			country : data.country
		}
		if (data.pass) o.pass = data.pass;
		accounts.findOneAndUpdate({_id:getObjectId(data.id)}, {$set:o}, {returnOriginal : false}, callback);
	}
	if (newData.pass == ''){
		findOneAndUpdate(newData);
	}	else { 
		saltAndHash(newData.pass, function(hash){
			newData.pass = hash;
			findOneAndUpdate(newData);
		});
	}
}

exports.updatePassword = function(passKey, newPass, callback)
{
	saltAndHash(newPass, function(hash){
		newPass = hash;
		accounts.findOneAndUpdate({passKey:passKey}, {$set:{pass:newPass}, $unset:{passKey:''}}, {returnOriginal : false}, callback);
	});
}
*/
/*
	account lookup methods
*/
exports.countAllRecords = function(callback){
	businesses.find().count(function(e, res){
		if (e) callback(e)
		else 
		callback(null, res)
	});
}

exports.getOneRecord = function(id){
	var ObjectId = require('mongodb').ObjectId; 
	var o_id = new ObjectId(id);
	return businesses.find({_id:o_id});
}
	
exports.getAllRecords = function(callback)
{
	businesses.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
}
