import { Typography,Card,Box,Grid,Container ,InputBase,Avatar,AppBar,Tabs,Tab,List,ListItem,IconButton,Badge,Hidden,
  ListItemAvatar,ListItemText,Paper,TextField,InputAdornment,Dialog,Divider,Toolbar,Button} from '@material-ui/core';
  import { makeStyles, useTheme,fade, withStyles,} from '@material-ui/core/styles';
  import SearchIcon from '@material-ui/icons/Search';
  import NavBar from '../../components/actualite/drawer';
  import React ,{ useEffect, useState } from 'react'
  import  { useDispatch, useSelector } from 'react-redux';
  import { getAllUsers, getRealtimeConversations, getRealtimeUsers, GET_ALL_USERS, updateMessage } from '../../actions';
  import {FaRocketchat} from 'react-icons/fa'
  import MoreVertIcon from '@material-ui/icons/MoreVert';
  import {VscSmiley} from 'react-icons/vsc';
  import {HiOutlinePhotograph} from 'react-icons/hi';
  import {FiSend} from 'react-icons/fi'
  import Discussions from './discussions';
  import User from './user';
import { event } from 'jquery';
import Slide from '@material-ui/core/Slide';

  
  
  const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
        fontWeight: 400,
        fontStyle: 'normal',   
        fontSize: 14,
        lineHeight: 1.8,
        padding: 0,
        margin: 0,   
        color: '#242939',
      },
      leftPart:{
          padding:20,
          height:'89vh',
          color:'#7f808c',
          backgroundColor:'#f5f6fa'
  
      },
      topElem:{
          width:'100%',
      },
    title:{
      fontWeight: 700,
      color: '#242939',
      marginBottom:30,
  
  
    },
    search: {
      position: 'relative',
      borderRadius: 10,
      backgroundColor: fade( '#9bafbd24', 0.15),
      '&:hover': {
        backgroundColor: fade('#9bafbd24', 0.25),
      },
      marginBottom:20,
  
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: 5,
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: '.9375rem 1.25rem',
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    liste:{
        padding:5,
        backgroundColor:'#f5f6fa',
        '& .MuiTab-root':{
            minWidth:70,
            paddingLeft: 0,
            paddingRight: 20,
        },
        '& .MuiTabScrollButton-root':{
            width:20,
            color:'black'
        },
       '& .MuiTab-labelIcon':{
          textTransform: 'capitalize',
          color:'black'
       }
    },
    phtProfil:{
  width:45,
  height:45,
    },
    disc:{
      height:320,
      overflow:'auto',
      paddingTop: 20,
      paddingBottom:10,
      paddingRight:10,
      '& :hover':{
          backgroundColor:'#d3e3f7',
      }
    },
  nom:{
      color:'#242939',
      fontSize:'.9rem',
      fontWeight:600,
  },
  discont:{
      padding:' 15px 1.25rem',
      backgroundColor:'white',
      borderRadius:10,
      marginBottom: 10,
      cursor:'pointer',
      
  },
  messagebody:{
  width:'100%',
  height:'89vh',
  },
  messageRight:{
      background:'#50b5ff',
  display: 'inline-block',
  padding: '10px 10px',
  borderRadius:'15px 15px 0px 15px' ,
  margin: 5,
  color:'white',
  maxWidth:200,
  wordWrap: "break-word",
    },
  
  
    messageLeft:{
      background: '#afb5b8c2',
  display: 'inline-block',
  padding: '10px 10px',
  borderRadius:'15px 15px 15px 0px',
  margin: 5,
  color:'white',
  maxWidth:200,
  wordWrap: "break-word",
    },
    conv:{
      margin: 0,
      position:' absolute',
      top: '58%',
   borderRadius:5,
   padding:5,
      transform: 'translateY(-50%)',
    },
    icon:{
      margin: 0,
      position:' absolute',
      top: '45%',
   borderRadius:'20%',
   padding:15,
      transform: 'translateY(-50%)',
    },
    iconBtn:{
      fontSize:32,
      color:'#50b5ff'
    },
    writeMsg:{
     width:'65%',
     marginLeft:30,
     marginTop:20,
     flexGrow: '0.8',
    
     '& .MuiInput-underline:before':{
      borderBottom:0,
     },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before':{
      borderBottom:0,
  
    },
    '& .MuiInput-underline:after':{
      borderBottom:0,
  
    },
  ' & .MuiInputBase-multiline.MuiInputBase-marginDense':{
      borderRadius:5,
      backgroundColor:'#e6ebf5',
      padding :10,
  }
    },
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    }));
  
  
  
  
    const StyledBadgeOnline = withStyles((theme) => ({
      badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          animation: '$ripple 1.2s infinite ease-in-out',
          border: '1px solid currentColor',
          content: '""',
        },
      },
      '@keyframes ripple': {
        '0%': {
          transform: 'scale(.8)',
          opacity: 1,
        },
        '100%': {
          transform: 'scale(2.4)',
          opacity: 0,
        },
      },
    }))(Badge);
    
  
  
    const StyledBadgeOffline = withStyles((theme) => ({
      badge: {
        backgroundColor: '#ff9800',
        color: '#ff9800',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
       
      },
     
    }))(Badge);
  
  
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
    
   
  
  const ChatApp = (props) => {


    const [open, setOpen] = React.useState(false);
  
    // const handleClickOpen = () => {
    //   setOpen(true);
    // };
  
    // const handleClose = () => {
    //   setOpen(false);
    // };

    const userData = useSelector((state) => state.userReducer.credentials);
    const dispatch = useDispatch();

    const email = localStorage.Mail;
//window.alert('email');
    const [isLoading, setIsLoading] = useState(true);

    const isEmpty = (value) => {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    };
    
  
  

  


   const classes = useStyles();
    const theme = useTheme();

   const [searchTerm, setSearchTerm] = useState("");

    //const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const [chatStarted, setChatStarted] = useState(false);
    const [chatUser, setChatUser] = useState('');
    const [userpic, setUserpic] = useState('');
    const [message, setMessage] = useState('');
    const [userUid, setUserUid] = useState(null);
    
  
  
   
  
    let unsubscribe;
   
    useEffect(() => {
      if (!isEmpty(userData))
        unsubscribe = dispatch(getRealtimeUsers(userData.email))
        .then(unsubscribe => {
          return unsubscribe;
        })
        .catch(error =>{
          console.log(error);
        })
    }, [userData]);




  //compenentWillUnmount pour une faute!!
  // useEffect(() => {
  //   return () => {
  //     //cleanup
  //     unsubscribe.then(f => f()).catch(error => console.log(error));
  //   }
  
  // }, []);
  
  //initialisation de la conversation 
  const initChat = (user) => {
  
    setChatStarted(true)
    setChatUser(`${user.nom} ${user.prenom}  `)
    setUserUid (user.email);
    setUserpic (`${user.imageUrl}`);
    console.log(user);
  
    dispatch(getRealtimeConversations({ uid_1: userData.email, uid_2: user.email }));
  }
  // la conversation

  const submitMessage =(e) => {
    
  const msgObj = {
    user_uid_1: userData.email,
    user_uid_2: userUid,
    message
  }
  
    //it triggers by pressing the enter key
  

  
  if(message !==""){
    dispatch(updateMessage(msgObj))
    .then(() => {
      setMessage('')
    });
  }
   //console.log(msgObj);
  }
  
// const submitMessage = e => {
//   //it triggers by pressing the enter key
// if (e.keyCode === 13) {
//   submitMessage();
// }
// };



  useEffect(() => {
    !isEmpty(userData) && setIsLoading(false);
  }, [userData]);
  
  
      return (
          <div className={classes.root}>

              {isLoading ? (

<h3>in loading </h3> 
  ): (
  
  
              <Grid fixed style={{marginTop:64,marginLeft:60}}  >
  
                  <NavBar/>
        
                
                      <Box display='flex' >
  
                          <Grid item lg={4} md={4} sm={5} xs={12}>
  
                              <Card elevation={0} className={classes.leftPart}>
                                  
                                  <Box className={classes.topElem}>
                                      <Typography variant="h5"  className={classes.title} >
                                          Chats
                                      </Typography>
  
                                       {/********barre de recherche *********/}
  
                                       <div className={classes.search}>
  
                                          <div className={classes.searchIcon} >
                                          <SearchIcon />
                                          </div>
                                          <InputBase
                                          placeholder="Search…"
                                          classes={{
                                              root: classes.inputRoot,
                                              input: classes.inputInput,
                                          }}
                                          onChange={(event) => {
                                            setSearchTerm(event.target.value);
                                          }

                                          }
                                          inputProps={{ 'aria-label': 'search' }}
                                          />
  
                                      </div>
  
                                      <AppBar position="static" elevation={0} style={{backgroundColor:'#f5f6fa' }}>
  
                                        <Tabs className={classes.liste}
                                           
                                              variant="scrollable"
                                              scrollButtons="on"
                                              indicatorColor="primary"
                                              textColor="primary"
                                              >
                                                 {
                                                  user.users.length > 0 ?
                                                  user.users.filter((user)=> {
                                                  const tol = user.nom +''+ user.prenom +'' + user.nom
                                                  const tol1 = user.prenom +'' + user.nom
                                                  const tol2 = user.nom + ''+ user.prenom
                                                  if (searchTerm == ""){
                                                    return user;

                                                  } else if (
                                                    tol.toLowerCase().includes(searchTerm.toLowerCase())||
                                                    tol1.toLowerCase().includes(searchTerm.toLowerCase())||
                                                    tol2.toLowerCase().includes(searchTerm.toLowerCase())
                                                  ){
                                                    return user;
                                                  }
                                                })
                                                  .map(user => {
                                                      return (
                                                      <User
                                                      onClick={initChat} 
                                                      key={user.email} 
                                                      user={user} />
                                                      );
                                                  }) : null
                                                  }  
                                                  
                                          </Tabs>
                                     
                                      </AppBar>
  
  
                                  </Box>
  
                                  <List className={classes.disc}>
  
                                  {
                                                  user.users.length > 0 ?
                                                  user.users.filter((user)=> {
                                                    const tol = user.nom +''+ user.prenom +'' + user.nom
                                                    const tol1 = user.prenom +'' + user.nom
                                                    const tol2 = user.nom + ''+ user.prenom
                                                    if (searchTerm == ""){
                                                      return user;
  
                                                    } else if (
                                                      tol.toLowerCase().includes(searchTerm.toLowerCase())||
                                                      tol1.toLowerCase().includes(searchTerm.toLowerCase())||
                                                      tol2.toLowerCase().includes(searchTerm.toLowerCase())
                                                    ){
                                                      return user;
                                                    }
                                                  })
                                                  .map(user => {
                                                      return (
                                                      <Discussions
                                                      onClick={initChat}
                                                     
                                                      key={user.email} 
                                                      user={user} />
                                                      );
                                                  }) : null
                                                  }  
  
  
                                  </List>
  
                              </Card>
  
  
                          
  
                          </Grid>
                          <Hidden only={['xs']}>
                          <Grid item xl={10} lg={10} md={8} sm={7}  >
                              <Card className={classes.messagebody} elevation={0}>
                              {
                                chatStarted ?

                  
                    <Box style={{borderBottom: '1px solid rgba(245,246,250,.85)',display:'flex'}}>
    
                    <ListItem className={classes.discont}>
                      
                      <ListItemAvatar style={{marginLeft:20}}>
                          
                  <Avatar src={chatStarted ? userpic : ''} alt="" className={classes.phtProfil}  />
              
                </ListItemAvatar>
                <ListItemText  >

                    <Typography className={classes.nom}> 
                    {
                  chatStarted ? chatUser :''}
                    </Typography>
                    <small style={{color:'rgb(139 141 148)'}}> en ligne</small>

                </ListItemText> 

                      </ListItem>

                      <IconButton style={{width:50,height:50,marginTop:'auto',marginBottom:'auto',marginRight:20}}>
                      <MoreVertIcon />
                          </IconButton>                             
                          </Box>
                          
                          : null
                                      } 
  
  
  
                                  <Box style={{height:390,overflowY:'auto',}}>
               {
                 chatStarted ?
                 user.conversations.map(con =>
                  
                 { if (con.user_uid_1 == userData.email)  {
  
  
                    return(
                    <Box style={{ textAlign: 'right',marginRight:20}}>
                    <Typography  className={classes.messageRight }  >{con.message}</Typography>
              </Box>
                    )}
                    else {
                      return(
                      
                          <Box  style={{ textAlign: 'left',marginLeft:20}}>
                          <Typography className={classes.messageLeft} >{con.message}</Typography>
                    </Box>
                      )
                    }
  
  
                  }
                  )
              
                  :<Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >  

{/**************************************************************************** *
<div>
      
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              
            </IconButton>
            <Typography variant="h6" className={classes.title}>
           
  
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>    
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
        </List>
      </Dialog>
    </div>
/}
{/************************************************** */}


                  <Paper className={classes.icon}> <IconButton className={classes.iconBtn} ><FaRocketchat/>
                  </IconButton></Paper>
                  <Paper  className={classes.conv}>Commencer une conversation !</Paper>
               </Grid>
               }
           
               </Box>
              
  
  
          {/********************************************************************************* */}
  
  
          {
                  chatStarted ?
          <Box style={{borderTop: '1px solid rgba(245,246,250,.85)',display:'flex',}}>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rowsMax={2}
            margin="dense" 
            placeholder="write message"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                 submitMessage();
              }
           }}
            multiline
            
          
           
            className={classes.writeMsg}
          />
         
  
          <IconButton style={{fontSize:19,color:'#aeb4b7',marginTop:20,}}> <VscSmiley/></IconButton>
          <IconButton style={{fontSize:19,color:'#aeb4b7',marginTop:20,}}> <HiOutlinePhotograph/></IconButton>
          <IconButton  onClick={submitMessage} 
           style={{fontSize:19,backgroundColor:'#50b5ff',marginTop:20,color:'#fff'}}> <FiSend/></IconButton>
  
  
          </Box>: null
                    
                  }    
  
                              </Card>
                              
                          </Grid>
                          </Hidden > 
                      </Box>
  
  
  
             </Grid>
  )}
          </div>
      ); 
  }
  export default ChatApp ;