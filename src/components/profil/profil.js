import React ,{useState,useEffect} from 'react';
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'

import { makeStyles, useTheme, } from '@material-ui/core/styles';
import {Grid,Container,Box,Hidden,Avatar,Card, CardContent,Typography,GridList, Divider,Tabs,Tab,AppBar
,Dialog} from '@material-ui/core';
import NavBar from '../actualite/drawer';
import PropTypes from 'prop-types';
//import Publication from '../actualite/publication'
import SwipeableViews from 'react-swipeable-views';

import {FiEdit} from 'react-icons/fi';
import CloseIcon from '@material-ui/icons/Close';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


import AfficheGroup from './afficheGroup'
import AfficheAbonnement from './afficheAbonnement';
import AfficheAbonnés from './afficheAbonnés';
import About from './about';





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
        display:'flex',
      },
      image:{
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 150,
        width: 150,
        bottom: 120,
        boxShadow: '0 6px 21px 0 rgb(0 0 0 / 12%)',
        border: '3px solid white',
    
      },
      closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      },
      root2: {
        marginBottom:20,
        marginTop:20,
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
      formControl: {
        margin: theme.spacing(1),
       
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      margin: {
        margin: theme.spacing(1),
      },
      
      textField: {
        width: '25ch',
      },
      input:{
        visibility: 'hidden',
      },
      btnR:{
        textTransform: 'lowercase',
        height: 25,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor:'#50b5ff',
        marginTop:7,
        marginLeft:10,
        marginRight:10,
        marginLeft:'auto'
      },
     
      mytab:{
        '& .MuiBox-root':{
          paddingTop:20,
          paddingBottom:20,
          paddingRight:0,
          paddingLeft:0,
            },
      },
      img:{
        width: '100%',
    height: '100%',
    objectFit: 'cover',
    textAlign: 'center',
    borderRadius:15
      }
  }));
 
  

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={5}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

function Profil (){ 
  //userdata est utilisé pour recupere les donnes de user connecte 
  const userData = useSelector((state) => state.userReducer.credentials);
  //is loading pour controller la dispo des donnes du user 
  const [isLoading, setIsLoading] = useState(true);

  //fonction qde test si lelement est vide 
  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };
  
 
//si les donnees du user sont dispo mettre le loading a off 
   useEffect(() => { !isEmpty(userData) && setIsLoading(false);}, [userData]);



//////////////////////////////////css////////////////////////////////
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [openp, setOpenp] = React.useState(false);


  const handleClosep = () => {
    setOpenp(false);
  };
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
////////////////////////////////////css///////////////////////

    return (



        <div className={classes.root}>

{isLoading ? (

<img src={'../../images/loader.gif'} alt=""  style={{width:'100%',height:'0%',objectFit: 'cover',borderRadius: '10px 20px 10px 20px'}}/>
  ): (
  

           <Grid container spacing={2}>

           <Container maxWidth="lg"  style={{padding:0 ,}} >



             {/***********************************  Navbar**************************************** */}

                <Grid  lg={1} >
                   
                    <NavBar/>

                </Grid>



             {/*********************************** Top image**************************************** */}

                    <Grid item xs={10} sm={9} md={10} lg={12 }xl={12}className={classes.topimg} 
                    style={{ marginTop:100, marginRight: 60 ,marginLeft: 60,height:250 ,}} > 


                       <img ms={2} src={userData.imageUrl}

                    style={{width:'100%',height:'100%',objectFit: 'cover',borderRadius: '20px 20px 0px 0px'}} />
 
  

                  {/***********************************  nom utilisateur**************************************** */}
                  <Card>
                <CardContent>


                


     <h6 style={{fontSize:23,fontWeight:700,textAlign:'center', marginTop: 35,marginBottom:30}}>  {userData.nom} {userData.prenom} <br/>
    </h6>

      

    


                </CardContent>
            </Card>

            

        </Grid>



            {/***********************************  photo de profile**************************************** */}

        <Avatar className={classes.image} src={userData.imageUrl} />


       


      

   







         {/*********************************** infos de compte**************************************** */}

                           
        <Grid   item xs={10} sm={9} md={10} lg={12 }xl={12} style={{  marginRight: 60 ,marginLeft: 60,}} >  
 


        <AppBar position="static" color="white" >
        <Tabs
             

          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
         
          scrollButtons="on"
         
        >
         <Tab  style={{textTransform:'lowercase '}}label="BIO" {...a11yProps(0)} />
          <Tab  style={{textTransform:'lowercase '}}label="à propos" {...a11yProps(1)} />
          <Tab style={{textTransform:'lowercase '}} label="abonnés " {...a11yProps(2)} />
          <Tab style={{textTransform:'lowercase '}} label=" abonnements" {...a11yProps(3)} />
          <Tab  style={{textTransform:'lowercase '}}label="photos " {...a11yProps(4)} />
          <Tab  style={{textTransform:'lowercase '}}label="groupes et pages" {...a11yProps(5)} />
        </Tabs>

      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >




      {/*********************************** publications**************************************** */}

     <TabPanel value={value} index={0} dir={theme.direction}  className={classes.mytab}>
         {/*********************************** Bio**************************************** */}

         <Grid xs={12} sm={12} md={12} lg={12} xl={12} spacing={0}
    align="center"
    justify="center" >

<Card style={{ marginBottom: 25,borderRadius:20,backgroundColor: 'rgb(162 150 150 / 15%)',  
 backdropFilter: 'blur(5px)' }}>

 <CardContent> 
 

  

   <Typography style={{ fontSize:15, }}>
               
        {userData.bio}.
   </Typography>
 </CardContent>

 </Card>
  </Grid>
          
     <Grid item xs={12} style={{ marginTop:10,}} >
         
         <Box display="flex" >
        

         <Grid item xs={12} sm={12} lg={8} style={{ marginRight: 25, }}>



            


              {/*********************************** pub**************************************** */}
         
       
       </Grid>


      {/***********************************groupes et photos **************************************** */}

    <Hidden only={['xs', 'sm']}>

       <Grid item xs={4} sm={4} lg={4} >
     




<Card style={{ marginBottom: 25,borderRadius:15 }}>
         <CardContent>
           <h6 style={{fontSize:17,fontWeight:700,marginTop: 10 ,marginBottom: 30,}}> Photo Gallery</h6>


           <GridList cellHeight={80}  className={classes.gridList} cols={3}>
        
            
      </GridList>
          
         </CardContent>
       </Card>

              {/**********************affichage des photos**************** */}
              <Grid item xs={3} sm={5} md={7} lg={8} xl={12}>

              <Dialog onClose={handleClosep}  open={openp}>
              <img className={classes.img}  src={process.env.PUBLIC_URL + '/images/img2.jpg'}/>

              

              </Dialog>

              </Grid>


              <Card style={{ marginBottom: 25,borderRadius:15 }}>

        
</Card>
       </Grid>

</Hidden>

       </Box>
       </Grid>


        </TabPanel>


    {/*********************************** a propos**************************************** */}

        <TabPanel value={value} index={1}  className={classes.mytab} >
          <About/>
        </TabPanel>



     {/***********************************  abonnes**************************************** */}


     <TabPanel  value={value} index={2} dir={theme.direction}  className={classes.mytab}>

<AfficheAbonnés/>

     
      </TabPanel>

 {/***********************************  abonnements**************************************** */}

     <TabPanel value={value} index={3} dir={theme.direction}  className={classes.mytab}>
         
    <AfficheAbonnement/>

        </TabPanel>

       {/*********************************** photos**************************************** */}

        <TabPanel value={value} index={4} dir={theme.direction}  className={classes.mytab}>
        <Card style={{ marginBottom: 25,borderRadius:15 }}>
         <CardContent>
           <h6 style={{fontSize:19,fontWeight:700,marginTop: 10 ,marginBottom: 30,textAlign:'center'}}> Photo Gallery</h6>


           <GridList cellHeight={250}  className={classes.gridList} cols={3}>
        
           
       
      </GridList>
          
         </CardContent>
       </Card>
       <Dialog onClose={handleClosep}  open={openp}>
           
              

              </Dialog>

        </TabPanel>


       


        {/***********************************  groupes et pages**************************************** */}

        <TabPanel value={value} index={5} dir={theme.direction}  className={classes.mytab}>
          <AfficheGroup/>
        </TabPanel>


        </SwipeableViews>
</Grid>
      






                
                    
                
           </Container>
           </Grid>



  )}
        </div>

    );
};

export default Profil;