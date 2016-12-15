'use strict';
const Database = require('arangojs');
const db = new Database({url:'http://127.0.0.1:8529'});
//TODO user authorisation
db.useBasicAuth('root');
db.useDatabase('lamDB');
module.exports = {

	getAllUsers : function() {
		return db.query('FOR x IN Users RETURN x')
				.then(function (cursor) { return cursor.all();});
	},
	getUserByKey : function(userKey) {
	    const bindVars = {'userKey': userKey};
	    return db.query('FOR x IN Users FILTER x._key == @userKey RETURN x', bindVars)
				.then(
					function (cursor) { 
					  return cursor.all();
					},
					//TODO handling errors
					function (err) { 
						console.error('Problem while getting user by Id', err);
					}
				);
	},
	addUser : function(user) {
		const collection = db.collection('Users');
		return collection.save(user);
		//TODO handling errors ?
	},
	updateUser : function(user) {
		const bindVars = {'key': user.key, 'username' : user.username, 'email' :user.email };
		return db.query('FOR x IN Users FILTER x._key == @key UPDATE x WITH { username: @username, email: @email} IN Users', bindVars)
				.then(
					function (cursor) {
						return cursor.all();
					},
					function (err) { 
						console.error('Failed while updating Users Database', err);
					}
				);
	},
	removeUser : function(userKey) {
		const bindVars = {'userKey': key};
		return db.query('FOR x IN Users FILTER x._key == @key REMOVE x IN Users LET removed = OLD RETURN removed', bindVars)
				.then(
					function(cursor) {
						return cursor.all();
					},
					function(err) {
						console.error('Failed while removing User');
					}
				);
	}


}