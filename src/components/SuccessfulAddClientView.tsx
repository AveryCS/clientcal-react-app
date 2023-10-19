

import React from 'react';
import './css/SuccessfulAddClientView.css';
import NavBar from './NavBar';

interface SuccessfulAddClientViewProps {
  clientDetails: {
    name: string;
    hoursBookedPerYear: number;
    hourlyRate: number;
    email: string;
    easeToWorkWith: number;
    clientRating: number;
    // Add more fields as needed
  };
}

const SuccessfulAddClientView: React.FC<SuccessfulAddClientViewProps> = ({ clientDetails }) => {
  return (
    <div>    
   
  
    <div className="successful-add-client-container">
      
      <h2 className="success-name-client">{clientDetails.name} successfully added</h2>
      <div className="client-details">
    
        <p  className="success-client-rating"><strong>Client Rating:</strong> {clientDetails.clientRating}</p>
     
      </div>
    </div>
    </div>
  );
};

export default SuccessfulAddClientView;
