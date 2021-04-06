
import axios from "axios";


export const GET_USER = "GET_USER";


export const getUser = () => {
  return (dispatch) => {
    return axios
      .get("/user")
      .then((res) => {
        dispatch({
             type: GET_USER, 
             payload: res.data 
          });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadImage = (formData) => {
return (dispatch) => {
const token = localStorage.FBIdToken;
axios.defaults.headers.common['Authorization'] = token; 
 return axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUser());
    })
    .catch((err) => console.log(err.response.data));
};
};


export const updateData =(data)=> { 

return (dispatch)=> {
  return axios
  .post("/user/", data) 
  .then (()=> {
    dispatch(getUser());
  })
  .catch((err)=>console.log(err));

};
};