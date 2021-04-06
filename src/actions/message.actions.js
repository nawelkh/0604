import { userConstansts } from "./constants";
import firebase from  'firebase';

export const getRealtimeUsers = (email) => {
    return async (dispatch) => {
        dispatch({type: `${userConstansts.GET_REALTIME_USERS}_REQUEST` });
        const db = firebase.firestore();
        const unsubscribe = db.collection("users")
        
       
        //.where("uid", "!=", uid)
        .onSnapshot((querySnapshot) => {
           const users = [];
            querySnapshot.forEach((doc) => {
                if( doc.data().email !== email ){
                   
                    users.push(doc.data());
                }
            
        });
           console.log(users);
          dispatch({type: `${userConstansts.GET_REALTIME_USERS}_SUCCESS`,
          
          payload: {users}
        });
    });
    return unsubscribe;

    }
}

export const updateMessage = (msgObj) => {
    return async dispatch => {

        const db = firebase.firestore ();
        db.collection('conversations')
        .add({
            ...msgObj,
            isView: false ,
            createdAt: new Date().toISOString()
        })
        
        .then((data) =>{
            console.log(data)
            

            //success
           // dispatch({
             //   type: userConstansts.GET_REALTIME_MESSAGES
            //})
        })
        .catch(error =>{
            console.log(error)
        });
    }
}

export const getRealtimeConversations = (user) =>{
    return async dispatch =>{
        const db = firebase.firestore();
        db.collection('conversations')
        
        .where('user_uid_1','in',[user.uid_1, user.uid_2])
        .orderBy('createdAt', 'asc' )
        .onSnapshot((querySnapshot) =>{
            const conversations = [];
            querySnapshot.forEach(doc =>{
                if(
                    (doc.data().user_uid_1 == user.uid_1 && doc.data().user_uid_2 == user.uid_2 )
                    ||
                    (doc.data().user_uid_1 == user.uid_2 && doc.data().user_uid_2 == user.uid_1 )
                ){
                    conversations.push(doc.data())
                }
                if (conversations.length >0){
                    dispatch({
                    type: userConstansts.GET_REALTIME_MESSAGES,
                    payload: {conversations}
                })
                }else{
                    dispatch({
                        type: `${userConstansts.GET_REALTIME_MESSAGES}_FAILURE`,
                        payload : {conversations}
                    })
                }


            });
            console.log(conversations);

        })
    }
}