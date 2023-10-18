
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import SuccessfulAddClientView from './SuccessfulAddClientView';
// import ClientExistsInDatabaseView from './ClientExistsInDatabaseView';

// const AddClientView: React.FC = () => {
//   const [clientInfo, setClientInfo] = useState({
//     name: '',
//     hoursBookedPerYear: 0,
//     hourlyRate: 0,
//     email: '',
//     easeToWorkWith: 0,
//   });

//   const [formError, setFormError] = useState('');
//   const [addedClientDetails, setAddedClientDetails] = useState(null);
//   const [clientExists, setClientExists] = useState(false); // State to track whether the client exists
//   const navigate = useNavigate();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setClientInfo({
//       ...clientInfo,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (Object.values(clientInfo).some((value) => value === '')) {
//       setFormError('All fields must be completed before a client can be added');
//       return;
//     }

//     const hourlyRate = Number(clientInfo.hourlyRate);
//     if (!Number.isInteger(hourlyRate)) {
//       setFormError('Hourly rate must be a whole number');
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(clientInfo.email)) {
//       setFormError('Invalid email format');
//       return;
//     }

//     const easeToWorkWith = Number(clientInfo.easeToWorkWith);
//     if (!Number.isInteger(easeToWorkWith) || easeToWorkWith < 1 || easeToWorkWith > 10) {
//       setFormError('Ease to work with should be a whole number between 1 and 10');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8080/client', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(clientInfo),
//       });

//       if (response.ok) {
//         console.log('Client added successfully');

//         const addedClientDetails = await response.json();
//         setAddedClientDetails(addedClientDetails);

//         setClientInfo({
//           name: '',
//           hoursBookedPerYear: 0,
//           hourlyRate: 0,
//           email: '',
//           easeToWorkWith: 0,
//         });
//         setFormError('');
//       } else if (response.status === 409) {
//         // Client already exists, set the state to true
//         setClientExists(true);
//       } else {
//         console.error('Failed to add client');
//       }
//     } catch (error) {
//       console.error('Error adding client:', error);
//     }
//   };

//   return (
//     <div>
//       {formError && <p style={{ color: 'red' }}>{formError}</p>}
//       {clientExists ? (
//         <ClientExistsInDatabaseView />
//       ) : addedClientDetails ? (
//         <SuccessfulAddClientView clientDetails={addedClientDetails} />
//       ) : (
//         <div>
//           <h2>Add Client</h2>
//           <form onSubmit={handleSubmit}>
//             <label>
//               Name:
//               <input type="text" name="name" value={clientInfo.name} onChange={handleInputChange} required />
//             </label>
//             <label>
//               Hours Booked Per Year:
//               <input
//                 type="number"
//                 name="hoursBookedPerYear"
//                 value={clientInfo.hoursBookedPerYear}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <label>
//               Hourly Rate:
//               <input
//                 type="number"
//                 name="hourlyRate"
//                 value={clientInfo.hourlyRate}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <label>
//               Email:
//               <input
//                 type="email"
//                 name="email"
//                 value={clientInfo.email}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <label>
//               Ease To Work With:
//               <input
//                 type="number"
//                 name="easeToWorkWith"
//                 value={clientInfo.easeToWorkWith}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <button type="submit">Add Client</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddClientView;


//-----

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessfulAddClientView from './SuccessfulAddClientView';
import ClientExistsInDatabaseView from './ClientExistsInDatabaseView';
import './AddClientView.css'; // Import your CSS file

const AddClientView: React.FC = () => {
  const [clientInfo, setClientInfo] = useState({
    name: '',
    hoursBookedPerYear: 0,
    hourlyRate: 0,
    email: '',
    easeToWorkWith: 0,
  });

  const [formError, setFormError] = useState('');
  const [addedClientDetails, setAddedClientDetails] = useState(null);
  const [clientExists, setClientExists] = useState(false); // State to track whether the client exists
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientInfo({
      ...clientInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(clientInfo).some((value) => value === '')) {
      setFormError('All fields must be completed before a client can be added');
      return;
    }

    const hourlyRate = Number(clientInfo.hourlyRate);
    if (!Number.isInteger(hourlyRate)) {
      setFormError('Hourly rate must be a whole number');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientInfo.email)) {
      setFormError('Invalid email format');
      return;
    }

    const easeToWorkWith = Number(clientInfo.easeToWorkWith);
    if (!Number.isInteger(easeToWorkWith) || easeToWorkWith < 1 || easeToWorkWith > 10) {
      setFormError('Ease to work with should be a whole number between 1 and 10');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientInfo),
      });

      if (response.ok) {
        console.log('Client added successfully');

        const addedClientDetails = await response.json();
        setAddedClientDetails(addedClientDetails);

        setClientInfo({
          name: '',
          hoursBookedPerYear: 0,
          hourlyRate: 0,
          email: '',
          easeToWorkWith: 0,
        });
        setFormError('');
      } else if (response.status === 409) {
        // Client already exists, set the state to true
        setClientExists(true);
      } else {
        console.error('Failed to add client');
      }
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  return (
    <div className="add-client-container">
      {formError && <p className="error-message">{formError}</p>}
      {clientExists ? (
        <ClientExistsInDatabaseView />
      ) : addedClientDetails ? (
        <SuccessfulAddClientView clientDetails={addedClientDetails} />
      ) : (
        <div>
          <h2>Add Client</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={clientInfo.name} onChange={handleInputChange} required />
            </label>
            <label>
              Hours Booked Per Year:
              <input
                type="number"
                name="hoursBookedPerYear"
                value={clientInfo.hoursBookedPerYear}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Hourly Rate:
              <input
                type="number"
                name="hourlyRate"
                value={clientInfo.hourlyRate}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={clientInfo.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Ease To Work With:
              <input
                type="number"
                name="easeToWorkWith"
                value={clientInfo.easeToWorkWith}
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit" className="add-button">
              Add Client
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddClientView;

