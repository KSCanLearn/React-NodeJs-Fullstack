// @ts-nocheck

import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePosts from "./pages/CreatePosts";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const initalAuthState = {
		username: "",
		id: 0,
		status: false,
	}
	const [authState, setAuthState] = useState(initalAuthState);

	useEffect(() => {
		axios
			.get("http://localhost:3001/auth/verifyauth", {
				headers: {
					accessToken: localStorage.getItem("token"),
				},
			})
			.then((res) => {
				if (res.data.error) setAuthState(initalAuthState);
				else setAuthState({
					username: res.data.username,
					id: res.data.id,
					status: true,
				});
			});
	}, []);

	function logout() {
		localStorage.removeItem("token");
		setAuthState(initalAuthState);
	}

	return (
		<div className="App">
			<AuthContext.Provider value={{ authState, setAuthState }}>
				<Router>
					<div className="navbar">
						<Link to="/">Home Page</Link>
						<Link to="/createpost"> Create A Post</Link>
						{!authState.status ? (
							<>
								<Link to="/login"> Login</Link>
								<Link to="/registration"> Register</Link>
							</>
						) : (
							<>
								<button onClick={logout}>Logout</button>
								<h1>{authState.username}</h1>
							</>
						)}
					</div>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/createpost" element={<CreatePosts />} />
						<Route path="/post/:id" element={<Post />} />
						<Route path="/login" element={<Login />} />
						<Route path="/registration" element={<Registration />} />
					</Routes>
				</Router>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
