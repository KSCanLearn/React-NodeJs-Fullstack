import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import React from "react";

function App() {
	const [listOfPosts, setListOfPosts] = useState([{title:"", postText:"", username:""}]);

  // Not the best way to do this
	useEffect(() => {
		axios.get("http://localhost:3001/posts").then((res) => {
			setListOfPosts(res.data);
		});
	}, []);

	return (
		<div className="App">
			<div>Hello World</div>
			{listOfPosts.map((value, key) => {
				return (
					<div key={key} className="post">
						<div className="title"> {value.title} </div>
						<div className="body">{value.postText}</div>
						<div className="footer">{value.username}</div>
					</div>
				);
			})}
		</div>
	);
}

export default App;
