const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/byPostId/:postId", async (req, res) => {
	const postId = req.params.postId;
	const comments = await Comments.findAll({ where: { PostId: postId } });
	res.json(comments);
});

router.post("/new", validateToken, async (req, res) => {
	const comment = req.body;
	const username = req.user.username; // req.user is passed from AuthMiddleware.js
	comment.username = username;
	await Comments.create(comment);
	res.json(comment);
});

router.delete("/delete/:commentId", validateToken, async (req, res) => {
	const commentId = req.params.commentId;

	await Comments.destroy({
		where: {
			id: commentId,
		},
	});

	res.json({msg: "DELETED SUCCESSFULLY"});
});

module.exports = router;
