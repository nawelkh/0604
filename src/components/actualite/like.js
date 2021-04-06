import React, {useEffect, useState } from "react";
import { makeStyles,withStyles,List,ListItem,Avatar,IconButton,Typography ,ListItemIcon,} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import {MdFavorite} from 'react-icons/md'
import Dialog from '@material-ui/core/Dialog';
import { useDispatch,useSelector } from "react-redux";
import { getPosts, getLikes, likePost, unlikePost} from "../../actions/post.actions";
import axios from 'axios'

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

    media: {
      height: 0,
      paddingTop: '56.25%', 
    },
   
   
   
       like:{
       
        cursor:'Pointer',
          '&:hover':{
          color:'#50b5ff',
         },
        },
        

  })); 

  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
     
    },
  
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top:0,
      color: theme.palette.grey[500],
    },
    titre:{
      fontSize:16,
      fontWeight:600,
      marginBottom:10,
    },
  });


  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography className={classes.titre} variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(1),
      width: 350,
       
    },
  }))(MuiDialogContent);


export default function Likes({post}) {


    //control du like 
    const [liked, setLiked] = useState("false");
 
    //redux 
    const dispatch = useDispatch();
    //recuperation des donnes du user connecté 
    //const userData = useSelector((state) => state.userReducer.credentials);
    

    ///////////fonction like///////////////////////////////////////////////////////////////////////////
const testLike=()=>{ 
//verification si lutilsateur a deja aime le post 
axios 
  .post(`http://localhost:5000/etudiant-e96f9/us-central1/api/publication/${post.screamId}/likedscream`)
  .then((res)=> { 
    const valeur = res.data;

    if (valeur===true){
     
    
       
      window.alert('vous avez dislikez ')
        dispatch(unlikePost(post.screamId))
        
        .then(()=> dispatch(getLikes(post.screamId)))
        .then(() => dispatch(getPosts()))
        setLiked("true");
      };
     
   if (valeur===false){
    window.alert('vous avez likez ')

        dispatch(likePost(post.screamId))
        .then(()=> dispatch(getLikes(post.screamId)))
        .then(() => dispatch(getPosts()))
       
        };


    }
    
  
  )
  .catch((err)=> console.log(err));
  

};
  


    
    
//css//////////////////////////////////////////////
    const classes = useStyles();
    
    const [open, setOpen] = React.useState(false);
      const modalOpen = () => {
        setOpen(true);
      };
      const modalClose = () => {
        setOpen(false);
      };

//////////////////////////////////////////////////////



    return (
        <div>
  

{ post.likeCount ===0 && (
            <IconButton>
              <MdFavorite  style={{fontSize:'x-large' ,}}
                                  onClick={testLike}
                                  color="black"
                                
                                  />
                                  </IconButton>
)}
                              
{ post.likeCount !== 0  && (
<IconButton>
              <MdFavorite  style={{fontSize:'x-large' ,}}
                                  onClick={testLike}
                                  color="red"
                                
                                  />
                                  </IconButton>


    
)
}

<a
                                     className={classes.like}
                                     component="button"
                                     onClick={modalOpen} 
                                    
                                    >
                                    {post.likeCount}</a>


                                
                              {/**mentions J'aime affichés si seulemet ya ds jaimes  **/}
{ post.likeCount ===0 ?  (  
    <h5> </h5>
   ) : (
     <> 
 



                    <Dialog  onClose={modalClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={modalClose}>
                        Mentions j'aime
                    </DialogTitle >
                    {post.likes.map((likes) => {

return (
         
                    <DialogContent  dividers>
                    
                        <List>
                        <ListItem >

                        <ListItemIcon>

                            <Avatar alt="Remy Sharp" src={process.env.PUBLIC_URL + '/images/loader.gif'}  />
                            
                            </ListItemIcon>

                            <Typography style={{fontSize:16,  }}>  <a> {likes.email} </a> <br/></Typography>
                            

                        </ListItem>


                        
                        
                        </List>
                        
                    </DialogContent>
                    
           
      )})}                   
      </Dialog>
     
    

     


     

      </>
      )}

 </div>
 
 
 )
}