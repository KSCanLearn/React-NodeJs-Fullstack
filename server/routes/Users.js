// @ts-nocheck

const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
	const { username, password } = req.body;
	bcrypt.hash(password, 1).then((hash) => {
		Users.create({
			username: username,
			password: hash,
		});
		res.json("SUCESSS");
	});
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	const user = await Users.findOne({ where: { username: username } });

	if (user) {
		bcrypt.compare(password, user.password).then((same) => {
			if (!same) {
				return res.json({ error: "Wrong username or password" });
			}

			return res.json({ isLogin: true});
		});
	} else {
		return res.json({ error: "User does not exist" });
	}
});

module.exports = router;
