
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import './css/SingleClientView.css';

interface Client {
  id: number;
  name: string;
  hoursBookedPerYear: number;
  hourlyRate: number;
  email: string;
  easeToWorkWith: number;
  clientRating: number;
}

type EditableFields = 'hoursBookedPerYear' | 'hourlyRate' | 'easeToWorkWith';

const SingleClientView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({
    hoursBookedPerYear: false,
    hourlyRate: false,
    easeToWorkWith: false,
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tempChanges, setTempChanges] = useState<Partial<Client>>({});

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch(`http://localhost:8080/client/${id}`);
        const data = await response.json();
        setClient(data);
      } catch (error) {
        console.error('Error fetching client:', error);
      }
    };

    if (id) {
      fetchClient();
    }
  }, [id]);

  const toggleEditMode = (field: EditableFields) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
    setSuccessMessage(null);
    setError(null);
    setTempChanges({}); // Reset temporary changes when entering edit mode
  };

  const handleTempChange = (field: EditableFields, value: string | number) => {
    setTempChanges((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (field: EditableFields, value: string | number) => {
    try {
      let updatedClient: Client;

      if (field === 'easeToWorkWith') {
        const easeToWorkWithValue = Number(value);
        if (!Number.isInteger(easeToWorkWithValue) || easeToWorkWithValue < 1 || easeToWorkWithValue > 10) {
          setError('Ease to Work With should be a whole number between 1 and 10');
          setTempChanges({}); // Revert temporary changes
          setEditMode((prev) => ({ ...prev, [field]: false })); // Revert edit mode
          return;
        }
      }

      // Ensure tempChanges[field] is a number, providing a default value of 0 if it's undefined
      const tempFieldValue = tempChanges[field] !== undefined ? Number(tempChanges[field]) : 0;

      const response = await fetch(`http://localhost:8080/client/${id}/${field}/${tempFieldValue}`, {
        method: 'PATCH',
      });

      if (response.ok) {
        setSuccessMessage(`Successfully updated ${field}`);
        toggleEditMode(field);

        const updatedResponse = await fetch(`http://localhost:8080/client/${id}`);
        updatedClient = await updatedResponse.json();

        setClient(updatedClient);
      } else {
        console.error(`Failed to update ${field}`);
        setError('Failed to update. Please try again.');
        setTempChanges({}); // Revert temporary changes
        setEditMode((prev) => ({ ...prev, [field]: false })); // Revert edit mode
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };
  return (
    <div className="container">
      <NavBar />
      <div className="container mt-5 d-flex justify-content-start align-items-center" style={{ minHeight: '100vh' }}>
        <div className="single-client-view">
          <div className="client-profile-header">
            <h2>{client?.name}'s Profile</h2>
            <p className="client-rating">Client Rating: {client?.clientRating}</p>
          </div>
          <div className="row mb-2">
            <div className="editable-field d-flex justify-content-between align-items-center mb-3">
              <label className="label">Hours Booked Per Year:</label>
              {editMode.hoursBookedPerYear ? (
                <div className="input-container d-flex align-items-center">
                  <input
                    className="input-field form-control"
                    value={tempChanges.hoursBookedPerYear !== undefined ? tempChanges.hoursBookedPerYear : client?.hoursBookedPerYear}
                    onChange={(e) => handleTempChange('hoursBookedPerYear', e.target.value)}
                  />
                  <div className="buttons-container d-flex align-items-center">
                    <button className="btn btn-success ml-1" onClick={() => handleSave('hoursBookedPerYear', tempChanges.hoursBookedPerYear as number)}>
                      Save
                    </button>
                    <button className="btn btn-secondary ml-1" onClick={() => toggleEditMode('hoursBookedPerYear')}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="view-mode d-flex align-items-center">
                  <span className="input">{client?.hoursBookedPerYear}</span>
                  <button className="btn btn-primary ml-5" onClick={() => toggleEditMode('hoursBookedPerYear')}>
                    Edit
                  </button>
                </div>
              )}
            </div>
  
            <div className="editable-field justify-content-between d-flex mb-3">
              <label className="label">Hourly Rate:</label>
              {editMode.hourlyRate ? (
                <div className="input-container d-flex align-items-center">
                  <input
                    className="input-field form-control"
                    value={tempChanges.hourlyRate !== undefined ? tempChanges.hourlyRate : client?.hourlyRate}
                    onChange={(e) => handleTempChange('hourlyRate', e.target.value)}
                  />
                  <div className="buttons-container d-flex align-items-center">
                    <button className="btn btn-success ml-1" onClick={() => handleSave('hourlyRate', tempChanges.hourlyRate as number)}>
                      Save
                    </button>
                    <button className="btn btn-secondary ml-1" onClick={() => toggleEditMode('hourlyRate')}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="view-mode d-flex align-items-center">
                  <span className="input">{client?.hourlyRate}</span>
                  <button className="btn btn-primary ml-5" onClick={() => toggleEditMode('hourlyRate')}>
                    Edit
                  </button>
                </div>
              )}
            </div>
  
            <div className="editable-field d-flex justify-content-between align-items-center mb-3">
              <label className="label">Ease to Work With:</label>
              {editMode.easeToWorkWith ? (
                <div className="input-container d-flex align-items-center">
                  <input
                    className="input-field form-control"
                    value={tempChanges.easeToWorkWith !== undefined ? tempChanges.easeToWorkWith : client?.easeToWorkWith}
                    onChange={(e) => handleTempChange('easeToWorkWith', e.target.value)}
                  />
                  <div className="buttons-container d-flex align-items-center">
                    <button className="btn btn-success ml-1" onClick={() => handleSave('easeToWorkWith', tempChanges.easeToWorkWith as number)}>
                      Save
                    </button>
                    <button className="btn btn-secondary ml-1" onClick={() => toggleEditMode('easeToWorkWith')}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="view-mode d-flex align-items-center">
                  <span className="input">{client?.easeToWorkWith}</span>
                  <button className="btn btn-primary ml-5" onClick={() => toggleEditMode('easeToWorkWith')}>
                    Edit
                  </button>
                </div>
              )}
            </div>
  
            <div className="editable-field d-flex justify-content-between align-items-center">
              <label className="label">Email:</label>
              <div className="view-mode d-flex align-items-center">
                <span className="input">{client?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  
  
};

export default SingleClientView;