const defaultState = {
    userInfo: {
        nickName: '',
        id: '',
        grade: '',
        academy: '',
        gender:''

    },
    currentPageId: 1,
}

export default function mainPageReducer(state = defaultState, action) {
    //Reducer只能接受state， 不能改变state
    switch (action.type) {
        case 'SAVE_USER_INFO':
            console.log(action)
            let userInfoTem = Object.assign({}, state.userInfo, action.userInfo);
            return Object.assign({}, state, {
                userInfo: userInfoTem
            })
        case 'CHANGE_CURRENT_PAGE_ID':
            return Object.assign({}, state, {
                currentPageId: action.PageId
            })
        default:
            return state;
    }
}