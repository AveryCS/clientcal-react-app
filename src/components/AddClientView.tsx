

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import SuccessfulAddClientView from './SuccessfulAddClientView';

// const AddClientView: React.FC = () => {
//   const [clientInfo, setClientInfo] = useState({
//     name: '',
//     hoursBookedPerYear: 0,
//     hourlyRate: 0,
//     email: '',
//     easeToWorkWith: 0,
//   });

//   const [formError, setFormError] = useState('');
//   const navigate = useNavigate(); // Add useNavigate

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setClientInfo({
//       ...clientInfo,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Check if any field is empty
//     if (Object.values(clientInfo).some((value) => value === '')) {
//       setFormError('All fields must be completed before a client can be added');
//       return;
//     }

//     // Additional validations
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

//     // Additional validations
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
//         // Client added successfully, you can redirect or perform any other action
//         console.log('Client added successfully');
  
//         // Fetch client details
//         const addedClientDetails = await response.json();
  
//         // Render the SuccessfulAddClientView with the client details
//         return <SuccessfulAddClientView clientDetails={addedClientDetails} />;
//       } else {
//         console.error('Failed to add client');
//       }
//     } catch (error) {
//       console.error('Error adding client:', error);
//     }
//   };

//   return (
//   <div>
//     {formError && <p style={{ color: 'red' }}>{formError}</p>}
//     {/*
//       If addedClientDetails is available, render the SuccessfulAddClientView.
//       Otherwise, render the form.
//     */}
//     {addedClientDetails ? (
//       <SuccessfulAddClientView clientDetails={addedClientDetails} />
//     ) : (
//       <div>
//         <h2>Add Client</h2>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Name:
//             <input type="text" name="name" value={clientInfo.name} onChange={handleInputChange} required />
//           </label>
//           <label>
//             Hours Booked Per Year:
//             <input
//               type="number"
//               name="hoursBookedPerYear"
//               value={clientInfo.hoursBookedPerYear}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <label>
//             Hourly Rate:
//             <input
//               type="number"
//               name="hourlyRate"
//               value={clientInfo.hourlyRate}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <label>
//             Email:
//             <input
//               type="email"
//               name="email"
//               value={clientInfo.email}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <label>
//             Ease To Work With:
//             <input
//               type="number"
//               name="easeToWorkWith"
//               value={clientInfo.easeToWorkWith}
//               onChange={handleInputChange}
//               required
//             />
//           </label>
//           <button type="submit">Add Client</button>
//         </form>
//       </div>
//     )}
//   </div>
// );




//   //   try {
//   //     const response = await fetch('http://localhost:8080/client', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify(clientInfo),
//   //     });

//   //     if (response.ok) {
//   //       // Client added successfully, you can redirect or perform any other action
//   //       console.log('Client added successfully');
//   //       // Clear the form and error message
//   //       setClientInfo({
//   //         name: '',
//   //         hoursBookedPerYear: 0,
//   //         hourlyRate: 0,
//   //         email: '',
//   //         easeToWorkWith: 0,
//   //       });
//   //       setFormError('');
//   //       // Redirect to the successful page
//   //       navigate('/successful-add-client');
//   //     } else {
//   //       console.error('Failed to add client');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error adding client:', error);
//   //   }
//   // };

// //   return (
// //     <div>
// //       <h2>Add Client</h2>
// //       {formError && <p style={{ color: 'red' }}>{formError}</p>}
// //       <form onSubmit={handleSubmit}>
// //         <label>
// //           Name:
// //           <input type="text" name="name" value={clientInfo.name} onChange={handleInputChange} required />
// //         </label>
// //         <label>
// //           Hours Booked Per Year:
// //           <input
// //             type="number"
// //             name="hoursBookedPerYear"
// //             value={clientInfo.hoursBookedPerYear}
// //             onChange={handleInputChange}
// //             required
// //           />
// //         </label>

// //         <label>
// //           Hourly Rate:
// //           <input
// //             type="number"
// //             name="hourlyRate"
// //             value={clientInfo.hourlyRate}
// //             onChange={handleInputChange}
// //             required
// //           />
// //         </label>

// //         <label>
// //           Email:
// //           <input
// //             type="email"
// //             name="email"
// //             value={clientInfo.email}
// //             onChange={handleInputChange}
// //             required
// //           />
// //         </label>
// //         <label>
// //           Ease To Work With:
// //           <input
// //             type="number"
// //             name="easeToWorkWith"
// //             value={clientInfo.easeToWorkWith}
// //             onChange={handleInputChange}
// //             required
// //           />
// //         </label>
// //         <button type="submit">Add Client</button>
// //       </form>
// //     </div>
// //   );
// // };



// export default AddClientView;


//_______

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessfulAddClientView from './SuccessfulAddClientView'; // Import your SuccessfulAddClientView component

const AddClientView: React.FC = () => {
  const [clientInfo, setClientInfo] = useState({
    name: '',
    hoursBookedPerYear: 0,
    hourlyRate: 0,
    email: '',
    easeToWorkWith: 0,
  });

  const [formError, setFormError] = useState('');
  const [addedClientDetails, setAddedClientDetails] = useState(null); // State to hold added client details
  const navigate = useNavigate(); // Add useNavigate

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientInfo({
      ...clientInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any field is empty
    if (Object.values(clientInfo).some((value) => value === '')) {
      setFormError('All fields must be completed before a client can be added');
      return;
    }

    // Additional validations
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

    // Additional validations
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
        // Client added successfully
        console.log('Client added successfully');
        
        // Assuming you have clientDetails available (you might need to fetch it from the server)
        const addedClientDetails = await response.json();

        // Set the added client details to trigger rendering of SuccessfulAddClientView
        setAddedClientDetails(addedClientDetails);

        // Clear the form and error message
        setClientInfo({
          name: '',
          hoursBookedPerYear: 0,
          hourlyRate: 0,
          email: '',
          easeToWorkWith: 0,
        });
        setFormError('');
      } else {
        console.error('Failed to add client');
      }
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  return (
    <div>
      {formError && <p style={{ color: 'red' }}>{formError}</p>}
      {/*
        If addedClientDetails is available, render the SuccessfulAddClientView.
        Otherwise, render the form.
      */}
      {addedClientDetails ? (
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
            <button type="submit">Add Client</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddClientView;
