
import React from 'react';
import { Link } from 'react-router-dom';
import './css/NavBar.css';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light style=#3498db">
   
      <Link className="navbar-brand" to="/">
       
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
          <Link to="/" style={{ color: '#3498db' }}>
              Home
            </Link>
          </li>
          <li className="nav-item">
          <Link to="/create-report" style={{ color: '#3498db' }}>
              Generate Report
            </Link>
          </li>
          <li className="nav-item">
          <Link to="/add-client" style={{ color: '#3498db' }}>
              Add New Client
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
