

import { Typography,Card,Box,Grid,Container ,InputBase,Avatar,AppBar,Tabs,Tab,List,ListItem,IconButton,Badge,Hidden,
    ListItemAvatar,ListItemText,Paper,TextField,InputAdornment,} from '@material-ui/core';
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
      }
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
    








 const User = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles();
    const {user, onClick} = props;
    let online =user.isOnline;
    const userData = useSelector((state) => state.userReducer.credentials);
    const isEmpty = (value) => {
        return (
          value === undefined ||
          value === null ||
          (typeof value === "object" && Object.keys(value).length === 0) ||
          (typeof value === "string" && value.trim().length === 0)
        );
      };
      
      
      useEffect(() => {
        !isEmpty(userData) && setIsLoading(false);
      }, [userData]);


    if (online) {
    return(
                                  
              <div>


{/* {isLoading ? (

<h3>in loading </h3> 
): ( */}


                        
                            
                        <Tab onClick={() => onClick(user)}
        icon={
        

            < StyledBadgeOnline
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
          >
        <Avatar className={classes.phtProfil} alt=""  src={user.imageUrl} />
        
        </ StyledBadgeOnline>
        }
        label={user.prenom}  />
{/* )} */}
                  </div>
                   
                          )

    } else {
      return(
     
        <div>

{/* 
        {isLoading ? (
        
        <h3>in loading </h3> 
          ): (
 */}
               

        <Tab onClick={() => onClick(user)}
        icon={
            < StyledBadgeOffline
            overlap="circle"
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
            }}
            variant="dot">
        
        
        <Avatar className={classes.phtProfil} alt="" src={process.env.PUBLIC_URL + '/images/d4.jpg'}  />
        
        </ StyledBadgeOffline> 

        
        }
        label={user.prenom}  />


              
          {/* )}     */}
</div>
                          )

    }
     
  
  }
  export default User ; 