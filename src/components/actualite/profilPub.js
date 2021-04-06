
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsUser } from "../../actions/post.actions";

import axios from 'axios'
import { makeStyles, withStyles, MenuItem,IconButton, Typography, Menu} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';

import profilStream from "./profilStream";

/**css de page */ 

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {


      height: 40,
      paddingTop: 15,
      paddingBottom: 15,
      borderRadius: 10,

    },

    '& .MuiLink-underlineHover': {

      '&:hover': {
        textDecoration: 'none',
      }


    },


  },

  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },


  hide: {
    display: 'none',
  },

  like: {
    marginLeft: 10,
    cursor: 'Pointer',
    '&:hover': {
      color: '#50b5ff',
    },
  },
  buttonAbn: {
    backgroundColor: '#50b5ff',
    color: 'white',
    cursor: 'Pointer',
    position: 'relative',
    left: 60,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 15,
    width: 95,
    paddingLeft: 15,
    '&:hover': {
      backgroundColor: '#3883b78a',

    },
  },

}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({


}))(MenuItem);


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),

  },

  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: 0,
    color: theme.palette.grey[500],
  },
  titre: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 10,
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





/**debut de fonction */ 




export default function ProfilPub() {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const posts =  dispatch(getPostsUser())


  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };

 
 
  const token = localStorage.FBIdToken;
  axios.defaults.headers.common['Authorization'] = token; 

  useEffect(() => {
    if (loadPost) {
      dispatch(getPostsUser());
      
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);


  return (
 
   

<div className="thread-container">
  
{loadPost ? (

<img src={'../../images/loader.gif'} alt=""  style={{width:'20%',height:'0%',objectFit: 'cover',borderRadius: '10px 20px 10px 20px'}}/>
  ): (  
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((posts) => {
            return <profilStream post={posts} key={posts.screamId} />;
          })}
      </ul>

  )}
    </div>


      
       
  )   
}
