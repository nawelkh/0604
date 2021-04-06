import React ,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import {updateData} from "../../actions/user.actions";

import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../actions/user.actions";

import { makeStyles, useTheme, } from '@material-ui/core/styles';
import {Grid,Container,Box,Hidden,Avatar,Card, CardContent,Typography,GridList, Divider,IconButton,Button,Tabs,Tab,AppBar
,TextField,DialogActions,Dialog,useMediaQuery ,DialogContent,DialogTitle,Select,InputLabel ,Badge,
 FormControl,} from '@material-ui/core';
import NavBar from '../actualite/drawer';
import PropTypes from 'prop-types';
//import Publication from '../actualite/publication'
import SwipeableViews from 'react-swipeable-views';
import {FiEdit} from 'react-icons/fi';
import CloseIcon from '@material-ui/icons/Close';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

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
       
        height: 150,
        width: 150,
      
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
      tab:{
        '& .MuiBox-root':{
          paddingTop:20,
          paddingBottom:20,
          paddingRight:0,
          paddingLeft:0,
            },
      },
      ajouter:{
        border: 0,
     
        height: 37,
        width: 190,
        borderRadius: 10,
        fontSize: 15,
        //fontFamily:'"sacramento" ,cursive',
        backgroundColor: 'skyblue ',
        color: 'white',
        paddingBottom: 10,
        paddingTop: 5,
       // textTransform: 'uppercase',
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
  
///////////////////////////////////////////////////////////////////////////////////////////////

 function MyProfil() {
   
  const userData = useSelector((state) => state.userReducer.credentials);

  //je stocke le fichier image 
  const [file, setFile] = useState();
  //utilise pour edit info du user 
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [universite, setUniversite] = useState("")
  const [faculte, setFaculte ]= useState("")
  const [departement, setDepartement] = useState("")
  const [specialite, setSpecialite] = useState("")
  //const [niveau, setNiveau] = useState("")
  
  //redux 
  const dispatch = useDispatch();

  //control des donnes 
  const [isLoading, setIsLoading] = useState(true);

  //fonction de test si un element est vide 
  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };
  
 
//fonction qui delenche le changement d image 
const handleImage  = (e) => {
  e.preventDefault();

  const data = new FormData();
 
  data.append("file", file);

  dispatch(uploadImage(data));
  window.alert("Photo de profil modifiée");
};

//////////////////////////////////////////////

/////////////////////fonction edit info 
const handleEdit = async (e)=>{ 
 
  e.preventDefault();
   const EditUserdata = {
    nom:nom,
     prenom:prenom,
     email: email,
     bio:bio,
     universite:universite,
     faculte:faculte, 
     departement:departement,
     specialite:specialite,
      
   };

    dispatch(updateData(EditUserdata));
    window.alert("informations modifies avec succes " );

    handleClose(true);
  }

////////////////////////////////////////////////////////////////////

//control des données 
useEffect(() => { !isEmpty(userData) && setIsLoading(false);}, [userData]);

///////////css//////////////////////////////////////////
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [openp, setOpenp] = React.useState(false);
  
    const handleClickOpenp = () => {
      setOpenp(true);
    };
    const handleClosep = () => {
      setOpenp(false);
    };
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
   
      const [state, setState] = React.useState({
        age: '',
        
    });
  
    const change = (event) => {
      const name = event.target.name;
      setState({
        ...state,
        [name]: event.target.value,
      });
    };
    
  /////////////////////////////////////////////////////////css/////////////////////////
 

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

         style={{width:'100%',height:'100%',objectFit: 'cover',borderRadius: '20px 20px 0px 0px'}}  />
        
      
 



       {/***********************************  nom utilisateur**************************************** */}
       <Card>
     <CardContent>


     


<h6 style={{fontSize:23,fontWeight:700,textAlign:'center', marginTop:0,marginBottom:10}}>{userData.nom} {userData.prenom}<br/>
<IconButton onClick={handleClickOpen}> <FiEdit  color='#212121' /> </IconButton> </h6>

<form action="" onSubmit={handleImage}  style={{display:'flex' , marginLeft:950,marginTop:-120}}>  

<input
  type="file"
  id="file"
  name="file"
  accept=".jpg, .jpeg, .png"
  onChange={(e) => setFile(e.target.files[0])} 
  className={classes.input}
/>
<label htmlFor="file">
<IconButton color="primary" aria-label="upload picture" component="span">
    <PhotoCamera />
  </IconButton>
</label>

<input type="submit" value="Changer Votre Photo "  className={classes.ajouter} />
</form>

     </CardContent>
   

 </Card>

 

</Grid>



 {/***********************************  photo de profile**************************************** */}


 <div style={{textAlign:'center'}}>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        style={{bottom:120}}
       >
<Avatar className={classes.image}  src={userData.imageUrl}/>
      </Badge>
      </div>
 {/***********************************  modifier le profil**************************************** */}


 
 <div>

       <Dialog
         fullScreen={fullScreen}
         open={open}
         onClose={handleClose}
         
       >
         <DialogTitle >
         <Typography style={{color:'black', fontWeight:700,fontSize:18,textAlign:'center'}}>modifier le profil</Typography>

         <IconButton aria-label="close"  className={classes.closeButton} onClick={handleClose}>
           <CloseIcon />
         </IconButton>
                     
         </DialogTitle>
         <DialogContent>
           <Typography style={{color:'grey', fontWeight:600,marginBottom:15}}>Vos Informations</Typography>
         <form className={classes.root2}>
                 <TextField size="small"  variant="outlined" label="Nom"defaultValue={userData.nom} onChange={(e) => setNom(e.target.value)}/>
                 <TextField size="small"  variant="outlined" label="Prénom"defaultValue={userData.prenom} onChange={(e) => setPrenom(e.target.value)}/>
                 <TextField size="small" type="email"  variant="outlined" label="Adresse Mail"defaultValue={userData.email} />
                

           
      

                 <TextField style={{width:'40ch'}} variant="outlined" label="Bio" multiline rows={4}
                 
                 defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}/>

         </form>

         <Divider/>



         <form className={classes.root2}>
     <TextField size="small"  variant="outlined" label="Université" defaultValue={userData.universite} onChange={(e) => setUniversite(e.target.value)}/>
     <TextField size="small" style={{ width: '40ch'}}  variant="outlined" label="Faculté" defaultValue={userData.faculte} onChange={(e) => setFaculte(e.target.value)} />
     <TextField size="small" variant="outlined" label="Département" defaultValue={userData.departement} onChange={(e) => setDepartement(e.target.value)} />
     <TextField size="small" variant="outlined" label="Spécialité" defaultValue={userData.specialite} onChange={(e) => setSpecialite(e.target.value)}/>
  
  

         </form>
         </DialogContent>



         <DialogActions>



           <Button variant="outlined" style={{color:'white',backgroundColor:'#50b5ff'}} onClick={handleEdit}>
             Modifier
           </Button>
         
         </DialogActions>
       </Dialog>
</div>










{/*********************************** infos de compte**************************************** */}

                
<Grid   item xs={10} sm={9} md={10} lg={12 }xl={12} style={{  marginRight: 60 ,marginLeft: 60,}} >  



<AppBar position="static" color="white" style={{marginTop:20}}>
<Tabs
value={value}
onChange={handleChange}
indicatorColor="primary"
textColor="primary"
variant="fullWidth"
variant="scrollable"
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

<TabPanel value={value} index={0} dir={theme.direction}>
{/*********************************** Bio**************************************** */}

<Grid xs={12} sm={12} md={12} lg={12} xl={12} spacing={0}
align="center"
justify="center" >

<Card style={{ marginBottom: 25,borderRadius:20,backgroundColor: 'rgb(162 150 150 / 15%)',  
backdropFilter: 'blur(5px)' }}>

<CardContent> 



<input accept="image/*" className={classes.input} id="icon-button-file" type="file" />

<Typography style={{ fontSize:15, }}>
    
{userData.bio}
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

 <img src={process.env.PUBLIC_URL + '/images/i9.jpg'} onClick={handleClickOpenp} />
 <img src={process.env.PUBLIC_URL + '/images/img.jpg'} />
 <img src={process.env.PUBLIC_URL + '/images/img5.jpg'} />
 <img src={process.env.PUBLIC_URL + '/images/img6.png'} />

</GridList>

</CardContent>
</Card>

   {/**********************affichage des photos**************** */}
   <Grid item xs={3} sm={5} md={7} lg={8} xl={12}>

   <Dialog onClose={handleClosep}  open={openp}>
   <img style={{width:'100%',height:'100%'}} src={process.env.PUBLIC_URL + '/images/img2.jpg'}/>

   

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

<TabPanel value={value} index={1} className={classes.tab}>
<About/>

      
</TabPanel>



{/***********************************  abonnes**************************************** */}


<TabPanel  value={value} index={2} dir={theme.direction} className={classes.tab}>

<AfficheAbonnés/>


</TabPanel>

{/***********************************  abonnements**************************************** */}

<TabPanel value={value} index={3} dir={theme.direction} className={classes.tab}>

<AfficheAbonnement/>

</TabPanel>

{/*********************************** photos**************************************** */}

<TabPanel value={value} index={4} dir={theme.direction} className={classes.tab}>
<Card style={{ marginBottom: 25,borderRadius:15 }}>
<CardContent>
<h6 style={{fontSize:19,fontWeight:700,marginTop: 10 ,marginBottom: 30,textAlign:'center'}}> Photo Gallery</h6>


<GridList cellHeight={250}  className={classes.gridList} cols={3}>

 <img style={{borderRadius:15}}   src={process.env.PUBLIC_URL + '/images/i9.jpg'} onClick={handleClickOpenp} />
 <img style={{borderRadius:15}}src={process.env.PUBLIC_URL + '/images/img.jpg'} />
 <img style={{borderRadius:15}} src={process.env.PUBLIC_URL + '/images/img5.jpg'} />
 <img style={{borderRadius:15}}src={process.env.PUBLIC_URL + '/images/img6.png'} />

</GridList>

</CardContent>
</Card>
<Dialog onClose={handleClosep}  open={openp}>
   <img style={{width:'100%',height:'100%'}} src={process.env.PUBLIC_URL + '/images/img2.jpg'}/>

   

   </Dialog>

</TabPanel>





{/***********************************  groupes et pages**************************************** */}

<TabPanel value={value} index={5} dir={theme.direction} className={classes.tab}>
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
export default MyProfil;