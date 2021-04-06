import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getScream,getPosts,suppPost} from '../../actions/post.actions';
import { useHistory  } from 'react-router-dom';
import { makeStyles,withStyles, Card,CardMedia,CardContent,CardActions,Collapse,Divider,MenuItem,

  Avatar,IconButton,Typography ,Menu,ListItemIcon,ListItemText,Box } from '@material-ui/core';
import clsx from 'clsx';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';

import Commentaire from './commentaire'
import Like from './like'

import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { dateParser, isEmpty } from "../Utils";



                             {/**css de page */}

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
  
   
    hide:{
      display:'none',
       },

       like:{
        marginLeft:10,
        cursor:'Pointer',
          '&:hover':{
          color:'#50b5ff',
         },
        },
        buttonAbn:{
          backgroundColor:'#50b5ff',
          color:'white',
          cursor:'Pointer',
          position: 'relative',
          left: 60,
          paddingTop: 5,
          paddingBottom: 5,
          borderRadius: 15,
          width: 95,
          paddingLeft: 15,
                '&:hover':{
            backgroundColor:'#3883b78a',

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
  
 
  


                    {/**debut de fonction */}


export default function Stream({post}) {

  const userData = useSelector((state) => state.userReducer);

  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };


  const [isLoading, setIsLoading] = useState(true);
 
  const dispatch = useDispatch();

  ////fonction qui supprime le post////////////////////////
    const deletePost = ()=> { 
      dispatch(suppPost(post.screamId));
      dispatch(getPosts()); 
      
    };


    useEffect(() => { !isEmpty(userData) && setIsLoading(false);}, [userData]);

/////////////////////////////////////////////////////////
const classes = useStyles();
const [expanded, setExpanded] = React.useState(false);
const [Masquer, setMasquer] = React.useState(true);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    const MasquerClick = () => {
      
      setMasquer(!Masquer);
    };
/////////////////////////////////////////////////////////




    return (
       
  <li  key={post.screamId}>

{isLoading ? (

<i  > <CardMedia
                  className={classes.media}
                  image={process.env.PUBLIC_URL + '/images/loader.gif'}
                  title="Paella dish"
                /> </i>
):   (
<>




<div>
           <Card className={classes.root}  className={clsx( {
                        [classes.hide]: !Masquer,
                      })}>

                                
                

                                 {/*********publication content  ********/}


                <CardContent>
                   {/*********publication header ********/}


                      <Box display='flex'style={{marginBottom:20}}>

                            <Avatar alt="Remy Sharp" src={post.userImage} />

                                      
                            <Typography style={{ fontSize: 15,  flexGrow: 1,marginLeft:20}}> 
                            <a > {post.nom}   {post.prenom}</a> <br/>
                            <small style={{ fontSize: 10, color:'#777d74'
                                }}>{dateParser(post.createdAt)}</small>
                            </Typography>

                            <IconButton onClick={handleClick} 
                        
                        >
                                            <MoreVertIcon  />
                                          </IconButton>
                       </Box>

                                  
                       
                          <StyledMenu
                                id="customized-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                               
                          >


                                 <StyledMenuItem  component="button" style={{paddingRight: 30,paddingLeft: 30}}
                                  onClick={deletePost}>
 

                                      <ListItemIcon>
                                      <ClearRoundedIcon fontSize="small" />
                                      </ListItemIcon>

                                      <ListItemText >
                                        <Typography>
                                       supprimer 
                                        </Typography>
                                      </ListItemText>
                                   </StyledMenuItem>

                                
                                  
                          </StyledMenu>


                      <Typography variant="body2" color="black" component="p" style={{ fontSize:19}}>
                      {post.body}
                      </Typography>

                </CardContent>

                                                 {/*********publication photo ********/}
{ (!isEmpty(post.imagePub)) ? (
              
               <CardMedia
                  className={classes.media}
                  image={post.imagePub}
                  title="Paella dish"
                />
):( <h3>    </h3>)}
                                                 {/*********publication icons ********/}

                <CardActions disableSpacing>

                  <Like post ={post} />

                             


                        <IconButton aria-label="share" className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded, })}
                              onClick={handleExpandClick}
                              aria-expanded={expanded}
                              aria-label="show more"
                        >

                            <ChatIcon style={{color:'#fcdd00'}} />

                        </IconButton>

                        {post.commentCount}
                      

                                
                </CardActions>
<Divider/>

                      {/*********commentaires ********/}

                <Collapse in={expanded} timeout="auto" unmountOnExit>

                      <CardContent>


                             <Commentaire post={post} />

                      </CardContent>

                </Collapse>

              </Card>
        </div>

</>
        )}
        </li>
    );
};
