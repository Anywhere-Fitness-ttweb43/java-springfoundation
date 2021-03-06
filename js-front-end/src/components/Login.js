import React, { useState, useEffect } from "react";
import axios from "axios";
import loginSchema from '../validation/loginSchema';
import * as yup from 'yup';
import styled from 'styled-components'

const Container = styled.div`
	font-family: sans-serif;
	color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 80vh;
	
	form {
		padding: 2rem;
		background: linear-gradient(180deg,#5c2e85 -12.68%,#762b85 51.91%,#5c2e85 111.27%);
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 50%;
		input {
			border-radius: 4px;
			border: none;
			height: 29px;
			margin: 1rem 0 0 1rem;
		}

		input[name=email] {
			margin-left: 2.6rem;
		}

		button {
			background-color: #FCD900;
			border-radius: 4px;
			border: none;
			margin-top: 0.5rem;
			height: 20px;
			width: 6rem;
			color: #5c2e85;
		}

		button:disabled {
			opacity: 0.5;
		}
	}
`

const Login = (props) => {

	const initialErrors = {
		username: '',
		password: ''
	}
	const initialCredentials = {
		username: '',
		password: ''
	}

	const [credentials, setCredentials] = useState(initialCredentials);
	const [errors, setErrors] = useState(initialErrors);
	const [disabled, setDisabled] = useState(true);

	const login = (e) => {
		e.preventDefault();
		axios
			.post(
				"https://ttweb43-backendjava.herokuapp.com/login",
				`grant_type=password&username=${credentials.username}&password=${credentials.password}`,
				{
					headers: {
						// btoa is converting our client id/client secret into base64
						Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
						"Content-Type": "application/x-www-form-urlencoded",
					},
				},
			)
			.then((res) => {
				console.log(res.data);
				localStorage.setItem("token", res.data.access_token);
				props.history.push("/all");
			});
		console.log(credentials)
	};


	const validateLogin = (name, value) => {
		yup.reach(loginSchema, name)
			.validate(value)
			.then(valid => setErrors(initialErrors))
			.catch(err => setErrors({...errors, [name]: err.errors[0]}))
	}

	useEffect(() => {
		loginSchema.isValid(credentials)
			.then(valid => setDisabled(!valid))
    } ,[credentials])

	const handleChange = (e) => {
		const { name, value } = e.target;

		validateLogin(name, value);
		setCredentials({
			...credentials,
			[name]: value,
		});
	}


	return (
		<Container>
			<form onSubmit={login}>
			<h2>Fitness Login</h2>
				<label>
					Username:
					<input
						type="text"
						name="username"
						value={credentials.username}
						placeholder='username'
						onChange={handleChange}
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						name="password"
						value={credentials.password}
						placeholder='password'
						onChange={handleChange}
					/>
				</label>
				<br/>
				<button disabled={disabled}>Log in</button>
				<div>
					<p>{errors.username}</p>
					<p>{errors.password}</p>
				</div>
			</form>
		</Container>
	);
};

export default Login;
