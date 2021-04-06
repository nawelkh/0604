import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  "./styles/components/_card.scss";


const Cardd = ({post}) => {

    const isEmpty = (value) => {
        return (
          value === undefined ||
          value === null ||
          (typeof value === "object" && Object.keys(value).length === 0) ||
          (typeof value === "string" && value.trim().length === 0)
        );
      };
    




      

    const [isLoading, setIsLoading] = useState(true);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();



    useEffect(() => {
        !isEmpty(userData) && setIsLoading(false);
      }, [userData]);










    return (

        <li className="card-container" key={post.screamId}>

{isLoading ? (

<i className="fas fa-spinner fa-spin"></i>
):   (
<>
    <div className="card-left">
      <img
        src={post.userImage}
        
        alt="poster-pic"
      />
    </div>

<div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {post.nom}   {post.prenom}
                </h3>
               
              </div>
              <span>{post.createdAt}</span>
            </div>

</div>

<div className="update-post">
                <h3>
                  {post.body} </h3>
                
              </div>


              <div className="card-footer">
              <div className="comment-icon">
                
                <span>comment= {post.commentCount}</span>
                <span>like= {post.likeCount}</span>
              </div>

        
            </div>
            
       








</>

     )}




     
        </li>












    );



};

export default Cardd;
