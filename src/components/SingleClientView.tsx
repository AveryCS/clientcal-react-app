

// // SingleClientView.tsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// interface Client {
//   id: number;
//   name: string;
//   hoursBookedPerYear: number;
//   hourlyRate: number;
//   email: string;
//   easeToWorkWith: number;
//   clientRating: number;
//   // Add other properties if needed
// }

// const SingleClientView: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [client, setClient] = useState<Client | null>(null);

//   useEffect(() => {
//     const fetchClient = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/client/${id}`);
//         const data = await response.json();
//         setClient(data);
//       } catch (error) {
//         console.error('Error fetching client:', error);
//       }
//     };

//     if (id) {
//       fetchClient();
//     }
//   }, [id]);

//   if (!client) {
//     return <div>Loading...</div>;
//   }

//   // Render the client information
//   return (
//     <div>
//       <h2>{client.name}'s Profile</h2>
//       <p>Email: {client.email}</p>
//       <p>Hours Booked Per Year: {client.hoursBookedPerYear}</p>
//       <p>Hourly Rate: {client.hourlyRate}</p>
//       <p>Ease to Work With: {client.easeToWorkWith}</p>
//       <p>Client Rating: {client.clientRating}</p>
//       {/* Render other client information as needed */}
//     </div>
//   );
// };

// export default SingleClientView;
//------
// SingleClientView.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import './SingleClientView.css';

interface Client {
  id: number;
  name: string;
  hoursBookedPerYear: number;
  hourlyRate: number;
  email: string;
  easeToWorkWith: number;
  clientRating: number;
  // Add other properties if needed
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

      const response = await fetch(`http://localhost:8080/client/${id}/${field}/${value}`, {
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

  const handleTempChange = (field: EditableFields, value: string | number) => {
    setTempChanges((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <NavBar />
      <div className="single-client-view">
        <h2>{client?.name}'s Profile</h2>
        <p>Client Rating: {client?.clientRating}</p>
        <div className="editable-fields-container">
          <div className="editable-field">
            <div className="fields-container">
              <div className="label">Hours Booked Per Year:</div>
              {editMode.hoursBookedPerYear ? (
                <div className="input-container">
                  <input
                    className="input-field"
                    value={tempChanges.hoursBookedPerYear !== undefined ? tempChanges.hoursBookedPerYear : client?.hoursBookedPerYear}
                    onChange={(e) => handleTempChange('hoursBookedPerYear', e.target.value)}
                  />
                  <div className="buttons-container">
                    <button onClick={() => handleSave('hoursBookedPerYear', tempChanges.hoursBookedPerYear)}>Save</button>
                    <button onClick={() => toggleEditMode('hoursBookedPerYear')}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  {client?.hoursBookedPerYear}
                  <button onClick={() => toggleEditMode('hoursBookedPerYear')}>Edit</button>
                </div>
              )}
            </div>
            <div className="editable-field">
              <div className="label">Hourly Rate:</div>
              {editMode.hourlyRate ? (
                <div className="input-container">
                  <input
                    className="input-field"
                    value={tempChanges.hourlyRate !== undefined ? tempChanges.hourlyRate : client?.hourlyRate}
                    onChange={(e) => handleTempChange('hourlyRate', e.target.value)}
                  />
                  <div className="buttons-container">
                    <button onClick={() => handleSave('hourlyRate', tempChanges.hourlyRate)}>Save</button>
                    <button onClick={() => toggleEditMode('hourlyRate')}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  {client?.hourlyRate}
                  <button onClick={() => toggleEditMode('hourlyRate')}>Edit</button>
                </div>
              )}
            </div>
            <div className="editable-field">
              <div className="label">Ease to Work With:</div>
              {editMode.easeToWorkWith ? (
                <div className="input-container">
                  <input
                    className="input-field"
                    value={tempChanges.easeToWorkWith !== undefined ? tempChanges.easeToWorkWith : client?.easeToWorkWith}
                    onChange={(e) => handleTempChange('easeToWorkWith', e.target.value)}
                  />
                  <div className="buttons-container">
                    <button onClick={() => handleSave('easeToWorkWith', tempChanges.easeToWorkWith)}>Save</button>
                    <button onClick={() => toggleEditMode('easeToWorkWith')}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  {client?.easeToWorkWith}
                  <button onClick={() => toggleEditMode('easeToWorkWith')}>Edit</button>
                </div>
              )}
            </div>
          </div>
          <p>Email: {client?.email}</p>
        </div>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default SingleClientView;
