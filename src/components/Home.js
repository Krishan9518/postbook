import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import logoutAction from "./actions/logoutAction";
import userAction from "./actions/userAction";
import classes from "./home.module.css"
import Post from "./Post";

const Home = (props) => {

    let USER = JSON.parse(localStorage.getItem("LOGGEDUSER"))
    let navigate = useNavigate()
    const [courses, setCourses] = React.useState([]);

    const location = useLocation();
    const { msg } = location.state !== null && location.state

    // It send the user to login if user is not saved in the localStorage
    React.useEffect(() => {
        if (!USER) {
            navigate("/login", { state: { msgFromHome: "First login then you can access homepage" } })
        }
    }, [])

    React.useEffect(() => {
        const URL = "https://server.visionvivante.com:5051/api/course/list";
        if (USER) {
            const ACCESS_TOKEN = USER.token;
            try {
                const fetchData = async () => {
                    const response = await axios.get(URL, {
                        headers: {
                            "content-type": "application/json",
                            "x-access-token": ACCESS_TOKEN,
                        }
                    })
                    setCourses(response.data)
                }
                fetchData();
            } catch (err) {
                console.log(err);
            }
        }
    }, [])

    const postList = props.posts && props.posts.map((post, index) => {
        return <li key={index}>
            <Post heading={post.title} desc={post.desc} image={post.image} />
        </li>
    })

    return (
        <div className={classes.home}>
            <h2>{msg}</h2>
            <section className={classes.homeBody}>
                {/* <div className={classes.header}>
                    <h5>Welcome, {USER ? USER.fullname : "Guest User"}</h5>
                    <h5>{USER && USER.email}</h5>
                </div> */}
                {postList && <ul className={classes.postList}>
                    {
                        postList
                    }
                </ul>}
                {courses.length > 0 && <ul className={classes.postList}>
                    {
                        courses.map((course, index) => {
                            return <li key={index}>
                                <Post heading={course.name} desc={course.course_key} />
                            </li>
                        })
                    }
                </ul>}
            </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);