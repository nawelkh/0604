import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Grid,Box,Hidden,Container} from '@material-ui/core';
import NavBar from './drawer';
import AddPub from "./addPub";
import Suggestions from "./suggestions";
import Publication from './publication'

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
    background: '#eff4fb',
    overflow : 'hidden', 
  },
 topimg:{

  backgroundImage: 'linear-gradient(to left, #50b5ff, #1085c8,   #1085c7,#50b5ff)',
  
    borderRadius: 10,
    padding:' 00px 50px', 
 },
 title:{
  fontSize: '30px',
  color: '#ffffff',
  fontWeight: 800,
  marginBottom: '8px',
  marginTop:0,
 },
}));


/////////////////////////////////////////////////////////////////////////////////////////////////////
function Actualite() {

  const classes = useStyles();
  const theme = useTheme();
  
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
      
           <Container maxWidth="lg" style={{padding:0 ,}} >
       
          

        <Box >

        <Grid item lg={1} >
        <NavBar/>
        </Grid>
        <Hidden only={['xl', 'lg','md']}>

          <Box   style={{height:90}}></Box>
            </Hidden>
          <Grid item xs={7} sm={8} md={11} lg={12} className={classes.topimg} 
          style={{ marginTop:90,padding:'0 30px',marginLeft: 90 }}
          > 
          <Box display='flex' >
            
          <Box style={{paddingTop:20 ,paddingBottom:20,marginLeft:'auto',marginRight:'auto'}}>
                   <h3 className={classes.title}>Hello UniSwap Members !!</h3>
                   <p style={{color:'white',marginTop:0,textAlign:'center'}}>Check what your friends have been up to!</p>
                   </Box>
             

</Box>

</Grid>
      
        <Grid item xs={12} style={{ marginTop:30,}} >
         
          <Box display="flex" >
         

          <Grid item xs={12} sm={12} lg={8} style={{ marginRight: 25,marginLeft:55 }}>
            
            
            <Grid xs={12} sm={12} lg={9} >
              
                                       <AddPub />
              
              
            </Grid>

                                     <Publication/>
       
       
              </Grid>
       
             <Grid item xs={3} >
      
                                      <Suggestions/>
        
               </Grid>
      
      
        </Box>
        </Grid>

        
        
       </Box>
      </Container>
      </Grid>
 
      </div>

    
  );
}

export default Actualite;