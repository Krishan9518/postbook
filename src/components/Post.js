import { Reply, ThumbUp } from "@mui/icons-material";
import React from "react";
import classes from "./post.module.css"

const Post = (props) => {

    const [actions, setActions] = React.useState({
        like: false,
        share: false
    })

    const like = () => {
        setActions((prevAction) => {
          return {
              ...prevAction,
              like : !prevAction.like
          }
        })
    }

    const share = () => {
        setActions((prevAction) => {
          return {
              ...prevAction,
              share : !prevAction.share
          }
        })
    }

    return (
        <div className={classes.post + " " + props.className}>
            <h4>{props.heading}</h4>
            <div className={classes.postBody}>
                {props.image && <img src={props.image} alt="post" />}
                <p>{props.desc}</p>
            </div>
            <div className={classes.actions}>
                <ThumbUp className={actions.like && classes.likeShare} onClick={like} />
                <Reply className={actions.share && classes.likeShare} onClick={share} />
            </div>
        </div>
    )
}

export default Post