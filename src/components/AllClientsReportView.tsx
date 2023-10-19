// import React, { useState, useEffect } from 'react';
// import NavBar from './NavBar';

// interface Client {
//   id: number;
//   name: string;
//   hoursBookedPerYear: number;
//   hourlyRate: number;
//   email: string;
//   easeToWorkWith: number;
//   clientRating: number;
// }

// const AllClientsReportView: React.FC = () => {
//   const [clients, setClients] = useState<Client[]>([]);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [reportDate, setReportDate] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAllClients = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/clients');
//         if (response.ok) {
//           const clientList: Client[] = await response.json();
//           if (clientList.length === 0) {
//             setClients([]);
//             setErrorMessage('No clients exist in the database');
//           } else {
//             setClients(clientList);
//             setErrorMessage(null);

//             // Set the report date and time
//             const currentDate = new Date();
//             setReportDate(currentDate.toLocaleString());
//           }
//         } else {
//           console.error('Failed to fetch all clients');
//         }
//       } catch (error) {
//         console.error('Error fetching all clients:', error);
//       }
//     };

//     fetchAllClients();
//   }, []);

//   const handlePrintReport = () => {
//     window.print();
//   };

//   const handleDownloadReport = () => {
//     const data = {
//       reportDate,
//       clients,
//     };

//     const dataURL = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
//     const downloadLink = document.createElement('a');
//     downloadLink.href = dataURL;
//     downloadLink.download = 'all_clients_report.json';
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
//   };

//   return (
//     <div>
//         <NavBar /> 
//       <h2>All Clients Report</h2>

//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

//       {clients.length > 0 && (
//         <div>
//           <p>Report pulled on: {reportDate}</p>
//         </div>
//       )}

//       <ul>
//         {clients.map((client) => (
//           <li key={client.id}>{client.name}</li>
//         ))}
//       </ul>

//       <button onClick={handlePrintReport}>Print Report</button>
//       <button onClick={handleDownloadReport}>Download Report</button>
//     </div>
//   );
// };

// export default AllClientsReportView;

//-----------

import React, { useState, useEffect } from 'react';
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

const AllClientsReportView: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reportDate, setReportDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const response = await fetch('http://localhost:8080/clients');
        if (response.ok) {
          const clientList: Client[] = await response.json();
          if (clientList.length === 0) {
            setClients([]);
            setErrorMessage('No clients exist in the database');
          } else {
            setClients(clientList);
            setErrorMessage(null);

            // Set the report date and time
            const currentDate = new Date();
            setReportDate(currentDate.toLocaleString());
          }
        } else {
          console.error('Failed to fetch all clients');
        }
      } catch (error) {
        console.error('Error fetching all clients:', error);
      }
    };

    fetchAllClients();
  }, []);

  const handlePrintReport = () => {
    window.print();
  };

  const handleDownloadReport = () => {
    const data = {
      reportDate,
      clients,
    };

    const dataURL = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'all_clients_report.json';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <NavBar />
      <h2>All Clients Report</h2>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {clients.length > 0 && (
        <div>
          <p>Report pulled on: {reportDate}</p>
        </div>
      )}

      {clients.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>#</th>
              <th style={{ textAlign: 'center' }}>Name</th>
              <th style={{ textAlign: 'center' }}>Hours Booked Per Year</th>
              <th style={{ textAlign: 'center' }}>Hourly Rate</th>
              <th style={{ textAlign: 'center' }}>Email</th>
              <th style={{ textAlign: 'center' }}>Ease to Work With</th>
              <th style={{ textAlign: 'center' }}>Client Rating</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={client.id}>
                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                <td style={{ textAlign: 'center' }}>{client.name}</td>
                <td style={{ textAlign: 'center' }}>{client.hoursBookedPerYear}</td>
                <td style={{ textAlign: 'center' }}>{client.hourlyRate}</td>
                <td style={{ textAlign: 'center' }}>{client.email}</td>
                <td style={{ textAlign: 'center' }}>{client.easeToWorkWith}</td>
                <td style={{ textAlign: 'center' }}>{client.clientRating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={handlePrintReport}>Print Report</button>
      <button onClick={handleDownloadReport}>Download Report</button>
    </div>
  );
};

export default AllClientsReportView;

