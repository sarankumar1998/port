import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { IconButton } from '@mui/material';

export default function Btn({increment}) {


  return (
    <div>


<div className="col-xl">
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
          
                color="inherit"
              >

    <AddCircleOutlineIcon       onClick={increment}/>

    </IconButton>

    <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // onClick={handleMenu}
                color="inherit"
              >

    <RemoveCircleOutlineIcon/>

    </IconButton>
            </div>

    </div>
  )
}
