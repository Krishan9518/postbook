import { connect } from "react-redux";
import postAction from "./actions/postAction";
import "./post1.css"
function Post1(props) {
    // data object recieved
    const { id, title, desc, image } = props.data;

    const onDeletion = (index) => {
        // const FinalPostsAfterDeletion = props.posts.splice(index,1)
        props.onDelete(index)
        // props.postAction(FinalPostsAfterDeletion)
    }

    const onEditing = (index) => {
        props.onEdit(index)
    }

    return (
        <div className="post">
            <small>{id}</small>
            <h1>{title}</h1>
            <p>{desc}</p>
            <img src={image} alt="preview" />
            <div>
                <button onClick={()=>onEditing(props.index)}>Edit</button>
                <button onClick={()=>onDeletion(props.index)}>Del</button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    ...state
})

const mapDispatchToProps = (dispatch) => ({
    postAction: (payload) => dispatch(postAction(payload))
})

export default connect(mapStateToProps,mapDispatchToProps)(Post1)