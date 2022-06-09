const postAction = (payload) => {
    return {
        type:"posts",
        payload: payload
    }
}

export default postAction;