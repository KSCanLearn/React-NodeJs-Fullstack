// @ts-nocheck

const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

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
			const accessToken = sign(
				{ username: user.username, id: user.id },
				"importantsecret" // Should not be hardcode
			);
			return res.json({ isLogin: true, accessToken: accessToken });
		});
	} else {
		return res.json({ error: "User does not exist" });
	}
});

router.get("/verifyauth", validateToken, async (req,res) => {
	res.json(req.user);
})

module.exports = router;
