import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Grid,Box,Hidden,Container,Typography, CardContent,Card,Avatar,GridList,Dialog,Button,
 IconButton} from '@material-ui/core';
import Discussions from '../actualite/Discussions';
import NavBar from '../actualite/drawer';
import AddPub from "../actualite/addPub";
import Publication from '../actualite/publication'
import { AvatarGroup } from '@material-ui/lab';
import {FaUserFriends} from 'react-icons/fa'




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontWeight: 400,
    fontStyle: 'normal',   
    fontSize: 14,
    lineHeight: 1.8,
    padding: 0,
    margin: 0,   
    color: '#777D74',
    background: '#fafafb',
    overflow: 'hidden',
  },
  root1: {
    marginBottom:20,
  },
  description:{
    color: '#646464',
    paddingLeft: 15,
    paddingRight: 15,
    fontSize:15,
    marginTop: 15,
  },

  groupInfo:{
    color: '#646464',
    paddingLeft: 15,
    paddingRight: 15,
    fontSize:14,
  },
  details:{
    color: '#646464',
    fontSize:15,
    marginRight:10,
    fontWeight:600
  },
 
  gridList: {
    width: 350,
    height: 200,
   
  },
  gridList1: {
    width:280,
    height: 300,
   
  },
  image:{
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 160,
    width: 160,
    boxShadow: '0 6px 21px 0 rgb(0 0 0 / 12%)',
    position: 'relative',
    border: '2px solid white',
    bottom: 170,
    borderRadius: 35,
  },
  topimg:{
    marginTop:60,
     marginLeft:40,
     marginRight:45,
     height:260 ,
     marginBottom:20,
     
  },
titre:{
 
    color :'#464646',
    fontWeight:600,
    fontSize:20,
    marginTop: 10,
    
},
btnADD:{
  textTransform: 'lowercase',
  height: 25,
  paddingLeft: 5,
  paddingRight: 5,
  color:'white',
  backgroundColor:'#50b5ff',
  marginTop:25,
  marginLeft:10,
  marginRight:10,
},

}));







function Groupe() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Grid container >
      
           <Container maxWidth="lg" style={{padding:0 ,}} >
       
          

       

        <Grid item lg={1} >
        <NavBar/>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.topimg} > 
                                        

           <img ms={2} src={process.env.PUBLIC_URL + '/images/img2.jpg'}
                  style={{width:'100%',height:'100%',objectFit: 'cover',borderRadius:5,}} />


                                 {/***************groupe name ********************************/}


                <Card>
                <CardContent>
                    <Box display='flex'>     
                <Typography className={classes.titre}>Master 2 ISI   



                {/***************groupe category********************************/}

     <small style={{color:'grey',fontSize:14,fontWeight:500,marginLeft:20}}>@Développement</small></Typography>
               
     <Hidden only={['xs']}>
                  <AvatarGroup max={4} style={{marginLeft:'auto',marginTop:15}}  >
                    <Avatar src={process.env.PUBLIC_URL + '/images/d2.jpg'} />
                    <Avatar src={process.env.PUBLIC_URL + '/images/d3.jpg'} />
                    <Avatar src={process.env.PUBLIC_URL + '/images/p2.jpg'} />
                    <Avatar src={process.env.PUBLIC_URL + '/images/d1.jpg'} />

                  </AvatarGroup>

     </Hidden>
                              
                    <Button variant="outlined" className={classes.btnADD} >
                        rejoindre
                      </Button>
                      
                      </Box> 
          
        
                </CardContent>
            </Card>



         

          
        </Grid>
      
      
                   <Grid item xs={12} style={{ marginTop:10,}} >



                  {/***************groupe pht profil********************************/}

                   <img className={classes.image}  src={process.env.PUBLIC_URL + '/images/i8.jpg'}/>



       

          <Box display="flex" >
         

          <Grid item xs={12} sm={12} lg={7} style={{ marginRight: 25,marginLeft:35 }}>
            <Grid xs={12} sm={12} lg={12} >

           {/***************add publication********************************/}



              <AddPub />
              </Grid>
          


                {/***************groupe info small********************************/}

              <Hidden only={['md','lg','xl']}>                 
              <Card className= {classes.root1} >
         <CardContent>
           <h6 style={{fontSize:17,fontWeight:700,marginTop: 10 ,marginBottom: 30,}}> Groupe Infos</h6>



           <Box display='flex ' className={classes.admin}>
             
             <Avatar  style={{height:50,width:50,}} src={process.env.PUBLIC_URL + '/images/avatar.jpg'}/>
  
             <h6 style={{fontSize:15,fontWeight:600,marginTop: 10 ,marginBottom: 20,marginLeft:20}}>Julia Zessy (Admin)</h6>
  
             </Box>

             <Typography style={{color:'#646464',fontSize:15,marginTop:20,marginBottom:20}}>
               <span style={{fontWeight:600}}>Catégorie : </span>Développement</Typography>

           <Box display='flex'>
           <IconButton> <FaUserFriends/></IconButton>  
             <Typography className={classes.description}> 12 Members</Typography>
           
           </Box>
           
         

        
          
           
        
         </CardContent>
       </Card>
       </Hidden> 



            {/***************photo small********************************/}





  <Hidden only={['md','lg','xl']}>

<Card className= {classes.root1}>
  <CardContent>
    <h6 style={{fontSize:17,fontWeight:700,marginTop: 10 ,marginBottom: 30,}}> Photo Gallery</h6>


    <GridList cellHeight={76}  className={classes.gridList1} cols={3}>
 
     <img src={process.env.PUBLIC_URL + '/images/i9.jpg'} onClick={handleClickOpen} />
     <img src={process.env.PUBLIC_URL + '/images/img.jpg'} />
     <img src={process.env.PUBLIC_URL + '/images/img5.jpg'} />
     <img src={process.env.PUBLIC_URL + '/images/img6.png'} />

</GridList>
   
  </CardContent>
</Card>
</Hidden>






          <Publication/>
        </Grid>



        <Grid item xs={4} style={{ marginRight: 50,}}>




                                 {/***************groupe info ********************************/}

                <Hidden only={['xs','sm']}>                 
       <Card className= {classes.root1} >
         <CardContent>
           <h6 style={{fontSize:17,fontWeight:700,marginTop: 10 ,marginBottom: 30,}}> Groupe Infos</h6>



           <Box display='flex ' className={classes.admin}>
             
             <Avatar  style={{height:50,width:50,}} src={process.env.PUBLIC_URL + '/images/avatar.jpg'}/>
  
             <h6 style={{fontSize:15,fontWeight:600,marginTop: 10 ,marginBottom: 20,marginLeft:20}}>Julia Zessy (Admin)</h6>
  
             </Box>

             <Typography style={{color:'#646464',fontSize:15,marginTop:20,marginBottom:20}}>
               <span style={{fontWeight:600}}>Catégorie : </span>Développement</Typography>

           <Box display='flex'>
           <IconButton> <FaUserFriends/></IconButton>  
             <Typography className={classes.description}> 12 Members</Typography>
           
           </Box>
           
         

        
          
           
        
         </CardContent>
       </Card>
       </Hidden> 

      


                {/**********************photos**************** */}

     <Hidden only={['xs','sm']}>
       <Card className= {classes.root1}>
         <CardContent>
           <h6 style={{fontSize:17,fontWeight:700,marginTop: 10 ,marginBottom: 30,}}> Photo Gallery</h6>


           <GridList cellHeight={76}  className={classes.gridList} cols={3}>
        
            <img src={process.env.PUBLIC_URL + '/images/i9.jpg'} onClick={handleClickOpen} />
            <img src={process.env.PUBLIC_URL + '/images/img.jpg'} />
            <img src={process.env.PUBLIC_URL + '/images/img5.jpg'} />
            <img src={process.env.PUBLIC_URL + '/images/img6.png'} />
       
      </GridList>
          
         </CardContent>
       </Card>
       </Hidden> 

       

         {/**********************affichage des photos**************** */}
<Grid item xs={3} sm={5} md={7} lg={8} xl={12}>

       <Dialog onClose={handleClose}  open={open}>
       <img style={{width:'100%',height:'100%'}} src={process.env.PUBLIC_URL + '/images/img2.jpg'}/>

        
       
      </Dialog>

      </Grid>
      

        </Grid>
        </Box>
        </Grid>





              
        <Grid item  >
        <Hidden only={['xs','sm']}>
        <Discussions/>     
        </Hidden>
      
           </Grid>
       
      </Container>
      </Grid>
 
      </div>

    
  );
}

export default Groupe;