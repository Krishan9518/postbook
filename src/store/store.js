import { createStore } from "redux";
import reducer from "../reducer/userReducer";

// export default createStore({
//     reducer: {
//         user: reducer
//     }
// })

export default createStore(reducer)