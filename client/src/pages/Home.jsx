import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const [listOfPosts, setListOfPosts] = useState([{id:"", title:"", postText:"", username:""}]);
	const navigate = useNavigate();

	// Not the best way to do this
	useEffect(() => {
		axios.get("http://localhost:3001/posts").then((res) => {
			setListOfPosts(res.data);
		});
	}, []);

	return (
		<div>
			{listOfPosts.map((value, key) => {
				return (
					<div key={key} className="post" onClick={() => navigate(`/post/${value.id}`)}>
						<div className="title"> {value.title} </div>
						<div className="body">{value.postText}</div>
						<div className="footer">{value.username}</div>
					</div>
				);
			})}
		</div>
	);
};

export default Home;
