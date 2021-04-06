
const { db,admin } = require('../util/admin');

const config = require('../util/config.js');


exports.getAllScreams = (req,res) => {
    db.
        collection('publications').
        orderBy('createdAt', 'desc').
        get().
        then((data) => {
            let screams = [];
            data.forEach((doc) => {
                screams.push({
                  screamId: doc.id,
                  body: doc.data().body,
                  nom: doc.data().nom,
                  prenom:doc.data().prenom,
              
                  createdAt: doc.data().createdAt,
                  commentCount: doc.data().commentCount,
                  likeCount: doc.data().likeCount,
                  userImage: doc.data().userImage,
                 comments:doc.data().comments,
                  likes:doc.data().likes,
                  imagePub:doc.data().imagePub


                });
            })
            return res.json(screams);
        })
        .catch((err) =>{ console.error(err);
    res.status(500).json({ error: err.code });
});
}


exports.getAllScreamsUsers = (req,res) => {
  db.
      collection('publications').
      where('email', '==', req.user.email).
      
      get().
      then((data) => {
          let screams = [];
          data.forEach((doc) => {
              screams.push({
                screamId: doc.id,
                body: doc.data().body,
                nom: doc.data().nom,
                prenom:doc.data().prenom,
                createdAt: doc.data().createdAt,
                commentCount: doc.data().commentCount,
                likeCount: doc.data().likeCount,
                userImage: doc.data().userImage,
                
                


              });
          })
          return res.json(screams);
      })
      .catch((err) =>{ console.error(err);
  res.status(500).json({ error: err.response.data});
});
}

















exports.postOneScream = (req,res) => {
    if (req.body.body.trim() === '') {
        return res.status(400).json({ body: 'Body must not be empty' });
      }
    const newScream = {
        body: req.body.body,
        
        nom : req.user.nom, 
        prenom:req.user.prenom,
        userImage:req.user.imageUrl,
        
        
        likeCount:0,
        commentCount:0,
      
       createdAt: new Date().toISOString(),
       email:req.user.email
       
   

        
    };
    db.
        collection('publications')
        .add(newScream)
        .then((doc) => {
          
          const resScream = newScream;
         
          res.json(resScream);
        })
        .catch((err) => {
            res.status(500).json({ error: `somthing went wrong` });
            console.error(err);

        });
}


exports.uploadImagePub = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");
  const newScream = {
    body: "",
    email: req.user.email,
    nom : req.user.nom, 
    prenom:req.user.prenom,
    userImage:req.user.imageUrl,
    
    
    
    
    likeCount:0,
    commentCount:0,
  
   createdAt: new Date().toISOString(),}

  const busboy = new BusBoy({ headers: req.headers });

  let imageToBeUploaded = {};
  let imageFileName;
  // String for image token
  

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log(fieldname, file, filename, encoding, mimetype);
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    // 32756238461724837.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    )}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
           
           
          },
        },
      })
      .then(() => {
        // Append token to url
        const imagepub = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        return db.collection(`publications`).add({ 
          email: newScream.email,
          body: newScream.body,
          nom: newScream.nom,
          prenom: newScream.prenom,
          userImage: newScream.userImage,
          likeCount: newScream.likeCount,
          commentCount: newScream.commentCount,
          createdAt: newScream.createdAt,

          imagePub: imagepub });
      })
      .then(() => {
        return res.json({ message: "image uploaded successfully" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: "something went wrong" });
      });
  });
  busboy.end(req.rawBody);
};







exports.getScream = (req, res) => {
  let screamData = {};
  db.doc(`/publications/${req.params.screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Scream not found' });
      }
      screamData = doc.data();
      screamData.screamId = doc.id;
      return db
         .collection('comments')
        .orderBy('createdAt', 'desc')
        .where('screamId', '==', req.params.screamId)
        .get();
        
    })
    .then((data) => {
      screamData.comments = [];
    
      
      data.forEach((doc) => {
        screamData.comments.push(doc.data());
       return db.doc(`/publications/${req.params.screamId}`).update({comments:screamData.comments})
      });

    
  
      return res.json(screamData);

    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
//exports.updateScream=async(req,res)=>{
  //let docref =db.collection('publications').doc(req.body.screamId)
    
      
      // await docref.update({body:req.body.body})
       // res.json({message:"done"});
   // }
        
    
   exports.getScreamlike= (req, res) => {
    let pubData = {};
    db.doc(`/publications/${req.params.screamId}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ error: 'Scream not found' });
        }
        pubData = doc.data();
        pubData.screamId = doc.id;
        return db
           .collection('likes')
          
          .where('screamId', '==', req.params.screamId)
          .get();
          
      })
      .then((data) => {
        pubData.likes = [];
      
        
        data.forEach((doc) => {
          pubData.likes.push(doc.data());
         return db.doc(`/publications/${req.params.screamId}`).update({likes:pubData.likes})
        });
  
      
    
        return res.json(pubData);
  
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
  };





exports.commentOnScream = (req, res) => {
  if (req.body.body.trim() === '')
    return res.status(400).json({ comment: 'Must not be empty' });

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    screamId: req.params.screamId,
    nom: req.user.nom,
    prenom:req.user.prenom,
    userImage: req.user.imageUrl,
    likeCount: 0,
    
    email:req.user.email
  };
  console.log(newComment);

  db.doc(`/publications/${req.params.screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Scream not found' });
      }
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
      return db.collection('comments').add(newComment);
    })
    .then(() => {
      res.json(newComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
};
exports.likeScream = (req, res) => {
  const likeDocument = db
    .collection('likes')
    .where('email', '==', req.user.email)
    .where('screamId', '==', req.params.screamId)
    .limit(1);

  const screamDocument = db.doc(`/publications/${req.params.screamId}`);

  let screamData;

  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: 'Scream not found' });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection('likes')
          .add({
            screamId: req.params.screamId,
            email: req.user.email
          })
          .then(() => {
            screamData.likeCount++;
            return screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            return res.json(screamData);
          });
      } else {
        return res.status(400).json({ error: 'Scream already liked' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
exports.unlikeScream = (req, res) => {
  const likeDocument = db
    .collection('likes')
    .where('email', '==', req.user.email)
    .where('screamId', '==', req.params.screamId)
    .limit(1);

  const screamDocument = db.doc(`/publications/${req.params.screamId}`);

  let screamData;

  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: 'Scream not found' });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: 'Scream not liked' });
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            screamData.likeCount--;
            return screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            res.json(screamData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
exports.deleteScream = (req, res) => {
  const document = db.doc(`/publications/${req.params.screamId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Scream not found' });
      }
      if (doc.data().email !== req.user.email ) {
        return res.status(403).json({ error: 'Unauthorized' });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: 'Scream deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.likeComment = (req, res) => {
  const likeDocument = db
    .collection('likes-comments')
    .where('email', '==', req.user.email)
    .where('commentId', '==', req.params.commentId)
    .limit(1);

  const commentDocument = db.doc(`/comments/${req.params.commentId}`);

  let commentData;

  commentDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        commentData = doc.data();
        commentData.commentId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: 'comment not found' });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection('likes-comments')
          .add({
            commentId: req.params.commentId,
            email: req.user.email,
            nom: req.user.nom,
            prenom: req.user.prenom,
          })
          .then(() => {
            commentData.likeCount++;
            return commentDocument.update({ likeCount: commentData.likeCount });
          })
          .then(() => {
            return res.json(commentData);
          });
      } else {
        return res.status(400).json({ error: 'comment already liked' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
exports.unlikeComment = (req, res) => {
  const likeDocument = db
    .collection('likes-comments')
    .where('email', '==', req.user.email)
    .where('commentId', '==', req.params.commentId)
    .limit(1);

  const commentDocument = db.doc(`/comments/${req.params.commentId}`);

  let commentData;

  commentDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        commentData = doc.data();
        commentData.commentId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: 'comment not found' });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: 'comment not liked' });
      } else {
        return db
          .doc(`/likes-comments/${data.docs[0].id}`)
          .delete()
          .then(() => {
            commentData.likeCount--;
            return commentDocument.update({ likeCount: commentData.likeCount });
          })
          .then(() => {
            res.json(commentData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};



exports.isLikedScream = (req, res ) => {
  let isliked = false ;
  db.collection(`likes`)
  .where("screamId","==",req.params.screamId)
  .where("email","==",req.user.email)
  
  .get()
  .then((doc) => {
    if (doc.size > 0) {
      isliked = true;
   
   
    return res.json(isliked);}

    return res.json(isliked)
  })
  
  
  .catch((err) => {
    console.error(err);
    res.status(500).json({ error: err.code });
  });
};