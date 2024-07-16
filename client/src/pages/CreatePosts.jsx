import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const CreatePosts = () => {
	const initialValues = { title: "", postText: "", username: "" };

	function onFormSubmit(data) {
		axios.post("http://localhost:3001/posts", data).then((resp) => {
			console.log("IT WORKED!!");
		});
	}

	const validationSchema = Yup.object().shape({
		title: Yup.string().required("You must input a title!"),
		postText: Yup.string().required(),
		username: Yup.string().min(3).max(15).required(),
	});

	return (
		<div className="createPostPage">
			<Formik
				initialValues={initialValues}
				onSubmit={onFormSubmit}
				validationSchema={validationSchema}
			>
				<Form className="formContainer">
					<label>Title: </label>
					<ErrorMessage name="title" component="span" />
					<Field
						autocomplete="off"
						id="inputCreatePost"
						name="title"
						placeholder="(Ex. Title...)"
					/>
					<label>Post: </label>
					<ErrorMessage name="postText" component="span" />
					<Field
						autocomplete="off"
						id="inputCreatePost"
						name="postText"
						placeholder="(Ex. Post...)"
					/>
					<label>Username: </label>
					<ErrorMessage name="username" component="span" />
					<Field
						autocomplete="off"
						id="inputCreatePost"
						name="username"
						placeholder="(Ex. John123...)"
					/>

					<button type="submit"> Create Post</button>
				</Form>
			</Formik>
		</div>
	);
};

export default CreatePosts;
