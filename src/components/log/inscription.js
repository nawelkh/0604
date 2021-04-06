import React, { useState , useEffect } from 'react';
import axios from "axios";
import { useHistory  } from 'react-router-dom';
import PropTypes from 'prop-types';
import  firebase from "../../util/config.js"   ;
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useDispatch, useSelector } from "react-redux";
import {getUser} from "../../actions/user.actions";


import logo from "../../images/logo.jpg";
import {MdEmail}  from 'react-icons/md' ; 
import {RiLockPasswordFill} from 'react-icons/ri';
import {FaUserAlt} from 'react-icons/fa';
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";




const  Inscription = () => {

  let history = useHistory();
  const dispatch = useDispatch();
//connexion avec google 
  
  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: '/profil',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    
    ],
   
  };
 




//inscription et connexion 
const [nom, setNom] = useState("");
const [prenom, setPrenom] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [formation, setFormation] =useState("");
const [isOnline,setIsonline]=useState(false);
const [errors, setErrors] =useState("");

//recuperer la valeur de formation 
const [value, setValue] = React.useState(0);
const handleChange = val => {setValue(val); if (val===2) { setFormation('etudiant')}else {setFormation('professeur')}} 



//fonction d inscription 
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
 .post('http://localhost:5000/etudiant-e96f9/us-central1/api/signup',newUserdata) 

  .then((res) => {

  console.log(res.data);

  /*const FBIdToken = `Bearer ${res.data.token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;*/
  
  window.alert ("inscription reussite");
  handleClickSignIn();
  
  })

.catch((err) =>{

  setErrors(err.response.data);
  console.log(errors);
  window.alert(errors.nom);
   } )

  
};

 

 

//fonction de connexion 
const handleLogin = (e) => {
 
  e.preventDefault();
  const Userdata = {email: email , password:password};
  axios 
  .post('http://localhost:5000/etudiant-e96f9/us-central1/api/login',Userdata)
 
   .then((res) => {
    
    console.log(res.data);

    const FBIdToken = `Bearer ${res.data.token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
  
    dispatch(getUser());

    history.push('/profil');
       
     
   })
   .catch((err) => {
    
    setErrors(err.response.data);
   
    console.log(errors);
   
   
   }) 

}

 
  //declaration des var pr linterface 
    const [Container,setContainer]=React.useState("container");
    const [DivContainer,setDivContainer]=React.useState("forms-container");

    const handleClickSignUp=()=>{ 
          setContainer(" container sign-up-mode")
          setDivContainer("forms-container sign-up-mode")
        }
    const handleClickSignIn=()=>{
        setContainer(" container ")
        setDivContainer("forms-container")
     }
///////////////////////////////////////////////////////////////////////////

    return (

      <div>
        <div class={Container}>
      <div class={DivContainer}>
        <div class="signin-signup">
             
          <form action="" onSubmit={handleLogin}  class="sign-in-form">

          <img src={logo} alt="" style={{width:"15vh" ,float:"left",marginTop:'5px',marginRight:'20px', borderRadius: "50px"}} align="center" ></img>
           
            <h2 class="title">Se connecter</h2>
           
            <div class="input-field">
                <i><MdEmail/></i>
                <input type="email" placeholder="Email"  id="email" onChange={(e) => setEmail(e.target.value)}   required /> 
            </div>

           <div class="input-field">
                <i ><RiLockPasswordFill/></i>
                <input type="password" placeholder="mot de passe" id="password" onChange={(e) => setPassword(e.target.value)}/>
           </div>

          <input type="submit" value="Connexion" class="btn solid" />
          <a style={{marginTop:50}}  href="/forget" > Mot de passe oublié ?</a>

          </form>

          
          <form action="" onSubmit={handleRegister}  class="sign-up-form">
            
            <h3 class="title">S'inscrire</h3>
              
            <div class="input-field">
            <i><FaUserAlt/></i>
            <input type="text" placeholder="Nom"  id="nom" onChange={(e) => setNom(e.target.value)}   required/>
            </div>

            <div class="input-field">
             <i><FaUserAlt/></i>
            <input type="text" placeholder="Prenom"  id="prenom" onChange={(e) => setPrenom(e.target.value)} required/>
            </div>

             <div class="input-field">
              <i><MdEmail/></i>
              <input type="email" placeholder="Email" id="Email" onChange={(e) => setEmail(e.target.value)}  required/> 
              </div>
             
              <div class="input-field">
                <i ><RiLockPasswordFill/></i>
                <input type="password" placeholder="mot de passe" id="password" onChange={(e) => setPassword(e.target.value)} required/>
                </div>

              <div class="input-field">
                <i ><RiLockPasswordFill/></i>
                <input type="password" placeholder="Confirmer mot de passe" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}  required/>
              </div>

                < div class="input"  >
                <ToggleButtonGroup name="value" type="radio" value={value} onChange={handleChange}>
                <ToggleButton style={{ backgroundColor:'white',color:'black'}}  value={1}>Enseignant</ToggleButton>
                <ToggleButton style={{ marginLeft:80,backgroundColor:'white',color:'black'}}value={2}>Etudiant</ToggleButton>
                </ToggleButtonGroup>
                
                </div>
                
            <input type="submit" class="btn" value="Créer" />
             
              <div class="social-media">
              <StyledFirebaseAuth
              uiConfig={uiConfig}
               firebaseAuth={firebase.auth()}/>
              </div>
              
          </form>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>Welcome To Uniswap</h3>
           
            <p>
          Créez un compte et et swapez avec vos profs et vos amis !
            </p>
            
            <button class="btn transparent" id="sign-up-btn" onClick={handleClickSignUp}>
                Inscription
            </button>
           
          </div>
          
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>Vous possedez déja un compte ?</h3>
            <p>
             Connectez-vous alors !
            </p>
            <button class="btn transparent" id="sign-in-btn" onClick={handleClickSignIn} >
              Connexion
            </button>
          </div>
          <img src="img/register.svg" class="image" alt="" />
        </div>
      </div>
    </div>
</div>  
        

    
    );  
    
}

    Inscription.propTypes = {
  classes: PropTypes.object.isRequired,
  }



   
    
      export default Inscription ;