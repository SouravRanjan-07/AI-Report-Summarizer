import React from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function ThemeToggle({ dark, setDark }){
  return (
    <IconButton onClick={()=>setDark(d=>!d)}>
      {dark? <Brightness7Icon/> : <Brightness4Icon/>}
    </IconButton>
  );
}
