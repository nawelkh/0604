const functions = require("firebase-functions");

const app = require("express")();
const FBAuth =require("./util/fbAuth");

const cors = require('cors');
app.use(cors());

const {getAllScreams,postOneScream,getScream,commentOnScream,likeScream,unlikeScream,deleteScream,getScreamlike,isLikedScream,uploadImagePub,getAllScreamsUsers} = require("./handlers/publications");
const { signup, login,uploadImage,addUserDetails,getAuthenticatedUser ,passwordReset,signinWithGoogle,SendFollowRequest,acceptFollowRequest,getFollow,onFollow} = require("./handlers/users");




;

//scream routes
app.get('/publications', getAllScreams);
app.post('/publication', FBAuth, postOneScream);
app.get('/publication/:screamId', getScream);
app.post('/publication/image', FBAuth, uploadImagePub);
app.get('/publicationsuser',FBAuth, getAllScreamsUsers);

// add new comment 
app.post('/publication/:screamId/comment', FBAuth, commentOnScream);
// delete scream
app.delete('/publication/:screamId', FBAuth, deleteScream);
// like scream
app.get('/publication/:screamId/like', FBAuth, likeScream);
// unlike scream
app.get('/publication/:screamId/unlike', FBAuth, unlikeScream);

//recupere les likes 
app.get('/publication/:screamId/ajouter_like', getScreamlike);


app.post('/publication/:screamId/likedscream', FBAuth, isLikedScream);


/*
app.get('/comment/:commentId/like', FBAuth, likeComment);
app.get('/comment/:commentId/unlike', FBAuth, unlikeComment);*/

//app.post('/club', FBAuth, postClub);
//app.get('/club', FBAuth, getClub);
//app.post('/follow', FBAuth, onFollow);
//app.post('/follows', FBAuth, onFollowing);

//app.post('/unfollow', FBAuth, unFollow);




//users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/passwordReset',passwordReset); 
app.post('/signinWithGoogle',signinWithGoogle);

app.post('/user/image',FBAuth,uploadImage);
app.post('/user',FBAuth,addUserDetails);

app.get('/user',FBAuth,getAuthenticatedUser);


app.post('/add',FBAuth,SendFollowRequest);
app.post('/accept',FBAuth,acceptFollowRequest);

app.get('/getamis',FBAuth,getFollow);
app.post('/add', FBAuth, onFollow);




exports.api = functions.https.onRequest(app);
