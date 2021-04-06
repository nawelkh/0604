import firebase from  'firebase';
import { authConstanst } from './constants';

// export const signup = (user) => {
//   return async (dispatch) => {
//       const db = firebase.firestore();
//       dispatch({type:`${authConstanst.USER_LOGIN}_REQUEST`});
//       firebase.auth()
//       .createUserWithEmailAndPassword(user.email, user.password)
//       .then(data => {
//           console.log(data);
//           const currentUser = firebase.auth().currentUser;
//           const name = ` ${user.nom}  ${user.prenom}`;
//           currentUser.updateProfile({
//               displayName: name
//           })
//           .then(() =>{
//               //if you are her means it is updated succefuly
//               db.collection('users')
//               .doc(data.user.email)
//               .set({ // champ de la collection
//                   nom: user.nom,
//                   prenom: user.prenom,
//                   userId: data.user.uid,
//                   formation: user.formation,
//                   createdAt: new Date(),
//                   isOnline: false  
//               })
//               .then(() =>{
//                  //succeful
//                  const loggedInUser = {
//                   nom: user.nom,
//                   prenom: user.prenom,
//                   userId: data.user.uid,
//                   formation: user.formation,
//                   email: user.email,
                 
//                  }
//                  localStorage.setItem('user', JSON.stringify(loggedInUser));
//                  console.log('user logged in successfully...!');
//                  dispatch({
//                      type: `${authConstanst.USER_LOGIN}_SUCCESS`,
//                      payload: { user: loggedInUser}
//                  })
//               })
//               .catch(error =>{
//                   console.log(error);
//                   dispatch({
//                       type:`${authConstanst.USER_LOGIN}_FAILURE`,
//                       payload: {error}
//                   });
//               });
//           });
//       })
//       .catch(error => {
//           console.log(error);
//       })
// }
// }



export const signin = (user) =>{
    return async dispatch =>{
        dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST`});
        firebase.auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) =>{
          console.log(data);
          

          const db = firebase.firestore();
          db.collection('users')
          .doc(data.user.email)
          
          .update({
              isOnline: true //devien true apres clicker sur login 
          })
          .then(() => {
            const name = data.user.displayName.split(' ');
            const nom = name [0]; 
            const prenom = name [1];
  
          const loggedInUser = {
              nom,
              prenom,
              userId: data.user.uid,
              email: data.user.email
             }
             localStorage.setItem('user', JSON.stringify(loggedInUser));
             dispatch({
                 type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                 payload: {user: loggedInUser}
             });
          })
          .catch(error =>{
              console.log(error)
          })
          
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: `${authConstanst.USER_LOGIN}_FAILURE`,
                payload: {error}
            })
        })

    }
}
export const isLoggedInUser = () => {
    return async dispatch =>{
  const user =  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  if(user){
    dispatch({
        type: `${authConstanst.USER_LOGIN}_SUCCESS`,
        payload: {user}
    });
  }else{
    dispatch({
        type: `${authConstanst.USER_LOGIN}_FAILURE`,
        payload: {error: 'Login again please'}
    });
  }
}
}