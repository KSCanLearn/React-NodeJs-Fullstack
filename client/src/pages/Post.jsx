import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
	const { id } = useParams();
	const [postObj, setPostObj] = useState({
		id: "",
		title: "",
		postText: "",
		username: "",
	});
	const [comments, setComments] = useState([{ commentBody: "", PostId: "" }]);
	const [newComment, setNewComment] = useState("");

	useEffect(() => {
		axios.get(`http://localhost:3001/posts/byId/${id}`).then((res) => {
			setPostObj(res.data);
		});

		axios.get(`http://localhost:3001/comments/byPostId/${id}`).then((resp) => {
			setComments(resp.data);
		});
	}, []);

	function addComment() {
		axios
			.post("http://localhost:3001/comments/new", {
				commentBody: newComment,
				PostId: id,
			})
			.then((resp) => {
				// OP done like this:
				// const commentToAdd = { commentBody: newComment };
				// setComments([...comments, commentToAdd]);
				
				// For now redundant the code, later code refactor this to reuseable 
				axios.get(`http://localhost:3001/comments/byPostId/${id}`).then((resp) => {
					setComments(resp.data);
				});
				setNewComment("");
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
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Post;
