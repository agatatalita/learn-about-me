'use strict';
const Database = require('arangojs');
const db = new Database({url:'http://127.0.0.1:8529'});
module.exports = {

	getAllUsers : function() {
		db.useBasicAuth('root');
		db.useDatabase('lamDB');
		return db.query('FOR x IN Users RETURN x')
				.then(function (cursor) { return cursor.all();});
	}

}