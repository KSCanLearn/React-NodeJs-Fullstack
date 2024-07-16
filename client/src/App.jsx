import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePosts from "./pages/CreatePosts";

function App() {
	return (
		<div className="App">
			<Router>
				<Link to="/createpost"> Create A Post</Link>
				<Link to="/">Home Page</Link>
				<Routes>
					<Route path="/" element={<Home/>} />
					<Route path="/createpost" element={<CreatePosts/>} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
