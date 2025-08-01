// import logo from './logo.svg';
import MessageContext from './components/MessageContext';
import { useState } from 'react';
import './css/textbox.css';
import './Appa.css';
import Navbar from './components/Navbar';
import Textbox from './components/Textbox';



function App() {
  return (
  <>
 

  <Navbar title='textutils '  abouttext='about textutils' />

  {/* <div className="container my-5" > */}

  <Textbox />
  {/* </div> */}
  
  </>
  );
}

export default App;
