
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
              setErrorMessage('No clients exist in the database with the selected client rating');
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
    <div className="container report-container">
      <NavBar/>
      <div className="container-contents mt-5">
        <h2>Client Rating Report</h2>
        <label className="select-rating-container">
          Select Rating:
          <select className="form-control w-100 h-100" value={rating || ''} onChange={handleRatingChange}>
            <option  value="">Select Rating</option>
            
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
