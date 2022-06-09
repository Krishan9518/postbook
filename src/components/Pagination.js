import { ArrowLeft, ArrowRight } from "@mui/icons-material"
import React from "react"
import { connect } from "react-redux"
import postAction from "./actions/postAction"
import "./pagination.css"
import Post1 from "./Post1"

// Array of Data (from reducer) got throught the props
const Pagination = (props) => {
    // const data = props.data && props.data
    const { dataLimit } = props

    const [postPerPage, setPostPerPage] = React.useState(dataLimit);

    // Page numbers are depends on data.length and dataLimit
    // assume there are 100 posts and we want to show 10 posts per page then automatically 1 - 10 pages will be created

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(props.posts && props.posts.length / postPerPage); i++) {
        pageNumbers.push(i);
    }

    // current page
    const [currentPage, setCurrentPage] = React.useState(1);

    // here data will be organized in paginated form
    const [paginatedData, setPaginatedData] = React.useState([]);

    // function to move to next page
    const goToNextPage = () => {
        // This will not exceed the page limit
        if (currentPage === Math.ceil(props.posts !== null && props.posts.length / postPerPage)) {
            return;
        }
        setCurrentPage((page) => page + 1);
    }

    // function to move to previous page
    const goToPreviousPage = () => {
        setCurrentPage((page) => page - 1);
    }
    const startIndex = currentPage * postPerPage - postPerPage;
    const endIndex = startIndex + postPerPage;

    // change page by clicking on the button
    const changePage = (event) => {
        // to convert the received item to number either "5" or 5
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    // slice of data which is to be shown
    const getPaginatedData = () => {
        // slice the array from start-index to before endIndex
        return props.posts && props.posts.slice(startIndex, endIndex);
    }



    const getPaginationGroup = () => {
        // let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        // // to create a Array by giving its length and fill function to fill values in it
        // return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
        return pageNumbers;
    }

    const changePostPerPage = (event) => {
        setPostPerPage(event.target.value)
    }

    const onDelete = (index) => {
        // Every time Array index reset when move to next page
        const newARR = getPaginatedData()
        // gives us the length of slice
        const newARRL = newARR.length
        newARR.splice(index, 1)
        // ? this is adding new slices to the previous data because after slicing in the getpaginateddata
        // reducer data remain unchanged
        const reducerPosts = props.posts && [...props.posts]
        reducerPosts.splice(startIndex, newARRL, ...newARR)
        props.postAction([...reducerPosts]);
    }

    const onEdit = (index) => {
        props.editCheck(true)
        const newArr = getPaginatedData()
        const newArrLength = newArr.length
        newArr.splice(index, 1, props.eDiteddata && props.eDiteddata)
        const reducerPosts = props.posts && [...props.posts]
        reducerPosts.splice(startIndex, newArrLength, ...newArr)
        props.postAction([...reducerPosts]);
    }

    return (
        <div>
            Posts per page
            <select onChange={changePostPerPage}>
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
            </select>

            <div className="dataContainer">
                {
                    // Mapping of recieved data
                    getPaginatedData().map((d, index) => {
                        return <Post1 key={index + d.title} onDelete={onDelete} onEdit={onEdit} index={index} data={d} />
                    })
                }
            </div>

            <div className="pagination">
                <button onClick={goToPreviousPage} className={`prev ${currentPage === 1 ? 'disabled' : ''}`}>
                    <ArrowLeft />
                </button>
                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${currentPage === item ? 'active' : null}`}
                    >
                        <span>{item}</span>
                    </button>
                ))}

                <button
                    onClick={goToNextPage}
                    className={`next ${currentPage === pageNumbers ? 'disabled' : ''}`}
                >
                    <ArrowRight />
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...state
})

const mapDispatchToProps = (dispatch) => ({
    postAction: (payload) => dispatch(postAction(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)