import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import {Box,Paper,Typography,Avatar, } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',

    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  image:{
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 60,
    width: 60,
    bottom: 45,
    boxShadow: '0 6px 21px 0 rgb(0 0 0 / 12%)',
    border: '3px solid white',

  },
  titre:{
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 20,
    textAlign: 'center',
    position:'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    width:'auto',
    height:50,
    left: 80,
    right: 80,
    bottom: 130,
    color:'black',
    textDecoration:'none',
  },
  titel:{
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 20,
    textDecoration: 'underline',
    marginTop:20,
    textAlign:'center',
    color:'black',
  },
}));













export default function AfficheGroup() {

    const classes = useStyles();
  
    return (
      <div>


        {/********************************partie groupes********************* */}



        <Typography className={classes.titel}>Groupes</Typography>
      <div className={classes.root}>
      <Paper elevation={3} style={{ height: 300,padding:0,width:250}} >
      <img style={{ height: 100,width:250,objectFit: 'cover'}} src={process.env.PUBLIC_URL + '/images/img11.jpeg'}/>
      <Avatar className={classes.image} src={process.env.PUBLIC_URL + '/images/avatar.jpg'}/>
      <Link to={"/groupe"} className={classes.titre}>
          Master 2 ISI
      </Link>
     
       
      
      </Paper>




    </div>




           {/*******************************partie pages**************************** */}



    <Typography className={classes.titel}>Pages</Typography>


    <div className={classes.root}>
      <Paper elevation={3} style={{ height: 200,padding:0,width:250}} >

      
<div style={{height:90,width:'100%',}}>
<img style={{height:'100%',width:'100%',}} src={process.env.PUBLIC_URL + '/images/avatar.jpg'}/>

</div>
      <Link to={"/groupe"} className={classes.titre}>
          Master 2 ISI
      </Link>
     
  
      
     
      </Paper>




     

    </div>




    </div>
    )
}
