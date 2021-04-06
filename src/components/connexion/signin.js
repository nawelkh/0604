
import React, { useState , useEffect } from 'react';
import axios from "axios";
import { useHistory  } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from "react-redux";
import {getUser} from "../../actions/user.actions";


import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Typography,Container,Paper,Grid,TextField,FormControlLabel,Checkbox,Button,Link,Hidden
,Avatar,Box} from '@material-ui/core';
//import Useform from "./Useform";
//import Validate from "./Validate";

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          UniSwap
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


const useStyles = makeStyles((theme) => ({
    container:{
     marginTop:40


        
    },
   
   
    form:{
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
        marginLeft:15,
        '& .MuiTextField-root': {
          }
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      
    },
    inscription:{
      borderRadius:25,
      marginTop:10,
     
    },
   
  }));




export default function Signin() {
    const classes = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [errors, setErrors] =useState("");


const handleLogin = (e) => {
 
  e.preventDefault();
  const Userdata = {email: email , password:password};
  axios 
  .post('/login',Userdata)
 
   .then((res) => {
    
    console.log(res.data);

    const FBIdToken = `Bearer ${res.data.token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
  
    dispatch(getUser());

    history.push('/myprofil');
       
     
   })
   .catch((err) => {
    
    setErrors(err.response.data);
   
    console.log(errors);
   
   
   }) 

}
   

    return (
       <div>
           
             <Container  maxWidth="md" fixed className={classes.container}>
             <div className={classes.content}  >
                 <Grid  component={Paper} container   xs={12} sm={11} md={12}  >


                 <Hidden only={['sm', 'xs']}>
                     <Grid item xs={false} sm={4} md={6} >
                     <Paper  elevation={0} style={{backgroundColor:'transparent'}} >
                     <img  src={process.env.PUBLIC_URL + '/images/c.png'} alt=''
                          style={{backgroundSize:' cover !important',paddingTop:30, backgroundRepeat: 'no-repeat',
                          position: 'absolute',animation: 'leftRight 5s linear infinite',right: '47%',
                          width: 670,top:70}} />
                     </Paper>
                     </Grid>
                     </Hidden>



                     <Grid item xs={10} sm={10} md={5} className={classes.form} >
                     <Paper  elevation={0} className={classes.form}>
                     <Avatar  src={process.env.PUBLIC_URL + '/images/logo.jpg'}
                          style={{width:150,height:90,margin:' 0 auto'}} />
 
          <Typography component="h6" variant="h5" style={{textAlign:'center',marginTop:20}}> 
            Connexion
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              margin="dense"
              onChange={(e) => setEmail(e.target.value)}   
            
            
              error={errors.email ? true : false}
              helperText={errors.email}
            />  
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              margin="dense"          
              name="password"

              onChange={(e) => setPassword(e.target.value)}
              //value={values.password}
              //onChange={handleChange}
              error={errors.password ? true : false}
             helperText={errors.password}
              
              />
               {errors.general && (
              <Typography variant="body2" style={{color:'white',background:'red'}} >
                {errors.general}
              </Typography>
            )}




            <Button
              type="submit"
             fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Connexion
            </Button>
            
            
              <Grid item style={{textAlign:'center',marginBottom:10}}>
                <Link href="/forget" variant="body2" >
                  Mot de passe oublié ?
                </Link>
              </Grid>
             
              <Grid item style={{textAlign:'center'}}>
                <Link href="/signup" variant="body2"style={{textDecoration:'none'}} >
                  {"Vous n'avez pas encore de compte ?" } <br/>
                  <Button variant="outlined" color="primary" className={classes.inscription}>S'inscrire</Button>
                </Link>
              </Grid>
           
            <Box mt={4} mb={2}>
              <Copyright style={{marginBottom: 10}}/>
            </Box>
          </form>
                     </Paper> 
                     </Grid>
                     
                </Grid>
               
             </div>
             </Container>
        </div>
    );
}
