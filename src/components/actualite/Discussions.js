import React from 'react';
import clsx from 'clsx';
import { makeStyles,useTheme,InputBase,  Avatar,Button,Typography,Box,Badge ,withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';

import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SearchIcon from '@material-ui/icons/Search';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'; 

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: 0,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
   
  },
  drawerPaper: {
    
   
  },
  disButton: {
    marginRight: theme.spacing(2),
  },
  
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    
  },
  disc:{
   
    top:60,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  hide: {
    display: 'none',
  },
  search: {
    flexGrow: 0.3,
    
    position: 'relative',
    borderRadius: 15,
    backgroundColor:' #9bafbd24',
    border:'1px solid #f1f1f1',
    bottom: 5,
   
    [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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
    color:'#04043885',
  },
  inputRoot: {
    color: '#a09e9e',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 32,
    top: 45,
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: '#49f0d3',
    minWidth:6,
    width:4,
    height:15,
  }, 
}))(Badge);

const Discussions = () => {
  const classes = useStyles();
  const theme = useTheme();
  
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    
    setOpen(!open);
  };
 
  return (
    <div className={classes.root}>
      <CssBaseline />
     
      <Drawer
      
        className={classes.drawer}
        variant="permanent"
        
        anchor="right"
        
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.disc,{
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            
          }),
        }}
        
      >
        
        
     <Box display='flex'>
        < Button  onClick={handleClick} style={{ marginBottom:20 ,
    top: 10,width: 45,left: 20,backgroundColor: '#f5fbff',
    height: 30,padding: 0,minWidth: 0,  }}>
          
          {open ? <ChevronRightIcon  /> : <ChevronLeftIcon  />}
          
          </Button>
          <h6 style={{marginLeft: 43,marginTop: 15,fontSize:15}}
          className={clsx( {
            [classes.hide]: !open,
          })}
          
          >Amis en ligne </h6>
          
                       
          
          </Box>

                          {/********barre de recherche *********
                          <div className={clsx( {
                            [classes.hide]: !open,
                          })}>

                          <div className={classes.search}
                          
                          >

                <div className={classes.searchIcon}>
                      <SearchIcon  />
                </div>

                <InputBase
                    placeholder="Search…"
                  classes={{root: classes.inputRoot,input: classes.inputInput,}}
                  inputProps={{ 'aria-label': 'search' }}
                    />

                        </div></div>*/}
        <List  style={{ overflowX:'hidden'}}>
      

                    


        <ListItem button style={{ marginBottom:20
              }}>
                
          <ListItemIcon>

          <StyledBadge badgeContent=''  >
          <Avatar alt="Remy Sharp" src={process.env.PUBLIC_URL + '/images/d5.jpg'}  style={{ width: 50,height: 50,
          marginRight:25
              }} />
        </StyledBadge>

          </ListItemIcon>

          <Typography style={{ fontSize: 17, }}> 
          <a >Anna Sthesia</a> <br/>
          <small style={{ fontSize: 15, color:'#777d74'
              }}>Salut</small>
          </Typography>

          </ListItem>
          


          <ListItem button style={{ marginBottom:20
              }}>
          <ListItemIcon>

          <StyledBadge badgeContent=''  >
          <Avatar alt="Remy Sharp" src={process.env.PUBLIC_URL + '/images/d2.jpg'}  style={{ width: 50,height: 50,
          marginRight:25
              }} />
        
        </StyledBadge>

          </ListItemIcon>

          <Typography style={{ fontSize: 17,
              }}>Paul Molive <br/>
          <small style={{ fontSize: 15, color:'#777d74'
              }}>Salut</small>
          </Typography>
          </ListItem>


          <ListItem button style={{ marginBottom:20
              }}>
          <ListItemIcon>

          <StyledBadge badgeContent=''  >

          <Avatar alt="Remy Sharp" src={process.env.PUBLIC_URL + '/images/d3.jpg'}  style={{ width: 50,height: 50,
          marginRight:25
              }} />
        
        </StyledBadge>

          </ListItemIcon>
          <Typography style={{ fontSize: 17,
              }}>Anna Mull <br/>
          <small style={{ fontSize: 15, color:'#777d74'
              }}>Salut</small>
          </Typography>
          </ListItem>


          <ListItem button style={{ marginBottom:20
              }}>
          <ListItemIcon>

          <StyledBadge badgeContent=''  >

          <Avatar alt="Remy Sharp" src={process.env.PUBLIC_URL + '/images/d4.jpg'}  style={{ width: 50,height: 50,
          marginRight:25
              }} />
        
        </StyledBadge>
          </ListItemIcon>
          <Typography style={{ fontSize: 17,
              }}>Barb Ackue <br/>
          <small style={{ fontSize: 15, color:'#777d74'
              }}>Salut</small>
          </Typography>
          </ListItem>


          <ListItem button style={{ marginBottom:20
              }}>
          <ListItemIcon>

          <StyledBadge badgeContent=''  >

          <Avatar alt="Remy Sharp" src={process.env.PUBLIC_URL + '/images/p2.jpg'}  style={{ width: 50,height: 50,
          marginRight:25
              }} />
        
        </StyledBadge>
          </ListItemIcon>
          <Typography style={{ fontSize: 17,
              }}>Paul Molive <br/>
          <small style={{ fontSize: 15, color:'#777d74'
              }}>Salut</small>
          </Typography>
          </ListItem>
          
        </List>
       
      </Drawer>
   
    </div>
  );
}
export default Discussions



