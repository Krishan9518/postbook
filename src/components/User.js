import React from "react";
import { Dropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { Email, Feed, Logout, Person, VerifiedUser } from "@mui/icons-material";

const User = () => {

    const navigate = useNavigate();

    // Here we are logging user out
    const logoutHandler = () => {
        navigate("/login", { state: { msg: "Hi, You successfully logged out" } });
        localStorage.removeItem("LOGGEDUSER");
        localStorage.removeItem("ACCESSTOKEN");
    }

    const USER = JSON.parse(localStorage.getItem("LOGGEDUSER"))

    const accessToken = USER && USER.token;

    const moveToPosts = () => {
        if (!accessToken) {
            navigate("/posts", { state: { msg: "First you have to login to save your posts." } });
        }
        if (accessToken) {
            navigate("/posts", { state: { msg: `Welcome, ${USER.fullname} here you can see and add your posts` } })
        }
    }

    React.useEffect(() => {
        if (!USER) {
            navigate("/login", { state: { msgOfDetails: "You logged out first login to see user details" } });
        }
    }, [])

    const moveToDetails = () => {
        if (USER) {
            navigate("/details")
        }
        if (!USER) {
            navigate("/login", { state: { msgOfDetails: "You logged out first login to see user details" } });
        }
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {USER && USER.fullname}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={moveToDetails}>{USER && <><Person /> {USER.fullname}</>}</Dropdown.Item>
                <Dropdown.Item>{USER && <><Email /> {USER.email}</>}</Dropdown.Item>
                <Dropdown.Item onClick={moveToPosts}><Feed /> Posts</Dropdown.Item>
                {accessToken && <Dropdown.Item onClick={logoutHandler}><Logout /> Logout</Dropdown.Item>}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default User;