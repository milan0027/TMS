import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import image from './time.svg'
import { Grid } from '@mui/material';
const LandingPage = () => {
 
  return (
    <>
        <Grid container>

        <Grid item xs={12} md={6}>

        
        <h1>Hi, Welcome To</h1>
        <h1>Time Management Software</h1>
        <AccessTimeIcon sx={{height:'350px', width: '350px'}}/>
        </Grid>
        <Grid item md={6}>

       
        <img src={image} alt="Time SVG" style={{marginTop:'70px'}}/>
        </Grid>
        </Grid>  </>)
}

export default LandingPage