const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const Photos = require('../models/photos');
const bcrypt = require('bcrypt');

// index route
router.get("/", async (req, res, next) => {
	try {
		const foundUsers = await Users.find();
		res.render('users/index.ejs', {
			users: foundUsers
		})
	} catch (err) {
		next(err);
	}
})

// show route
router.get("/:id", async (req, res, next) => {
	try {
		const foundUser = await Users.findById(req.params.id);
		// res.send(foundUser.photos);
		res.render('users/show.ejs', {
			user: foundUser
		})		
	} catch (err) {
		next(err);
	}
})

// edit route
router.get("/:id/edit", async (req, res, next) => {
	try {
		const foundUser = await Users.findById(req.params.id);
		res.render("users/edit.ejs", {
			user: foundUser,
			index: foundUser.id
		});
	} catch (err) {
		next(err);
	}
})

router.put("/:id", async (req, res, next) => {
	try {
		const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body);
		res.redirect("/users");
	} catch (err) {
		next(err);
	}
})

router.delete("/:id", async (req, res, next) => {
	try {
		const deletedUser = await Users.findByIdAndRemove(req.params.id);
		const photoIds = [];
		for (let i = 0; i < deletedUser.photos.length; i++) {
			// get the photo ids associated with the user, push to array
			photoIds.push(deletedUser.photos[i]._id);
		}
		const deletedPhotos = await Photos.remove({
			_id: {
				$in: photoIds
			}
		})
		res.redirect("/users");
	} catch (err) {
		next(err);
	}
})

module.exports = router;