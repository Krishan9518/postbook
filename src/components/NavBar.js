import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { AppRegistrationRounded, Feed, Home, Login } from "@mui/icons-material";
import classes from "./navbar.module.css"
import User from "./User";

const NavBar = () => {
    const navigate = useNavigate()
    const stepBack = () => {
        navigate(-1)
    }
    const stepForward = () => {
        navigate(+1)
    }

    // pass data conditionally
    const user = JSON.parse(localStorage.getItem("LOGGEDUSER"));

    return (
        <div className={classes.navbar}>
            <div className={classes.links}>
                <h3>Postbook</h3>
                {user && <Link className={classes.link} to="/">
                    <Home />
                    Home
                </Link>}
                {!user &&
                    (<Link className={classes.link} to="/login">
                        <Login />
                        Login
                    </Link>)
                }

                <Link className={classes.link} to="/signup">
                    <AppRegistrationRounded />
                    Signup
                </Link>

                {user && <Link
                    className={classes.link}
                    to={"/posts"}
                    state={
                        user ?
                            { msg: `Welcome, ${user.fullname} here you can see and add your posts` } :
                            { msg: "First you have to login to save your posts." }
                    }
                >
                    <Feed />
                    Post
                </Link>}

            </div>
            <div className={classes.user}>
                <ArrowBackIcon onClick={stepBack} className={classes.navigate} />
                {user && <User />}
                <ArrowForwardRoundedIcon onClick={stepForward} className={classes.navigate} />
            </div>
        </div>
    )
}

export default NavBar