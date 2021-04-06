import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { addComment, getPosts,getScream } from "../../actions/post.actions";

import{ Box,Typography,Avatar,TextField,Input,Link,InputAdornment, makeStyles,withStyles,} from '@material-ui/core';
import {MdFavorite} from 'react-icons/md'
import { timestampParser } from "../Utils";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
    
     
      height:40,
     paddingTop:15,
     paddingBottom:15,
      borderRadius:10,
     
    },

    '& .MuiLink-underlineHover':{
     
      '&:hover':{
      textDecoration:'none',
     }
   

  },
  
   
  },

  
  

 
 
})); 



const  Commentaire =({ post })=> {

  //fonction control a exporter plutard
  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };



//css
  const [isRed, setIsRed] = React.useState(false)
  const classes = useStyles();
//redux
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer.credentials);
//redux
const postData = useSelector((state) => state.postReducer);


  //recuperation du comment + control du chargemnt 
  const [body, setBody] = useState("");
  const [loading,setLoading]=useState(true)
  
  
 



//fonction qui recupere le comment 
  const handleComment = (e) => {
    e.preventDefault();
  
    const commentData = {
      body:body, 
      email:userData.email,
      nom:userData.nom,
      prenom:userData.prenom,
      userImage:userData.imageUrl,

    };


    if (body) {
          dispatch(addComment(post.screamId , commentData))
          
          .then(()=> dispatch(getScream(post.screamId)),window.alert("commentaire publié "))
          .then(() => dispatch(getPosts()) )
    }else 
         {  window.alert("veuillez entrez un text  ")}

        
setBody('ajouter un commentaire')
     };
///fin fonction 



  useEffect(() => {
    
    if (!isEmpty(post.comments)) setLoading(false);} ,[post.comments]);
 


  return (
    
    <div  className="App">
   
        <TextField 
        fullWidth placeholder="ajouter un commentaire"
         variant="outlined" 
         onChange={(e) => setBody(e.target.value)} 
        className={classes.root}
        style={{ marginBottom:10,}}

InputProps={{ endAdornment:  <InputAdornment position="end"  >
             
<Link className={classes.root} component="button" onClick={handleComment} >
publier
</Link>


                 </InputAdornment>,
        }}
       

        />



{loading ? (
        <i> no comment yet  </i>
      ) : (
        <>

       
   { post.comments.map((comment) => {

return (
         <div key={comment.commentId}>
      <Box display="flex"alignItems="center" >
      
    
                           {/****************photo de profil**************** */}

      <Avatar src={comment.userImage} style={{ marginRight:20}} />


                           {/****************nom utilisateur**************** */}

      <Typography style={{  fontSize: 16,}}>{comment.nom} {comment.prenom} </Typography>
          
        </Box>  

                           {/****************contenu de commentaire**************** */}


        <Typography style={{ fontSize: 14,marginLeft:60,marginBottom:20}}>{comment.body}<br/>


                                   {/****************date**************** */}


          <small style={{ fontSize: 13, color:'#777d74'}}>{timestampParser(comment.createdAt)}</small> 


                           {/****************j'aime**************** */}

                     
                               </Typography>   
                             
  

        
</div> 
    



)})}
</>
 )}
 </div>
 )
 }
export default Commentaire;