'use strict';
const Database = require('arangojs').Database;
const db = new Database();
db.useBasicAuth('root');

yield db.createDatabase('lamDB');
db.useDatabase('lamDB');
const collection = db.collection('Users');
collection.create();



