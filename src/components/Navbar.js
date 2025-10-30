import React, { useContext } from 'react';
import MessageContext from './MessageContext';
import '../css/nav.css';
import PropTypes from 'prop-types';
import '../Appa.css';

export default function Navbar(props) {
  const { darkMode, toggleDarkMode } = useContext(MessageContext);

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'dark' : 'light'}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">{props.title}</a>
        <div className={`dark-container ${darkMode ? 'dark' : 'light'}`} onClick={toggleDarkMode}>
          <div className={`dark-container-button ${darkMode ? 'dark' : 'light'}`}></div>
        </div>
          <span>{darkMode ? 'Disable dark mode' : 'Enable dark mode'}</span>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  abouttext: PropTypes.string,
};
