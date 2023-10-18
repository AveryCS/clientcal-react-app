import React, { useState, useEffect } from 'react';
import StyledButton from './styledcomponents/StyledButton';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './styledcomponents/HomeViewStyles';
import NavBar from './NavBar';

interface Client {
  id: number;
  name: string;
  hoursBookedPerYear: number;
  hourlyRate: number;
  email: string;
  easeToWorkWith: number;
  clientRating: number;
}

const CreateReportView: React.FC = () => {
  
  return (
    <div><NavBar /> 
    <ButtonContainer>
        {/* Link to Add New Client */}
        <Link to="/client-rating-report">
          <div className="box"></div>
          <StyledButton>Find Clients By Rating</StyledButton>
        </Link>

        {/* Link to Generate Report */}
        <Link to="/all-clients-report">
          <div className="box"></div>
          <StyledButton>List of all clients</StyledButton>
        </Link>
      </ButtonContainer>
      </div>
   
  );
};

export default CreateReportView;
