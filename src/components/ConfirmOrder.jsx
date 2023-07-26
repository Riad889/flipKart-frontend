import { Typography,Box } from '@mui/material'
import React from 'react'

const ConfirmOrder = () => {
  return (
   <Box sx={{marginTop:'5%',display:'flex',alignItems:"center",color:"blue",justifyContent:'center'}}>
    <Typography sx={{textAlign:'center'}}>
        Thanks for Ordering
    </Typography>
   </Box>
  )
}

export default ConfirmOrder