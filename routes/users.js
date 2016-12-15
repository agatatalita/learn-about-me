let express = require('express');
let router = express.Router();
let service = require('../services/dataServices.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("Geting Users list");
  // geting users list from data service
  service.getAllUsers().then(
  	function (list) {
  	  console.log(list);
  	  //render userlist view with list of users
  	  res.render('userlist', { "userlist": list});
  	},
  	function (err) {
  	  console.error("Getting all users failed: ", err);
  	  res.send("There was a problem getting users list from database")
  	}
  	);
});

module.exports = router;
