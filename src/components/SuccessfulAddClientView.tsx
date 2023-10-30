

import React from 'react';
import './css/SuccessfulAddClientView.css';
import NavBar from './NavBar';
import { useLocation } from 'react-router-dom';

interface SuccessfulAddClientViewProps {
  clientDetails?: {
    name: string;
    hoursBookedPerYear: number;
    hourlyRate: number;
    email: string;
    easeToWorkWith: number;
    clientRating: number;
  };
}

const SuccessfulAddClientView: React.FC<SuccessfulAddClientViewProps> = () => {
  const location = useLocation();
  const clientDetails = location.state?.clientDetails;

  if (!clientDetails) {
    // Handle when clientDetails is not available
    return <div>No client details found</div>;
  }
  return (
    <div className="container"style={{ backgroundColor: '#3498db'}}>
      <NavBar />
      <div className="d-flex align-items-center justify-content-center" style={{ height: 'calc(100vh - 56px)', backgroundColor: '#3498db' }}>
        <div className="bg-primary" style={{ backgroundColor: '#3498db',   border: '2px solid #3498db' }}>
          <div className="container successful-add-client-container">
            <h2 className="success-name-client">{clientDetails.name} successfully added</h2>
            <div className="client-details">
              <p className="success-client-rating">
                <strong>Client Rating:</strong> {clientDetails.clientRating}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default SuccessfulAddClientView;