

import { useContext } from 'react';
import MessageContext from './MessageContext';
import '../css/nav.css'
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
          {/* <a className="nav-link" aria-current="page" href="/">Home</a> */}
        </li>
        <li className="nav-item">
          {/* <a  className="nav-link" href="/">{props.abouttext}</a> */}
        </li>
        
      </ul>
      {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit" id='searchbutton'>Search</button>
      </form> */}
    </div>
  </div>
</nav>
  )
}

Navbar.propTypes={title: PropTypes.string.isRequired,  abouttext: PropTypes.string}  //  determine the type data passed through props.

// Navbar.defaultProps={   // the default values if the props are not passed 

//   title:'this my titel ',
//   abouttext:'this my text'

// }


