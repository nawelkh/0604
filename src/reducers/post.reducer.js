
import {
  GET_POSTS,
  POST_POST,
  ADD_COMMENT,
  GET_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  GET_LIKES,
  DELETE_SCREAM,
  GET_POSTS_USER,
 
    
    
  } from "../actions/post.actions";


const initialState = {};


export default function postReducer(state = initialState, action) {

    switch (action.type) {
        case GET_POSTS:
          return action.payload;

          case POST_POST:
            return action.payload;

            case ADD_COMMENT: 
            return action.payload;

          case GET_SCREAM: 
             return action.payload;

           case LIKE_SCREAM :
             return action.payload;

             case UNLIKE_SCREAM:
               return action.payload;


               case GET_LIKES:
                 return action.payload;

                 case DELETE_SCREAM:
                   return action.payload;

                     case GET_POSTS_USER:
                       return action.payload;




 default:
      return state;
  }





}