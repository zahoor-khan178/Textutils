
import { useContext } from 'react';
import MessageContext from './MessageContext';

import '../css/textbox.css';
import React, { useState } from 'react';

export default function Textbox(props) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const [text, settext] = useState('');

  const handle = () => settext(text.toUpperCase());
  const lower = () => settext(text.toLowerCase());
  const clear = () => settext('');
  const withoutspace = () => settext(text.replace(/ /g, ''));

  const change = (event) => settext(event.target.value);

  const copytext = () => {
    if (text !== '') {
      navigator.clipboard.writeText(text).then(alertbox).catch((err) => {
        console.log('Failed to copy text:', err);
      });
    }
  };

  const alertbox = () => {
    const alertElem = document.getElementsByClassName('alert')[0];
    alertElem.style.display = 'block';
    setTimeout(() => {
      alertElem.style.display = 'none';
    }, 2000);
  };

  return (
    <>
      <div className={`textbox-container ${darkMode ? 'dark' : 'light'}`}>
        <div className={`container ${darkMode ? 'dark' : 'light'}`}>
          <div className="alert">Text copied to clipboard</div>
          <div className={`dark-mode-container ${darkMode ? 'dark' : 'light'}`} onClick={toggleDarkMode}>
            <div className={`dark-mode-button ${darkMode ? 'dark' : ''}`}></div>
          </div>

          <label htmlFor="mybox" className='form-label'>
            <h1>Enter your text</h1>
          </label>
          <textarea className={`form-control ${darkMode ? 'dark' : ''}`} id="mybox" rows="8" value={text} onChange={change}></textarea>

          <button className="btn btn-primary my-3" onClick={handle}>Convert to Uppercase</button>
          <button className="btn btn-primary my-3" onClick={lower} style={{ marginLeft: '10px' }}>Convert to Lowercase</button>
          <button className="btn btn-primary my-3" onClick={withoutspace} style={{ marginLeft: '10px' }}>Remove Blank Spaces</button>
          <button className="btn btn-primary my-3" onClick={copytext} style={{ marginLeft: '10px' }}>Copy Text</button>
          <button className="btn btn-primary my-3" onClick={clear} style={{ marginLeft: '10px' }}>Clear Text</button>
        </div>

        <div className={`container ${darkMode ? 'dark' : 'light'}`}>
          <h1>Text Summary</h1>
          <p>{text.trim() === '' ? 0 : text.trim().split(/\s+/).length} words</p>
          <p>{text.replace(/ /g, '').length} characters</p>
          <h1>Text Preview</h1>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
}
