import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./login.module.css";
import { connect } from "react-redux";
import userAction from "./actions/userAction";
import logoutAction from "./actions/logoutAction";

const Login = (props) => {

    const [data, setData] = React.useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()
    const [warning, setWarning] = React.useState("");
    const [responseError, setResponseError] = React.useState('');
    const [msg, setMsg] = React.useState("")

    const [error, setError] = React.useState([]);

    // React.useEffect(() => {
    //     console.log(error);
    // }, [error])

    const onDataChange = (event) => {
        // destructuring state variable
        const getFinalData = { ...data };
        // defining values according to name
        getFinalData[event.target.name] = event.target.value;
        // updating the state with values
        setData(getFinalData)
    }

    const USER = JSON.parse(localStorage.getItem("LOGGEDUSER"))
    const afterLogout = useLocation();

    React.useEffect(() => {
        if (USER) {
            setWarning("No need to login you are already logged in.")
        }
        const { msg } = afterLogout.state !== null && afterLogout.state;

        if (!USER) {
            setMsg(msg)
        }
    }, [])

    // recieving data from signup page
    const afterSignUp = useLocation()
    const { firstName } = afterSignUp.state !== null && afterSignUp.state;

    const afterHome = useLocation();
    const { msgFromHome } = afterHome.state !== null && afterHome.state;

    const afterDetails = useLocation();
    const { msgOfDetails } = afterDetails.state !== null && afterDetails.state;

    const afterApp = useLocation();
    const { msgFromApp } = afterApp.state !== null && afterApp.state

    const onLoginHandler = (event) => {
        event.preventDefault();
        let _error = false
        setError([])
        if (!data.email.trim().includes("@")) {
            _error = true;
            setError((prevErrors) => [...prevErrors, "Please enter valid email id."]);
        }
        if (data.password.trim().length < 6) {
            _error = true;
            setError((prevErrors) => [...prevErrors, "Password must be of atleast 6 characters."]);
        }
        if (_error) {
            return;
        } else {
            const fetchData = async () => {
                try {
                    const url = "https://server.visionvivante.com:5051/api/login";
                    const dataToSend = JSON.stringify(data)
                    const response = await axios.post(url, dataToSend, {
                        headers: {
                            "content-type": "application/json"
                        }
                    });
                    // console.log(response.status, response.statusText) // 200 'OK'
                    // console.log(response.data.data);
                    const recievedData = response.data.data
                    if (recievedData.token) {
                        localStorage.setItem("LOGGEDUSER", JSON.stringify(recievedData))
                        props.userAction(recievedData)
                        // localStorage.setItem("ACCESSTOKEN", recievedData.token)
                        navigate("/", { state: { msg: "Successfully Logged In" } })
                    }
                } catch (error) {
                    setResponseError(error)
                    console.log(error);
                }

            };
            fetchData();
        }
    }

    props.user && console.log(props.user);

    // iterating errors
    const errorBox = error.map((error, index) => {
        return <li key={index}>{error}</li>
    })

    return (
        <div className={classes.login}>
            <div className={classes.login_page}>
                <h2>Login</h2>
                <p>{firstName && `Hi, ${firstName} Thanks for creating account`}</p>
                <p>{firstName ? "Now, you can Successfully Login" : "You can login with your registered email and password."}</p>
                <p>{msg}</p>
                <p>{msgFromHome}</p>
                <p>{msgOfDetails}</p>
                <p>{warning}</p>
                <p>{msgFromApp}</p>

                <div>
                    {responseError && responseError}
                    <form onSubmit={onLoginHandler} className={classes.loginForm}>
                        <input name="email" onChange={onDataChange} value={data.email} type="text" placeholder="Enter your registered email id" />
                        <input name="password" onChange={onDataChange} value={data.password} autoComplete="true" type="password" placeholder="Enter valid password" />
                        <button type="submit">Login</button>
                        <div>
                            <ul className={classes.errorList}>
                                {
                                    error.length > 0 && errorBox
                                }
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...state
});
const mapDispatchToProps = (dispatch) => ({
    userAction: (payload) => dispatch(userAction(payload)),
    logoutAction: () => dispatch(logoutAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);