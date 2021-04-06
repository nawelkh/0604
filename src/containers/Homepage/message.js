 import Chat from './index';
 import  { useDispatch, useSelector } from 'react-redux';
 import React, { useEffect, useState } from 'react';
 
 function Message (){
    const [isLoading, setIsLoading] = useState(true);

    const isEmpty = (value) => {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    };
    
    const userData = useSelector((state) => state.userReducer.credentials);
     
    useEffect(() => {
        !isEmpty(userData) && setIsLoading(false);
      }, [userData]);


return (

<div> 
{isLoading ? (

<h3>in loading </h3> 
  ): (
       
    <Chat email={userData.email} />






  )}
</div>





)











}
export default Message ; 