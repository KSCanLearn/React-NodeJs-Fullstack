import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const Post = () => {
	const { id: postId } = useParams();
	const [postObj, setPostObj] = useState({
		id: "",
		title: "",
		postText: "",
		username: "",
	});
	const [comments, setComments] = useState([
		{ id: 0, commentBody: "", PostId: "" },
	]);
	const [newComment, setNewComment] = useState("");
	const { authState } = useContext(AuthContext);

	useEffect(() => {
		axios.get(`http://localhost:3001/posts/byId/${postId}`).then((res) => {
			setPostObj(res.data);
		});

		axios
			.get(`http://localhost:3001/comments/byPostId/${postId}`)
			.then((resp) => {
				setComments(resp.data);
			});
	}, []);

	function addComment() {
		axios
			.post(
				"http://localhost:3001/comments/new",
				{
					commentBody: newComment,
					PostId: postId,
				},
				{
					headers: {
						accessToken: localStorage.getItem("token"),
					},
				}
			)
			.then((resp) => {
				if (resp.data.error) alert(resp.data.error);
				// OP done like this:
				// const commentToAdd = { commentBody: newComment };
				// setComments([...comments, commentToAdd]);

				// For now redundant the code, later code refactor this to reuseable
				axios
					.get(`http://localhost:3001/comments/byPostId/${postId}`)
					.then((resp) => {
						setComments(resp.data);
					});
				setNewComment("");
			});
	}

	function onDeleteComment(commentId) {
		axios
			.delete(`http://localhost:3001/comments/delete/${commentId}`, {
				headers: {
					accessToken: localStorage.getItem("token"),
				},
			})
			.then((resp) => {
				alert(resp.data.msg);
				setComments(
					comments.filter((val) => {
						return val.id !== commentId;
					})
				);
				// Or call server again to fetch:
				// axios
				// 	.get(`http://localhost:3001/comments/byPostId/${postId}`)
				// 	.then((resp) => {
				// 		setComments(resp.data);
				// 	});
			})
			.catch((err) => {
				alert(err);
			});
	}

	return (
		<div className="postPage">
			<div className="leftSide">
				<div className="post" id="individual">
					<div className="title"> {postObj.title} </div>
					<div className="body">{postObj.postText}</div>
					<div className="footer">{postObj.username}</div>
				</div>
			</div>
			<div className="rightSide">
				<div className="addCommentContainer">
					<input
						type="text"
						placeholder="Comment..."
						autoComplete="off"
						value={newComment}
						onChange={(event) => {
							setNewComment(event.target.value);
						}}
					/>
					<button onClick={addComment}> Add Comment</button>
				</div>
				<div className="listCommentsContainer">
					{comments.map((comment, key) => {
						return (
							<div key={key} className="comment">
								{comment.commentBody}
								<label>By: {comment.username}</label>
								{authState.username === comment.username && (
									<button onClick={() => onDeleteComment(comment.id)}>X</button>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Post;
