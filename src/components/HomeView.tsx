// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import StyledButton from './styledcomponents/StyledButton';
import { HomeContainer, ButtonContainer, Box, ButtonLink } from './styledcomponents/HomeViewStyles';
//TODO- setup the home view and have it click through to the single Client view

const HomeView = () => {
  return (
    <HomeContainer>
      <h2>Home</h2>

      <ButtonContainer>
        <Link to="/single-client">
          <div className="box"></div>
          <StyledButton>Select Client</StyledButton>
          
        </Link>
        <Link to="/add-client">
          <div className="box"></div>
          <StyledButton>Add New Client</StyledButton>
        </Link>
        <Link to="/create-report">
          <div className="box"></div>
          <StyledButton>Generate Report</StyledButton>
        </Link>
        </ButtonContainer>
        </HomeContainer>
  );
};

export default HomeView;
