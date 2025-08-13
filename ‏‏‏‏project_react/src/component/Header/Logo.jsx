import React from 'react';
import logo from '../../../public/Pictures/Logo/לוגו ללא רקע.png';
import '../../styles/DesignHeader.css';  

export default function Logo({altText = "לוגו האתר" , className}) {
  return (
    <img src={logo} alt={altText} className={className}/>
  );
}