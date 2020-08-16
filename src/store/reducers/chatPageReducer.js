const defaultState = {
    chatPageToMeet: 0,
    chatPageMessage: [],

    toMeetUserId: '',

}

export default function chatPageReducer(state = defaultState, action) {
    //Reducer只能接受state， 不能改变state
    switch (action.type) {
        case 'CHANGE_CHATPAGE_TOMEET':
            return Object.assign({}, state, {
                chatPageToMeet: action.chatPageToMeet
            })
        case 'SAVE_TOMEET_USER_ID':
            return Object.assign({}, state, {
                toMeetUserId: action.toMeetUserId
            })
        case 'ADD_CHATPAGE_MESSAGE':
            return Object.assign({}, state, {
                chatPageMessage: [...state.chatPageMessage, action.chatPageMessage]
            })
        case 'CLEAR_CHATPAGE_MESSAGE':
            return Object.assign({}, state, {
                chatPageMessage: []
            })
            
        default:
            return state;
    }
}