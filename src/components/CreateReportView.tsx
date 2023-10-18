import React, { useState, useEffect } from 'react';
import StyledButton from './styledcomponents/StyledButton';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './styledcomponents/HomeViewStyles';
import NavBar from './NavBar';
import './CreateReportView.css';

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
    <div className= "create-report-nav-bar"><NavBar /> 
    <h3 className="report-center">Report Center</h3>
    <ButtonContainer className="report-buttons-container">
        {/* Link to Add New Client */}
        <Link to="/client-rating-report">
          <div className="box"></div>
          <StyledButton className="report-button">Pull Client Rating Report</StyledButton>
        </Link>

        {/* Link to Generate Report */}
        <Link to="/all-clients-report">
          <div className="box"></div>
          <StyledButton className="report-button">List of all clients</StyledButton>
        </Link>
      </ButtonContainer>
      </div>
   
  );
};

export default CreateReportView;
