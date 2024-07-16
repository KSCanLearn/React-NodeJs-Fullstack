import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePosts from "./pages/CreatePosts";
import Post from "./pages/Post";

function App() {
	return (
		<div className="App">
			<Router>
				<div className="navbar">
					<Link to="/">Home Page</Link>
					<Link to="/createpost"> Create A Post</Link>
				</div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/createpost" element={<CreatePosts />} />
					<Route path="/post/:id" element={<Post />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
