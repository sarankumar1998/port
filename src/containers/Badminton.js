import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import bad from "../assets/bad.jpg"
export default function Badminton() {
  return (
<div>
    <h6 style={{fontWeight:'600'}}>1 Result Found</h6>
<Card sx={{ maxWidth: 345 }}>
        
        <CardMedia
          sx={{ height: 190 }}
          image={bad}
  
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Hall 2
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
        <CardActions>
          <button className='btn btn-success btn-sm'>View Details</button>
          <button className='btn btn-success btn-sm'>Play Now</button>
        </CardActions>
      </Card>
</div>
  );
}
