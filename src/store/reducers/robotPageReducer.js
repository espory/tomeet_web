const defaultState = {
    robotPageMessage: [{
        content: 'Hi，欢迎来到遇见',
        self: false
    }],

}

export default function mainPageReducer(state = defaultState, action) {
    // console.log(state);

    //Reducer只能接受state， 不能改变state
    switch (action.type) {
        case 'ADD_ROBOTPAGE_MESSAGE':
            return Object.assign({}, state, {
                robotPageMessage: [...state.robotPageMessage, action.robotPageMessage]
            })

        default:
            return state;
    }
}




