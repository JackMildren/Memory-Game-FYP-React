import React from "react"
import './../App.css';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useSelector } from 'react-redux';

export default function App() {
  const newStyles = useSelector((state) => state.textSettings.value);
  
  console.log("loaded app")
  console.log(newStyles)

  return (
    <div className='app' style={{...newStyles}}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}