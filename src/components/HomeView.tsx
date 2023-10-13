// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import SingleClientView from "./components/SingleClientView";
//TODO- setup the home view and have it click through to the single Client view

const HomeView = () => {
  return (
    <div>
      <h2>Home</h2>

      <div>
        <Link to="/single-client">
          <div className="box">Select Client</div>
        </Link>
        <Link to="/add-client">
          <div className="box">Add New Client</div>
        </Link>
        <Link to="/create-report">
          <div className="box">Generate Report</div>
        </Link>
      </div>
    
    </div>
  );
};

export default HomeView;
