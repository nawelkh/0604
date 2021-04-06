import React from 'react'
import { useSelector } from "react-redux";



import { makeStyles } from '@material-ui/core/styles';
import {Box,Typography,Card, Tab ,Tabs,AppBar }  from '@material-ui/core';
import PropTypes from 'prop-types';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      borderRadius:15,
      flexGrow: 1,

      backgroundColor:'white',
      
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        '& .MuiBox-root':{
          paddingTop:20,
          paddingBottom:20,
          paddingRight:10,
          paddingLeft:10,
            },
      },
tab:{
    textTransform:'lowercase',
    color:'black',
    fontWeight:600,
},
mydiv:{
  paddingLeft:30,
  '& .MuiBox-root':{
paddingTop:20,
paddingBottom:20,
paddingRight:10,
paddingLeft:10,
  },

},
titre:{
fontSize:15,
fontWeight:600,

},

info:{
marginLeft:10,
color :'blue',
fontSize:15,
backgroundColor:'skyblue'
}
  }));



  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();

    return (
      <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
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
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

///////////////////////////////////////////////////////////////////////////////////////





export default function About() {

  const userData = useSelector((state) => state.userReducer.credentials);

////////////////////////////////////////////////
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
///////////////////////////////////////////////////////////

    return (
        <div>
            <Card className={classes.root}>
            <AppBar position="static">
            <Tabs
       variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        className={classes.tabs}
      >
        <Tab className={classes.tab} label="Vue d'ensemble" {...a11yProps(0)} />
        <Tab className={classes.tab} label="scolarité" {...a11yProps(1)} />
        <Tab className={classes.tab} label="détails sur vous" {...a11yProps(2)} />
       
      </Tabs>

      </AppBar>



      









      <TabPanel value={value} index={0} className={classes.mydiv}>
       <Typography>
         <span className={classes.titre}>Nom :</span>           <span className={classes.info}>{userData.nom}</span> <br/>
         <span className={classes.titre}>Prénom :</span>   <span className={classes.info}>{userData.prenom}</span> <br/>
        
         <span className={classes.titre}>Adresse Mail :</span>               <span className={classes.info}>{userData.email}</span> <br/>
         <span className={classes.titre}>Adresse :</span>           <span className={classes.info}> tizi-Ouzou</span> <br/>

       </Typography>
      </TabPanel>




      <TabPanel value={value} index={1} className={classes.mydiv}>
      <span className={classes.titre}>Fonction :</span>           <span className={classes.info}>{userData.formation}</span> <br/>
      <span  className={classes.titre}>Université :</span>           <span className={classes.info}>{userData.universite}</span> <br/>
      <span className={classes.titre}>Specialité:</span>           <span className={classes.info}>{userData.specialite}</span> <br/>
      <span className={classes.titre}>Département :</span>           <span className={classes.info}>{userData.departement}</span> <br/>
      

      </TabPanel>




      <TabPanel value={value} index={2} className={classes.mydiv}>
             <span className={classes.titre}>Bio :</span>      
             
                  <span className={classes.info}> {userData.bio}</span> 

      </TabPanel>
     
            </Card>
        </div>
    )
}
