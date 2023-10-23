

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeContainer, ButtonContainer } from './styledcomponents/HomeViewStyles';
import { useParams } from 'react-router-dom';
import bannerImage from './Blue Gradient Header Banner.png';
import './css/HomeView.css'; // Keep your original CSS for custom styles

// Import your custom StyledButton component
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
  const navigate = useNavigate(); // useNavigate hook

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

    // Trigger navigation when a client is selected
    if (selectedValue !== '') {
      navigate(`/single-client/${selectedValue}`);
    }
  };

  return (
    <HomeContainer className="home-container">
      <img src={bannerImage} alt="Banner" className="img-fluid" />

      <ButtonContainer className="home-button-container">
        {/* Adjust margin-top as per your preference for the button container */}
        <select className="form-control" value={selectedClient} onChange={handleSelectChange}>
          <option value="">Select a Client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>

        <Link to="/add-client">
          <StyledButton className="btn btn-primary custom-button">Add New Client</StyledButton>
        </Link>

        <Link to="/create-report">
          <StyledButton className="btn btn-primary custom-button">Generate Report</StyledButton>
        </Link>
      </ButtonContainer>
    </HomeContainer>
  );
};

export default HomeView;
