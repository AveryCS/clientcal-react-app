// NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import your CSS file

const NavBar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/create-report">Generate Report</Link>
        <Link to="/add-client">Add New Client</Link>
      </div>
    </div>
  );
};

export default NavBar;
