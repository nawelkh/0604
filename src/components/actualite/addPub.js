import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts , uploadImagePost} from "../../actions/post.actions";
import  axios from 'axios'


import { makeStyles,Divider,TextField ,Box, IconButton,Avatar,CardActions,CardContent,Card } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import PhotoCamera from '@material-ui/icons/PhotoCamera';




const useStyles = makeStyles((theme) => ({
  root: {
     
    '& > *': {
      margin: theme.spacing(1),
      height:50,
      paddingTop: 40,

      marginLeft: 20,
      
    },
    '& .MuiInput-underline':{
       border:0,
    },
    '& .MuiInput-underline:before':{
      borderBottom:0,
    },
    '& .MuiInput-underline:after':{
      borderBottom:0,

    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before':{
      borderBottom:0,

    },
   
  },
 
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  
  },
  
  
  expand: {
   
    marginLeft: 'auto',
  
  },
  input: {
    display: 'none',
  },
  ajouter:{
    border: 0,
 
    height: 37,
    width: 90,
    borderRadius: 10,
    fontSize: 15,
    fontFamily:'"sacramento" ,cursive',
    backgroundColor: '#1085c8',
    color: 'white',
    paddingBottom: 10,
    paddingTop: 5,
   // textTransform: 'uppercase',
   }
  }));


//////////////////////////////////////////////////////////////////////////////////////////////////////
export default function AddPub() {
  
  const userData = useSelector((state) => state.userReducer.credentials);
  const dispatch = useDispatch();

  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };
  const classes = useStyles();
  ////////////////////////////////////////////////////////////////////////////
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState("");
const [file,setFile]=useState();
  
 //////////////////////////////////////////////////////////////////////////////
  useEffect(() => { !isEmpty(userData) && setIsLoading(false);}, [userData]);
 
 //////////////////////////////////////////////////////////////
 const handleImage  = (e) => {
  e.preventDefault();
  
  const data = new FormData();
 
  data.append("file", file);
  window.alert("image publié");
  dispatch(uploadImagePost(data));

 
};



///////////////////////fct ajout post///////////////////////
    const handlePost = async () => {

      const token = localStorage.FBIdToken;
      axios.defaults.headers.common['Authorization'] = token; 

     if (messages){
      const data ={
     email: userData.email,
     body: messages,
     nom:userData.nom,
     prenom:userData.prenom,
     userImage:userData.userImage,};


        await dispatch(addPost(data));
        dispatch(getPosts());
        
      } else {
        alert("Veuillez entrer un message")
      }
      setMessages('');
    };

//////////////////////////////////////////////////////////////////////////////////////


    return (
  
     


<Card  style={{ marginBottom:20,}}>

{isLoading ? (
        <i> <img src={'../../images/loader.gif'} alt=""  style={{width:100,height:100,objectFit: 'cover',borderRadius: '10px 20px 10px 20px'}}/> </i>
      ) : (
        <>



      <CardContent>
      <Box display="flex"alignItems="center"
        style={{height:50
        }}
        
        >
          <Avatar alt="Remy Sharp" src={userData.imageUrl} />
          <TextField id="outlined-basic"  placeholder="Ajoutez un text"
              multiline 
              rows={3}
              className={classes.root}
              name="messages"
             fullWidth
              value={messages}
              onChange={(e)=> setMessages(e.target.value)}
              
              /> 
      
      <IconButton style={{ color:'#1085c8'}}
          className={classes.expand}
          onClick={handlePost}
        >
         <SendIcon/>
        </IconButton>

        </Box>
       
        
      </CardContent>
     <Divider />
     
      <CardActions disableSpacing >
  
      <form action="" onSubmit={handleImage}  style={{display:'flex' }}>  
 
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])} 
        className={classes.input}
      />
      <label htmlFor="file">
 <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
 </label>
     
     <input type="submit" value="ajouter"  className={classes.ajouter} />
      </form>
      
      </CardActions>
      </>
      )}
  
    </Card> 

  


    )
}