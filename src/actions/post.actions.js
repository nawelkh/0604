import axios from "axios";


// constantes daction 
export const GET_POSTS = "GET_POSTS";
export const POST_POST = "POST_POST";
export const LIKE_SCREAM="LIKE_SCREAM";
export const UNLIKE_SCREAM="UNLIKE_SCREAM";
export const ADD_COMMENT = "ADD_COMMENT";
export const GET_SCREAM ="GET_SCREAM";
export const GET_LIKES ="GET_LIKES";
export const DELETE_SCREAM="DELETE_SCREAM";
export const GET_POSTS_USER="GET_POSTS_USER";

export const getPosts = () => {
    return (dispatch) => {
      return axios
        .get("/publications")
        .then((res) => {
      
          dispatch({ type: GET_POSTS, payload: res.data });
    
        })
        .catch((err) => console.log(err));
    };
  };


  const token = localStorage.FBIdToken;
  axios.defaults.headers.common['Authorization'] = token; 

  export const getPostsUser = () => {
    return (dispatch) => {
      return axios
        .get("/publicationsuser")
        .then((res) => {
      
          dispatch({ type: GET_POSTS_USER, payload: res.data });
             console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
  };







  export const addPost = (data) => {
    return (dispatch) => {
      return axios
        .post("/publication", data)
        .then((res) => {
          
            dispatch({ type: POST_POST, payload: res.data });
         })

         .catch((err) => console.log(err.response.data));

        };
        
      };

      export const uploadImagePost = (formData) => {
        return (dispatch) => {
        const token = localStorage.FBIdToken;
        axios.defaults.headers.common['Authorization'] = token; 
         return axios
            .post("/publication/image", formData)
            .then(() => {
              dispatch(getPosts());
            })
            .catch((err) => console.log(err.response.data));
        };
        };






      export const addComment = (postId,commentData ) => {
        return (dispatch) => {
          return axios
          .post(`/publication/${postId}/comment`, commentData)


            .then((res) => {
              dispatch({ type: ADD_COMMENT, payload: res.data });
              
            })
            .catch((err) => console.log(err.response.data));
        };
      };


      export const getScream = (postId) =>{
      return (dispatch) => {
        return axios
          .get(`/publication/${postId}`)
          .then((res) => {
            dispatch({
              type: GET_SCREAM,
              payload: res.data
            });
           
          })
          .catch((err) => console.log(err.response.data));
      };
    };






    export const getLikes = (postId) =>{
      return (dispatch) => {
        return axios
          .get(`/publication/${postId}/ajouter_like`)
          .then((res) => {
            dispatch({
              type: GET_LIKES,
              payload: res.data
            });
           
          })
          .catch((err) => console.log(err.response.data));
      };
    };
















    // Like a scream
export const likePost = (postId) =>{
 return (dispatch) => {
 return  axios
    .get(`/publication/${postId}/like`)
    .then((res) => {
      dispatch({
      type: LIKE_SCREAM,
      payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
}

// Unlike a scream
export const unlikePost= (postId) => {
return(dispatch) => {
  return axios
    .get(`/publication/${postId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

}

export const suppPost = (postId) =>{
 return(dispatch) => {
 return  axios
    .delete(`/publication/${postId}`)
    .then(() => {
     
      dispatch({ 
        type: DELETE_SCREAM, 
        payload:dispatch(getPosts()) });
        
        dispatch(getPosts()); 
    })
    .catch((err) => console.log(err));
};
}


