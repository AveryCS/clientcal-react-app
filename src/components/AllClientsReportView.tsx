
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import './css/AllClientsReportView.css';
import apiConfig from './ApiConfig';

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
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const response = await fetch(`${apiConfig.backendUrl}/clients`);
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

  const handleSort = (column: string) => {
    setSortColumn(column);
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
  };

  const sortedClients = () => {
    if (sortColumn === null) {
      return clients;
    }

    const multiplier = sortDirection === 'asc' ? 1 : -1;

    return [...clients].sort((a, b) => {
      if (sortColumn === 'name' || sortColumn === 'email') {
        // Sorting by name or email is not allowed
        return 0;
      }

      return (
        (Number(a[sortColumn as keyof Client]) - Number(b[sortColumn as keyof Client])) * multiplier
      );
    });
  };

  return (
    <div className="container">
      <NavBar />
      <div className="report">
        <h2>All Clients Report</h2>

        {errorMessage && <p className="error">{errorMessage}</p>}

        {clients.length > 0 && (
          <div>
            <p>Report pulled on: {reportDate}</p>
          </div>
        )}

        {clients.length > 0 && (
           <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="table-header"></th>
                <SortableHeader column="name" onClick={handleSort} sortDirection={sortDirection}>
                  Name
                </SortableHeader>
                <SortableHeader column="clientRating" onClick={handleSort} sortDirection={sortDirection}>
                  Client Rating
                </SortableHeader>
                <SortableHeader column="hoursBookedPerYear" onClick={handleSort} sortDirection={sortDirection}>
                  Hours Booked Per Year
                </SortableHeader>
                <SortableHeader column="hourlyRate" onClick={handleSort} sortDirection={sortDirection}>
                  Hourly Rate
                </SortableHeader>
                
                <SortableHeader column="easeToWorkWith" onClick={handleSort} sortDirection={sortDirection}>
                  Ease to Work With
                </SortableHeader>

                <th className="table-header">Email</th>
               
              </tr>
            </thead>
            <tbody>
              {sortedClients().map((client, index) => (
                <tr key={client.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td className="table-cell">{index + 1}</td>
                  <td className="table-cell">{client.name}</td>
                  <td className="table-cell">{client.clientRating}</td>
                  <td className="table-cell">{client.hoursBookedPerYear}</td>
                  <td className="table-cell">{client.hourlyRate}</td>
    
                  <td className="table-cell">{client.easeToWorkWith}</td>
                  <td className="table-cell">{client.email}</td>
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

interface SortableHeaderProps {
  column: string;
  onClick: (column: string) => void;
  sortDirection: 'asc' | 'desc' | null;
  children: React.ReactNode;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({ column, onClick, sortDirection, children }) => {
  const handleClick = () => {
    onClick(column);
  };

  return (
    <th className="table-header sortable-header" onClick={handleClick}>
      {children}
      {sortDirection && (
        <span style={{ marginLeft: '4px' }}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
      )}
    </th>
  );
};

export default AllClientsReportView;
