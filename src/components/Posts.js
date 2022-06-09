import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import logoutAction from "./actions/logoutAction";
import postAction from "./actions/postAction";
import userAction from "./actions/userAction";
import Pagination from "./Pagination";
import Post from "./Post";
import classes from "./posts.module.css"

const Posts = (props) => {

    // post state
    const [data, setData] = React.useState({
        title: "",
        desc: "",
        image: ""
    });

    const [error, setError] = React.useState('');

    const [editedData, setEditedData] = React.useState({})

    // course state
    const [course, setCourse] = React.useState({
        name: "",
        // course_key: "Childuser"
        course_key: ""
    })

    const [edit, setEdit] = React.useState(false);

    const editCheck = (value) => {
        if (edit === false) {
            setEdit(true)
        }
        if (edit === true) {
            if (data.title.trim().length === 0) {
                setError("Title cannot be empty")
                return
            }
            if (data.title.trim().length === 0) {
                setError("Description cannot be empty")
                return
            }
            let _editedData = {
                title: data.title,
                desc: data.desc,
                image: data.image
            }
            setEditedData(_editedData)
            setEdit(false)
        }
    }

    // course array state
    const [courses, setCourses] = React.useState([])

    // posts array state
    const [posts, setPosts] = React.useState([])

    // send to login if user logged out
    const USER = JSON.parse(localStorage.getItem("LOGGEDUSER"));
    const navigate = useNavigate()
    React.useEffect(() => {
        if (!USER) {
            navigate("/login", { state: { msg: "First Login then you can access posts" } })
        }
    }, [])

    // course creating function
    const onCourseChange = (event) => {
        const getFinalCourses = { ...course };
        if (event.target.value.trim().length > 0) {
            getFinalCourses[event.target.name] = event.target.value;
            getFinalCourses["course_key"] = "Child" + Math.floor(Math.random() * Math.random() * 10000000000)
            setCourse(getFinalCourses)
        }
    }

    // posts creating function
    const onPostChange = (event) => {
        const getFinalData = { ...data };
        getFinalData[event.target.name] = event.target.value
        if (event.target.name === "image") {
            var blob = URL.createObjectURL(event.target.files[0]);
            getFinalData[event.target.name] = blob;
        }
        setData(getFinalData)
    }

    const location = useLocation();
    const { msg } = location.state !== null && location.state

    // creating new posts
    const createPostHandler = (event) => {
        event.preventDefault();
        if (data.title.trim().length < 1) {
            setError("Title cannot be Empty")
            return;
        }
        if (data.desc.trim().length < 1) {
            setError("Description cannot be Empty")
            return;
        }
        setPosts((prevPosts) => [...prevPosts, data])
    }

    // dispatching posts to the reducer
    React.useEffect(() => {
        if (posts.length > 0) {
            props.postAction([...posts])
        }
    }, [posts])


    // To create new course
    const createCourseHandler = (event) => {
        event.preventDefault();
        // setCourses((prevCourses) => [...prevCourses, course])
        const user = JSON.parse(localStorage.getItem("LOGGEDUSER"))
        if (user) {

            const token = user.token
            const coursesToSend = JSON.stringify(course)
            try {
                const postData = async () => {
                    const url = "https://server.visionvivante.com:5051/api/create/course"
                    const response = await axios.post(url, coursesToSend, {
                        headers: {
                            "content-type": "application/json",
                            'x-access-token': token
                        }
                    });
                    const recievedData = response
                    console.log(recievedData);
                    const name = recievedData.data.name;
                    const course_key = recievedData.data.course_key
                    console.log(course_key);
                    console.log(course.course_key);
                    setCourses((prevData) => [...prevData, { name: name, course_key: course_key }])
                }
                postData();
            } catch (err) {
                console.log(err)
            }
        }
    }

    // courses from web
    React.useEffect(() => {
        const URL = "https://server.visionvivante.com:5051/api/course/list";
        const USER = JSON.parse(localStorage.getItem("LOGGEDUSER"));
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
                // clearing input field
                setCourses();
            } catch (err) {
                console.log(err);
            }
        }
    }, [])

    return (
        <div className={classes.post}>
            <h2>Create Post</h2>
            <h4>{msg}</h4>
            <div className={classes.postForm}>
                <p style={errorStyle}>{error && error}</p>
                <form onSubmit={createPostHandler}>
                    <input name="title" type="text" onChange={onPostChange} placeholder="Enter post title" />
                    <textarea rows={5} name="desc" onChange={onPostChange} placeholder="Enter post description" />
                    <br />
                    {!data.image && <label htmlFor="image">Select image for your post</label>}
                    {data.image && <img className={classes.preview} src={data.image} alt="preview" />}
                    <input id="image" name="image" type="file" onChange={onPostChange} />
                    {edit === false &&
                        <button type="submit">Post</button>}
                </form>
                {edit === true && <button style={editButtonStyle} onClick={() => editCheck(true)}>Edit</button>}
            </div>
            <div className={classes.postForm}>
                <form onSubmit={createCourseHandler}>
                    <input name="name" type="text" onChange={onCourseChange} placeholder="Enter course title" />
                    <button type="submit">Create</button>
                </form>
            </div>
            <h2>Posts</h2>
            <div className={classes.lists}>
                <div>
                    {props.posts && props.posts.length > 0 ? (
                        <>
                            <Pagination
                                // data={props.posts}
                                // RenderComponent={Post1}
                                eDiteddata={editedData}
                                editCheck={editCheck}
                                title="Posts"
                                // how much posts per page will be shown
                                dataLimit={5}
                            />
                        </>
                    ) : (
                        <h1>No Posts to display</h1>
                    )}
                </div>
                {/* Here Posts will be shown */}
                {/* <ul className={classes.postList}>
                {
                    props.posts && props.posts.map((post, index) => {
                        return (
                            <>
                                <li key={index}>
                                    <Post heading={post.title} image={post.image} desc={post.desc} />
                                </li>
                            </>
                        )
                    })
                }
            </ul> */}
                <div className={classes.postList}>
                    <ul>
                        {
                            courses && courses.map((course, index) => {
                                return <li key={index}>
                                    <Post className={classes.post_one} heading={course.name} desc={course.course_key} />
                                </li>
                            })
                        }
                    </ul>
                    {/* <Post heading="New post" image={PostImage} desc="This is wnother post written to see if there length of the description is larger than how its style behaves with the text." /> */}
                </div>
            </div>
        </div>
    )
}

const errorStyle = {
    color: "white"
}

const editButtonStyle = {
    minWidth: "5rem",
    border: "1px solid black",
    borderRadius: "8px",
    backgroundColor: "rgb(167, 75, 75)",
    padding: "0.3rem"
}

const mapStateToProps = (state) => ({
    ...state
});
const mapDispatchToProps = (dispatch) => ({
    userAction: (payload) => dispatch(userAction(payload)),
    postAction: (payload) => dispatch(postAction(payload)),
    logoutAction: () => dispatch(logoutAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);