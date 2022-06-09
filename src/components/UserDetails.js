import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./userdetails.module.css"

const UserDetails = () => {
    const USER = JSON.parse(localStorage.getItem("LOGGEDUSER"))

    const navigate = useNavigate();

    React.useEffect(() => {
        if (!USER) {
            navigate("/login", { state: { msg: "Login first then you can access." } })
        }
    }, [])

    return (
        <div className={classes.user}>
            <h2>Here you can see {USER && USER.fullname}'s Details</h2>
            <h3>Name: {USER && USER.fullname}</h3>
            <h3>Email: {USER && USER.email}</h3>
        </div>
    )
}

export default UserDetails