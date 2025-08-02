import MessageContext from './components/MessageContext';
import { useState } from 'react';
import './css/textbox.css';
import './Appa.css';
import Navbar from './components/Navbar';
import Textbox from './components/Textbox';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <MessageContext.Provider value={{ darkMode, toggleDarkMode }}>
      <>
        <Navbar title="textutils" abouttext="about textutils" />
        <Textbox />
      </>
    </MessageContext.Provider>
  );
}

export default App;
