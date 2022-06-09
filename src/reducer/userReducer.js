const INITIAL_STATE = {
    // user with access token
    user: {},
    // user posts
    posts: [],
    // logout function
    logout: null
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "user":
            return {
                ...state,
                user: action.payload
            }
        case "posts":
            return {
                ...state,
                posts: action.payload
            }
        case "logout":
            return localStorage.removeItem('LOGGEDUSER')
    }
}

export default reducer

// const onDelete = (index) => {
//     testPosts.splice(index, 1)
//     props.postAction(testPosts)
//     console.log(testPosts);
// }