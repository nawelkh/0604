import React ,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import {Box,Paper,Typography,Avatar, Button,Card} from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      borderRadius:15,
      backgroundColor:'white',
  
      '& > *': {
        margin: theme.spacing(2),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  
    titre:{
        color: 'white',
        textDecoration: 'none',
        fontSize: 17,
        fontWeight: 700,
        position: 'relative',
        top: 80,
        left: 20,
        
        '&:hover':{
            color: '#064444',
        }
    },
   
    profil:{
        height: 160,
        width:160,
        backgroundImage:`  linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent),
        url(${process.env.PUBLIC_URL + '/images/img11.jpeg'})`,
       backgroundSize: 'cover',

    },
    btn:{
        textTransform:'lowercase',
        height:35,
        paddingLeft: 10,
        paddingRight: 10,
        left: 20,
        bottom: 15,
    }
  }));
  



export default function AfficheAbonnement() {
    const classes = useStyles();
    const [style, setStyle] = useState({display: 'none'});
    return (
        <Card className={classes.root}>
        
        <Paper elevation={3} className={classes.profil} 
  
        onMouseEnter={e => {
            setStyle({display: 'block'});
        }}
        onMouseLeave={e => {
            setStyle({display: 'none'})
        }}

        >
        <Link className={classes.titre} to={"/groupe"} >
        Mazouz Lamia
        </Link>
        <Button style={style} className={classes.btn} variant="contained" color="primary">se désabonner</Button>

        </Paper>



  <Paper elevation={3} className={classes.profil} 
  
            onMouseEnter={e => {
                setStyle({display: 'block'});
            }}
            onMouseLeave={e => {
                setStyle({display: 'none'})
            }}
  
  >
      <Link className={classes.titre} to={"/groupe"} >
          Mazouz Lamia
      </Link>
    <Button style={style} className={classes.btn} variant="contained" color="primary">se désabonner</Button>
        
      </Paper>

      


      <Paper elevation={3} className={classes.profil} 
  
  onMouseEnter={e => {
      setStyle({display: 'block'});
  }}
  onMouseLeave={e => {
      setStyle({display: 'none'})
  }}

>
<Link className={classes.titre} to={"/groupe"} >
Mazouz Lamia
</Link>
<Button style={style} className={classes.btn} variant="contained" color="primary">se désabonner</Button>

</Paper>

       



  
      </Card>
  
    )
}
