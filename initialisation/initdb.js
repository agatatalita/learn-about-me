'use strict';
const Database = require('arangojs').Database;
const db = new Database();
let collection
db.useBasicAuth('root');

yield db.createDatabase('lamDBtest334');
db.useDatabase('lamDBtest334');
collection = db.collection('Users');
collection.create();

/*
db.createDatabase('lamDB').then(
  () => console.log('Database created'),
  err => console.error('Failed to create database:', err)
).then(
  () => db.useDatabase('lamDB'),
  err => console.error('failed to bind database', err)
).then(
  () => collection = db.collection('Users'),
  err => console.error('failed to create handle', err)
).then(
  () => collection.create(),
  err => console.error('failed to create collection', err)
);*/



