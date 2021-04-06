import { userConstansts } from "../actions/constants"

const intiState = {
    users: [],
    conversations:[]
}


export default (state= intiState, action) => {
    switch(action.type){
        case `${userConstansts.GET_REALTIME_USERS}_REQUEST`:
            break;
        case  `${userConstansts.GET_REALTIME_USERS}_SUCCESS`:
            state = {
                ...state,
                users: action.payload.users
            }
            break;
        case userConstansts.GET_REALTIME_MESSAGES:
            state = {
                ...state,
                conversations: action.payload.conversations
            }
            break;
            
    }

    return state;

}