
import React, { useState , useEffect } from 'react';
import axios from "axios";
import { useHistory  } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from "react-redux";
import {getUser} from "../../actions/user.actions";




import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './style.css';
import Container from "@material-ui/core/Container";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import Useform from "./Useform";
import Validate from "./Validate";


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
    
    paper: {
    marginTop:20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  inscription:{
    backgroundColor:'white',
    borderRadius:15
  }
}));

export default function SignUp() {
  const classes = useStyles();
  let history = useHistory();
 

const [nom, setNom] = useState("");
const [prenom, setPrenom] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [formation, setFormation] =useState("");

const [errors, setErrors] =useState("");
const [success, setSuccess] =useState("");

//recuperer la valeur de formation 
const [value, setValue] = React.useState(0);
const handleChange = val => {setValue(val); if (val===2) { setFormation('etudiant')}else {setFormation('professeur')}} 




const handleRegister = async (e) => {
 
  e.preventDefault();
 const newUserdata = {
   nom:nom,
   prenom:prenom,
   email: email , 
   password:password,
   confirmPassword:confirmPassword,
   formation:formation
                        }
  
 axios
 .post('/signup',newUserdata) 

  .then((res) => {

  console.log(res.data);

  /*const FBIdToken = `Bearer ${res.data.token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;*/
  
  setSuccess(" Bravo ! Veuillez vous Connectez");
 
  
  })

.catch((err) =>{

  setErrors(err.response.data);
  console.log(errors);
  
   } )

  
  
};

 











  return (
    <Container component="main" maxWidth="xs" className={classes.inscription} >
      <CssBaseline />
      <div className={classes.paper} >
      <Avatar  src={process.env.PUBLIC_URL + '/images/logo.jpg'}
                          style={{width:120,height:80,margin:' 0 auto'}} />
                           
 
        <Typography component="h6" variant="h5" style={{marginTop:10}}>
          Inscrivez-vous
        </Typography>
<br/>
        {success  && (
              <Typography variant="body2"  style={{color:'white',background:'lightgreen'}}>
                {success}
              </Typography>
            )}


        <form className={classes.form} noValidate onSubmit={handleRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="nom"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nom"
                autoFocus
                margin="dense" 
                //defaultValue={values.nom}
                onChange={(e) => setNom(e.target.value)} 
                error={errors.nom ? true : false}
                helperText={errors.nom}
              />             
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Prénom"
                name="prenom"
                autoComplete="lname"
                margin="dense" 
                //defaultValue={values.prenom}
                onChange={(e) => setPrenom(e.target.value)}
                error={errors.prenom ? true : false}
                helperText={errors.prenom}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="prenom"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                margin="dense" 
                //defaultValue={values.email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email ? true : false}
                helperText={errors.email}
              />             
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                margin="dense" 
                //defaultValue={values.password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password ? true : false}
                helperText={errors.password}
              />
            </Grid> 
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirmer mot de passe"
                type="password"
                id="confirmpassword"
                autoComplete="current-password"
                margin="dense" 
                //defaultValue={values.confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword ? true : false}
                helperText={errors.confirmPassword}
              />
            <br/>
            <br/>
             <ToggleButtonGroup name="value" type="radio" value={value} onChange={handleChange}>
                <ToggleButton style={{ backgroundColor:'white',color:'blue'}}  value={1}>Enseignant</ToggleButton>
                <ToggleButton style={{ marginLeft:20,backgroundColor:'white',color:'blue'}}value={2}>Etudiant</ToggleButton>
                </ToggleButtonGroup>
                


            </Grid>
            
            <Grid item xs={12}>
              
            </Grid>
       
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           s'inscrire
          </Button>
          <Grid container justify="center" style={{paddingBottom:15}}>
            <Grid item>
              <Link href="/" variant="body2">
                {"Déjà inscrit ? Connectez-vous par ici !"}
              </Link>
            </Grid>
          </Grid>
          <Box style={{marginBottom: 10}}>
              <Copyright />
            </Box>
        </form>
      </div>
     
    </Container>
  );
}

