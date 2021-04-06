import React, { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { isEmpty } from '../../containers/Homepage/date';
import NavBar from '../actualite/drawer';
//import { lougout } from '../../actions';
import './style.css';
/**
* @author
* @function Header
**/

 const Header = (props) => {
   return(
   <div> <NavBar/></div>
//   const [isLoading, setIsLoading] = useState(true);

//   const isEmpty = (value) => {
//     return (
//       value === undefined ||
//       value === null ||
//       (typeof value === "object" && Object.keys(value).length === 0) ||
//       (typeof value === "string" && value.trim().length === 0)
//     );
//   };
  
//   const userData = useSelector((state) => state.userReducer.credentials);

//    useEffect(() => {
//         !isEmpty(userData) && setIsLoading(false);
//       }, [userData]);



//  // const auth = useSelector(state => state.auth);
//   //const dispatch = useDispatch();
//   //const logout = () =>{
//      // dispatch(lougout())
//  // }
//   return(
//     <header className="header">
//     <div style={{display: 'flex'}}>
//       <div className="logo">Web Messenger</div>
      
        
//         <ul className="leftMenu">
//         <li><NavLink to={'/login'}>Login</NavLink></li>
//         <li><NavLink to={'/signup'}>Sign up</NavLink></li>
//       </ul>
    
       
//     </div>
//       <div style={{margin: '20px 0', color: '#fff', fontWeight: 'bold'}}>
//       { `${userData.nom} ${userData.prenom} `}

//       </div>
//     <ul className="menu">
      
    
//         <li>
//         <Link to={'#'} onClick={() => {
//           dispatch(lougout(auth.email))
//         }}>Logout</Link>
//     </li> 
      
        
//     </ul>
// </header>
   )

 }

export default Header