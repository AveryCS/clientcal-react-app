
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
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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

  const tableHeaderStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '10px',
  };

  const tableCellStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '10px',
    border: '1px solid #ddd',
  };

  const evenRowStyle: React.CSSProperties = {
    backgroundColor: '#f9f9f9',
  };

  const oddRowStyle: React.CSSProperties = {
    backgroundColor: '#e1e1e1',
  };

  const SortableHeader: React.FC<SortableHeaderProps> = ({ column, onClick, sortDirection, children }) => {
    const handleClick = () => {
      onClick(column);
    };

    return (
      <th style={{ ...tableHeaderStyle, cursor: 'pointer' }} onClick={handleClick}>
        {children}
        {sortDirection && (
          <span style={{ marginLeft: '4px' }}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
        )}
      </th>
    );
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
              <th style={tableHeaderStyle}>#</th>
              <SortableHeader column="name" onClick={handleSort} sortDirection={sortDirection}>
                Name
              </SortableHeader>
              <SortableHeader column="hoursBookedPerYear" onClick={handleSort} sortDirection={sortDirection}>
                Hours Booked Per Year
              </SortableHeader>
              <SortableHeader column="hourlyRate" onClick={handleSort} sortDirection={sortDirection}>
                Hourly Rate
              </SortableHeader>
              <th style={tableHeaderStyle}>Email</th>
              <SortableHeader column="easeToWorkWith" onClick={handleSort} sortDirection={sortDirection}>
                Ease to Work With
              </SortableHeader>
              <SortableHeader column="clientRating" onClick={handleSort} sortDirection={sortDirection}>
                Client Rating
              </SortableHeader>
            </tr>
          </thead>
          <tbody>
            {sortedClients().map((client, index) => (
              <tr key={client.id} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
                <td style={tableCellStyle}>{index + 1}</td>
                <td style={tableCellStyle}>{client.name}</td>
                <td style={tableCellStyle}>{client.clientRating}</td>
                <td style={tableCellStyle}>{client.hoursBookedPerYear}</td>
                <td style={tableCellStyle}>{client.hourlyRate}</td>
                <td style={tableCellStyle}>{client.email}</td>
                <td style={tableCellStyle}>{client.easeToWorkWith}</td>
              
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

interface SortableHeaderProps {
  column: string;
  onClick: (column: string) => void;
  sortDirection: 'asc' | 'desc' | null;
  children: React.ReactNode;
}

export default AllClientsReportView;
