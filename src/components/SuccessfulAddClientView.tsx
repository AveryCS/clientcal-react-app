

import React from 'react';
import './css/SuccessfulAddClientView.css';

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
    <div className="successful-add-client-container">
      <h2 className="success-name-client">{clientDetails.name} successfully added</h2>
      <div className="client-details">
    
        <p  className="success-client-rating"><strong>Client Rating:</strong> {clientDetails.clientRating}</p>
        {/* <p><strong>Hours Booked Per Year:</strong> {clientDetails.hoursBookedPerYear}</p>
        <p><strong>Hourly Rate:</strong> {clientDetails.hourlyRate}</p>
        <p><strong>Email:</strong> {clientDetails.email}</p>
        <p><strong>Ease To Work With:</strong> {clientDetails.easeToWorkWith}</p> */}
        {/* You can add more fields as needed */}
      </div>
    </div>
  );
};

export default SuccessfulAddClientView;
