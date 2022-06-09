import React from "react";
import useNavigate from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate()

    const goToLogin = () => {
        navigate("/login")
    }

    const goToSignUp = () => {
        navigate("/signup")
    }
    return(
        <>
            <h1>Page not found</h1>
            <h3>You can visit below pages to access to this site</h3>
            <button onClick={goToLogin}>Login Page</button>
            <button onClick={goToSignUp}>Signup Page</button>
        </>
    )
}

export default NotFound