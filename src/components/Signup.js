import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./signup.module.css"

const Signup = () => {

    // Refs to get values
    const fullNameRef = React.useRef('');
    const emailRef = React.useRef('')
    const passwordRef = React.useRef('')
    const confirmPassRef = React.useRef('')
    const universityRef = React.useRef('')

    // const [myData, setMyData] = React.useState({});

    const [error, setError] = React.useState([]);

    const navigate = useNavigate();

    // signup function
    const signUpHandler = (event) => {
        event.preventDefault();
        setError([]);
        // form validation variable
        let error = false
        let fullname = fullNameRef.current.value;
        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        let confirmPass = confirmPassRef.current.value;
        let university = universityRef.current.value

        if (fullname.trim().length < 3) {
            setError((prevErrs) => [...prevErrs, "Name must be of 3 character"]);
            error = true
        }
        if (!email.includes("@")) {
            setError((prevErrs) => [...prevErrs, "Email must be valid"])
            error = true
        }
        if ((password.trim().length < 6) || (password !== confirmPass)) {
            setError((prevErrs) => [...prevErrs, "Both passwords must be same & of at least 6 characters"])
            error = true
        }
        if (university.trim().length < 2) {
            setError((prevErros) => [...prevErros, "University name can't be empty"])
        }

        if (error === true) {
            return;

        } else if (error === false) {
            const dataToSend = {
                fullname: fullname,
                email: email,
                password: confirmPass,
                university: university
            }

            console.log(dataToSend);

            try {
                const signUp = async () => {
                    const URL = "https://server.visionvivante.com:5051/api/register/lecturer"
                    const DATA = JSON.stringify(dataToSend)
                    const response = await axios.post(URL, DATA, {
                        headers: {
                            'content-type': "application/json"
                        }
                    })
                    console.log(response.status);
                    navigate("/login", { state: { firstName: fullname } })
                }
                signUp();
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className={classes.signuppage}>
            <div className={classes.header}>
                <h2>Create new account</h2>
            </div>
            <div className={classes.signupform}>
                <form onSubmit={signUpHandler}>
                    <input type="text" ref={fullNameRef} placeholder="Enter you first name" />
                    <input type="text" ref={emailRef} placeholder="Enter valid email address" />
                    <input type="text" ref={passwordRef} placeholder="Enter password" />
                    <input type="text" ref={confirmPassRef} placeholder="Confirm password" />
                    <input type="text" ref={universityRef} placeholder="Enter your university name." />
                    <div>
                        <button type="submit">Sign Up</button>
                    </div>
                    <ul className={classes.errorbox}>
                        {error && error.map((err, index) =>
                            <li key={index}>{err}</li>
                        )}
                    </ul>
                </form>
                <div>
                </div>
            </div>
        </div>
    )
}

export default Signup;