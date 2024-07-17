// @ts-nocheck

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
    const navigate = useNavigate();

	const login = () => {
		const data = { username: username, password: password };
        
		axios.post("http://localhost:3001/auth/login", data).then((resp) => {
			if (resp.data.error) 
                alert(resp.data.error);
            else {
                sessionStorage.setItem("token", resp.data.accessToken);
                navigate("/");
            }
            

		});
	};
	return (
		<div className="loginContainer">
			<label>Username:</label>
			<input
				type="text"
				onChange={(event) => {
					setUsername(event.target.value);
				}}
			/>
			<label>Password:</label>
			<input
				type="password"
				onChange={(event) => {
					setPassword(event.target.value);
				}}
			/>

			<button onClick={login}> Login </button>
		</div>
	);
};

export default Login;
