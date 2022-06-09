const userAction = (payload) => {
    return {
        type: "user",
        payload: payload
    }
}

export default userAction