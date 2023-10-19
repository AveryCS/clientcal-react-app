
// import React, { useState, useEffect } from 'react';
// import NavBar from './NavBar';
// import './css/ClientRatingReportView.css';

// interface Client {
//   id: number;
//   name: string;
//   hoursBookedPerYear: number;
//   hourlyRate: number;
//   email: string;
//   easeToWorkWith: number;
//   clientRating: number;
// }

// const ClientRatingReportView: React.FC = () => {
//   const [rating, setRating] = useState<number | null>(null);
//   const [clients, setClients] = useState<Client[]>([]);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [reportDate, setReportDate] = useState<string | null>(null);

//   const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedRating = parseInt(e.target.value, 10);
//     setRating(selectedRating !== 0 ? selectedRating : null);
//   };

//   useEffect(() => {
//     const fetchClientsByRating = async () => {
//       try {
//         if (rating !== null) {
//           const response = await fetch(`http://localhost:8080/clients?rating=${rating}`);
//           if (response.ok) {
//             const clientList: Client[] = await response.json();
//             if (clientList.length === 0) {
//               setClients([]);
//               setErrorMessage('No users exist in the database with the selected client rating');
//             } else {
//               setClients(clientList);
//               setErrorMessage(null);

//               // Set the report date and time
//               const currentDate = new Date();
//               setReportDate(currentDate.toLocaleString());
//             }
//           } else {
//             console.error('Failed to fetch clients by rating');
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching clients by rating:', error);
//       }
//     };

//     fetchClientsByRating();
//   }, [rating]);

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
//     downloadLink.download = 'client_report.json';
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
//   };

//   return (
//     <div className="client-rating-report-container">
//       <NavBar />
//       <div className="client-rating-report-contents">
//         <h2 className="client-rating-report-h2">Client Rating Report</h2>
//         <label className="client-rating-report-label">
//           Select Rating:
//           <select className="client-rating-report-select" value={rating || ''} onChange={handleRatingChange}>
//             <option value="">Select Rating</option>
//             {[...Array(10).keys()].map((num) => (
//               <option key={num + 1} value={num + 1}>
//                 {num + 1}
//               </option>
//             ))}
//           </select>
//         </label>

//         {errorMessage && <p className="client-rating-report-p" style={{ color: 'red' }}>{errorMessage}</p>}

//         {rating !== null && clients.length > 0 && (
//           <div>
//             <h3>Clients with rating of: {rating}</h3>
//             <p className="client-rating-report-p">Report pulled on: {reportDate}</p>
//           </div>
//         )}

//         <ul className="client-rating-report-ul">
//           {clients.map((client) => (
//             <li key={client.id} className="client-rating-report-li">{client.name}</li>
//           ))}
//         </ul>

//         <div className="client-rating-report-button-container">
//           <button className="client-rating-report-print-button" onClick={handlePrintReport}>
//             Print Report
//           </button>
//           <button className="client-rating-report-download-button" onClick={handleDownloadReport}>
//             Download Report
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientRatingReportView;

// ClientRatingReportView.tsx

// ClientRatingReportView.tsx

import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import './css/ClientRatingReportView.css';

interface Client {
  id: number;
  name: string;
  email: string;
  clientRating: number;
}

const ClientRatingReportView: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reportDate, setReportDate] = useState<string | null>(null);

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRating = parseInt(e.target.value, 10);
    setRating(selectedRating !== 0 ? selectedRating : null);
  };

  useEffect(() => {
    const fetchClientsByRating = async () => {
      try {
        if (rating !== null) {
          const response = await fetch(`http://localhost:8080/clients?rating=${rating}`);
          if (response.ok) {
            const clientList: Client[] = await response.json();
            if (clientList.length === 0) {
              setClients([]);
              setErrorMessage('No users exist in the database with the selected client rating');
            } else {
              setClients(clientList);
              setErrorMessage(null);

              // Set the report date and time
              const currentDate = new Date();
              setReportDate(currentDate.toLocaleString());
            }
          } else {
            console.error('Failed to fetch clients by rating');
          }
        }
      } catch (error) {
        console.error('Error fetching clients by rating:', error);
      }
    };

    fetchClientsByRating();
  }, [rating]);

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
    downloadLink.download = 'client_report.json';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="report-container">
      <NavBar />
      <div className="container-contents">
        <h2>Client Rating Report</h2>
        <label className="select-rating-container">
          Select Rating:
          <select value={rating || ''} onChange={handleRatingChange}>
            <option value="">Select Rating</option>
            
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </label>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        {rating !== null && clients.length > 0 && (
          <div>
            {/* <h3>Clients with rating of: {rating}</h3> */}
            <p>Report pulled on: {reportDate}</p>
          </div>
        )}

        {clients.length > 0 && (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Client Rating</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr key={client.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                    <td>{index + 1}</td>
                    <td>{client.name}</td>
                    <td>{client.clientRating}</td>
                    <td>{client.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="button-container">
          <button className="button" onClick={handlePrintReport}>
            Print / Download Report
          </button>
          {/* <button className="button" onClick={handleDownloadReport}>
            Download Report
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ClientRatingReportView;
