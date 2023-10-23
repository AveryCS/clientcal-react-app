import React from 'react';
import StyledButton from './styledcomponents/StyledButton';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import './css/CreateReportView.css';

const CreateReportView: React.FC = () => {
  return (
    <div className="container">
      <NavBar />
      <h3 className="text-center mt-5">Report Center</h3>
      <div className="row d-md-flex justify-content-center mt-5">
        <div className="col-md-6">
          <Link to="/client-rating-report">
            <StyledButton className="btn btn-primary btn-block h-100 mb-3">
              Pull Client Rating Report
            </StyledButton>
          </Link>
        </div>
        <div className="col-md-6">
          <Link to="/all-clients-report">
            <StyledButton className="btn btn-primary btn-block h-100 mt-3 mt-md-0">
              List of all clients
            </StyledButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateReportView;
