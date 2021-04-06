import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'



//chemin 
import Actualite from './components/actualite/actualite'
import Groupes from './components/groupes/groupe'
import Groupeslist from './components/groupes/groupesList'
import Profil from './components/profil/profil'
import Inscription from './components/log/inscription'

import Forgetpass from './components/connexion/forget'
import Page  from'./components/groupes/page'
import MyProfil from './components/profil/myProfil'
import Login from './components/connexion/signin'
import Signup from './components/connexion/signUp'


import axios from 'axios'
import { useDispatch } from "react-redux";

import { getUser } from "./actions/user.actions";
import { getPosts} from "./actions/post.actions";

//route special authentification ou non 
import AuthRoute from './util/AuthRoute'
import index from './containers/Homepage/index'
//css 
import "tailwindcss/tailwind.css";
import './App.css';

//pour que lutilisateur cooencté ne peut pas sz direger vers la page connexion/inscription 
import jwtDecode from "jwt-decode";
//import { useEffect } from 'react';


axios.defaults.baseURL =
  'https://us-central1-etudiant-e96f9.cloudfunctions.net/api';




function App() {

  let authenticated;
  const token = localStorage.FBIdToken;
  const dispatch = useDispatch();
  
  if (token) {
  
    const decodedToken = jwtDecode(token);
    
  //deconnexion si le decode est expire 
    if (decodedToken.exp * 1000 < Date.now()) {
      
      authenticated=false;
      localStorage.removeItem('FBIdToken');
      delete axios.defaults.headers.common['Authorization'];
      window.location.href = '/'
     
  //autorisation du headers sinon avec passage du token 
    } else { 
      authenticated=true 
       axios.defaults.headers.common['Authorization'] = token; 
       dispatch(getUser());
       dispatch(getPosts());
      
  
      }
  
  
  }
  

  













  return (
   
    <div className='App'>
       
      <BrowserRouter>
        <Switch>

        <AuthRoute path='/' exact component={Login}  authenticated={authenticated} />
        <AuthRoute path='/signup'  exact component={Signup}  authenticated={authenticated} />


          <Route path='/groupes' component={Groupes} />
          <Route path='/home' exact component={Actualite} />
          <Route path='/profil' exact component={Profil} />
          
          <Route path='/index' exact component={index} />

          <Route path='/myprofil'   component={MyProfil}/>
   
          <Route path='/page' exact component={Page} />
          <AuthRoute path='/inscription' exact component={Inscription} authenticated={authenticated}  />
          
          <Route path='/forget' exact component={Forgetpass} />
          <Route path='/groupesList' component={Groupeslist} />
         
       
       
        </Switch>
      </BrowserRouter>

      
    </div>
    
  );
}

export default App;
