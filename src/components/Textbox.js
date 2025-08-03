import React, { useState, useContext, useRef } from 'react';
import MessageContext from './MessageContext';
import '../css/textbox.css';

export default function Textbox(props) {
  const { darkMode } = useContext(MessageContext);
  const [text, setText] = useState('');
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  const updateText = (newText) => {
    setHistory([...history, text]);
    setRedoStack([]);
    setText(newText);
  };

  const handle = () => updateText(text.toUpperCase());
  const lower = () => updateText(text.toLowerCase());
  const clear = () => updateText('');
  const withoutspace = () => updateText(text.replace(/ /g, ''));

  const extractLinks = () => {
    const links = text.match(/\bhttps?:\/\/[^\s]+/gi);
    updateText(links ? links.join('\n') : '');
  };

  const extractNumbers = () => {
    const numbers = text.match(/\d+/g);
    updateText(numbers ? numbers.join(' ') : '');
  };

  const extractTextOnly = () => {
    const letters = text.match(/[a-zA-Z]+/g);
    updateText(letters ? letters.join(' ') : '');
  };

  const extractSpecialChars = () => {
    const specials = text.match(/[^a-zA-Z0-9\s]/g);
    updateText(specials ? specials.join(' ') : '');
  };

  const undo = () => {
    if (history.length > 0) {
      const previousText = history[history.length - 1];
      setRedoStack([text, ...redoStack]);
      setHistory(history.slice(0, -1));
      setText(previousText);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextText = redoStack[0];
      setHistory([...history, text]);
      setRedoStack(redoStack.slice(1));
      setText(nextText);
    }
  };

  const change = (event) => {
    setHistory([...history, text]);
    setRedoStack([]);
    setText(event.target.value);
  };

  const copytext = () => {
    if (text !== '') {
      navigator.clipboard.writeText(text)
        .then(alertbox)
        .catch(err => console.log('Failed to copy text:', err));
    }
  };

  const alertbox = () => {
    const alertElem = document.getElementsByClassName('alert')[0];
    alertElem.style.display = 'block';
    setTimeout(() => {
      alertElem.style.display = 'none';
    }, 2000);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        updateText(prev => prev + ' ' + transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setListening(false);
      };

      recognitionRef.current.onend = () => {
        setListening(false);
      };
    }

    if (!listening) {
      recognitionRef.current.start();
      setListening(true);
    } else {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  const speakText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech Synthesis not supported in this browser.');
    }
  };

  return (
    <>
      <div className={`textbox-container ${darkMode ? 'dark' : 'light'}`}>
        <div className={`container ${darkMode ? 'dark' : 'light'}`}>
          <div className="alert">Text copied to clipboard</div>

          <label htmlFor="mybox" className='form-label'>
            <h1>Enter your text</h1>
          </label>
          <textarea
            className={`form-control ${darkMode ? 'dark' : ''}`}
            id="mybox"
            rows="8"
            value={text}
            onChange={change}
          ></textarea>

          {/* Basic Actions */}
          <button className="btn btn-primary uniform-btn my-3" onClick={handle}>Uppercase</button>
          <button className="btn btn-primary uniform-btn my-3" onClick={lower}>Lowercase</button>
          <button className="btn btn-primary uniform-btn my-3" onClick={withoutspace}>Remove Spaces</button>
          <button className="btn btn-primary uniform-btn my-3" onClick={copytext}>Copy</button>
          <button className="btn btn-primary uniform-btn my-3" onClick={clear}>Clear</button>

          <div className="my-button-group">
            <button className="btn btn-secondary uniform-btn" onClick={undo}>Undo</button>
            <button className="btn btn-secondary uniform-btn" onClick={redo}>Redo</button>
            <button className="btn btn-success uniform-btn" onClick={startListening}>
              {listening ? 'Stop Listening' : 'Start Listening'}
            </button>
            <button className="btn btn-warning uniform-btn" onClick={speakText}>Speak Text</button>
          </div>

          <div className="my-button-group">
            <button className="btn btn-info uniform-btn" onClick={extractLinks}>Extract Links</button>
            <button className="btn btn-info uniform-btn" onClick={extractNumbers}>Extract Numbers</button>
            <button className="btn btn-info uniform-btn" onClick={extractTextOnly}>Extract Letters</button>
            <button className="btn btn-info uniform-btn" onClick={extractSpecialChars}>Extract Special Chars</button>
          </div>
        </div>

        {/* Summary */}
        <div className={`container ${darkMode ? 'dark' : 'light'}`}>
          <h1>Text Summary</h1>
          <p>{text.trim() === '' ? 0 : text.trim().split(/\s+/).length} words</p>
          <p>{text.replace(/\s/g, '').length} characters</p>
          <h1>Text Preview</h1>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
}
