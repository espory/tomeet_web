import mainPageReducer from "./reducers/mainPageReducer";
import chatPageReducer from "./reducers/chatPageReducer";
import robotPageReducer from "./reducers/robotPageReducer";

const { combineReducers } = require("redux");

const reducer = combineReducers({
    mainPageReducer,
    chatPageReducer,
    robotPageReducer,
})

export default reducer