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

/* GET New User page */
router.get('/newuser', function (req, res) {
  res.render('newuser', {title: 'Add New User' });
  //TODO error
});

/* POST to Add User */
router.post('/adduser', function (req,res) {
  //get form values. 
  const user = {
    "username": req.body.username,
    "email": req.body.useremail
  };
  service.addUser(user)
    .then(
      function (result) { console.log(result); res.redirect("/users");},
      function (err) { console.error('failed adding user', err);
      //TODO http code?
      res.send("There was a problem adding the information to the database");
    }
  );
});

/* GET User by key. */
router.get('/:key', function (req, res) {
  //get key value from url
  const userkey = req.params.key;
  console.log("cz dziku ", userkey);
  service.getUserByKey(userkey)
    .then( 
      function (list) {
        console.log(list);
        res.render('userinfo', {"user": list[0] });
      },
      function (err) {
        console.error('failed getting user', err);
        //TODO http code?
        res.send("There was a problem getting the information from the database")
      }

    )
});
// TODO
/* REMOVE USER */

router.get('/:key/update', function (req, res) {
  const userkey = req.params.key;
  console.log("cz dziku ", userkey);
  service.getUserByKey(userkey)
    .then( 
      function (list) {
        console.log(list);
        res.render('userupdate', {"user": list[0]});
      },
      function (err) {
        res.send("Failed to update user.");
        //TODO http code?
      }

    )

});
router.post('/:key/update', function (req, res) {
  const user = {
    "key": req.params.key,
    "username": req.body.username,
    "email": req.body.useremail
  }
  service.updateUser(user).then(
    function (list) {
      console.log(list); res.redirect("/users");
    },
    function (err) {
      res.send("Failed to update user.");
    }
  )
});

/* POST UPDATE USER */
/* GET UPDATE USER */

module.exports = router;
