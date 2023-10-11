// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

//TODO- setup the home view and have it click through to the single Client view

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      {/* Home content goes here */}
      
      {/* Three buttons to navigate to different places */}
      <div>
        <Link to="/destination1">
          <button>Go to Destination 1</button>
        </Link>
        <Link to="/destination2">
          <button>Go to Destination 2</button>
        </Link>
        <Link to="/destination3">
          <button>Go to Destination 3</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
