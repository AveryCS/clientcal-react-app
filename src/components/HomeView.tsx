import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeContainer } from './styledcomponents/HomeViewStyles'; // Import HomeContainer
import { useParams } from 'react-router-dom';
import bannerImage from './Blue Gradient Header Banner.png';
import './css/HomeView.css'; // Keep your original CSS for custom styles
import StyledButton from './styledcomponents/StyledButton';

interface Client {
  id: number;
  name: string;
  // Add other properties if needed
}

const HomeView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedClient, setSelectedClient] = useState<number | ''>('');
  const [clients, setClients] = useState<Client[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:8080/clients');
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedClient(Number(selectedValue));

    if (selectedValue !== '') {
      navigate(`/single-client/${selectedValue}`);
    }
  };

  return (
    <HomeContainer className="home-container">
      <img src={bannerImage} alt="Banner" className="img-fluid" />

      <div className="d-md-flex flex-column mt-5">
        <select className="form-control mb-3" value={selectedClient} onChange={handleSelectChange}>
          <option value="">Select a Client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>

        <div className="d-grid gap-2">
          <Link to="/add-client">
            <StyledButton className="btn btn-primary custom-button mb-3">Add New Client</StyledButton>
          </Link>

          <Link to="/create-report">
            <StyledButton className="btn btn-primary custom-button">Generate Report</StyledButton>
          </Link>
        </div>
      </div>
    </HomeContainer>
  );
};

export default HomeView;
