import React from 'react';
import logo from '../../../public/pictures/Logo/לוגו ללא רקע.png';
import '../../styles/DesignHeader.css';  

export default function Logo({altText = "לוגו האתר" , className}) {
  return (
    <img src={logo} alt={altText} className={className}/>
  );
}