let mongoose = require("mongoose"),
	express = require("express"),
	router = express.Router();

var passport = require('passport');
require('../config/passport')(passport);
	
// Book Model
let bookSchema = require("../models/Book");

//tokan

function getToken(headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };


// CREATE Book
router.route("/create-book").post(passport.authenticate('jwt', { session: false}),(req, res, next) => {
	var token = getToken(req.headers);
    if (token) {
           
	bookSchema.create(req.body, (error, data) => {
		if (error) {
			return next(error);
		} else {
			console.log(data);
			res.json(data);
		//	res.redirect('/')
		}
	});
} else {
	return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

// READ Books
router.route("/").get(passport.authenticate('jwt', { session: false}), (req, res) => {
    var token = getToken(req.headers);
    if (token) { 
	bookSchema.find((error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
} else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

// Get Single Book
router.route("/edit-book/:id").get(passport.authenticate('jwt', { session: false}), (req, res) => {
    var token = getToken(req.headers);
    if (token) {
    
	bookSchema.findById(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.json(data);
		}
	});
} else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

// Update Book
router.route("/update-book/:id").put((req, res, next) => {
	bookSchema.findByIdAndUpdate(
		req.params.id,
		{
			$set: req.body,
		},
		(error, data) => {
			if (error) {
				return next(error);
				console.log(error);
			} else {
				res.json(data);
				console.log("Book updated successfully !");
			}
		}
	);
});

// Delete Book
router.route("/delete-book/:id").delete( passport.authenticate('jwt', { session: false}), (req, res, next) => {
	var token = getToken(req.headers);
    if (token) {
	bookSchema.findByIdAndRemove(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.status(200).json({
				msg: data,
			});

		}
	});
} else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

module.exports = router;
