
import React from 'react'
import PropTypes from 'prop-types'
import '../Appa.css'


export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg"  >
  <div className="container-fluid">
    <a className="navbar-brand" href="/">{props.title}</a>
   
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a  className="nav-link" href="/">{props.abouttext}</a>
        </li>
        
      </ul>
    
    </div>
  </div>
</nav>
  )
}

Navbar.propTypes={title: PropTypes.string.isRequired,  abouttext: PropTypes.string}  //  determine the type data passed through props.




