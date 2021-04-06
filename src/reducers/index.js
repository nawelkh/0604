import { combineReducers } from 'redux';
import userReducer from './user.reducer';

import postReducer from './post.reducer';
import messageReducer from './message.reducer';
import authReducer from './auth.reducer';
import usersReducer from './users.reducer';
const rootReducer = combineReducers({
    auth: authReducer,
    user: messageReducer,
    usersReducer,
    userReducer,
    postReducer,
    
    
   
  });
  export default rootReducer;  