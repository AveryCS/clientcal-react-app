
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StyledButton from './styledcomponents/StyledButton';
import { HomeContainer, ButtonContainer } from './styledcomponents/HomeViewStyles';
import { useParams } from 'react-router-dom';
import bannerImage from './Blue Gradient Header Banner.png';
import './css/HomeView.css';



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
    <HomeContainer >

     <img src={bannerImage} alt="Banner" className="banner-image" />
     <div></div>
      <ButtonContainer className="home-button-container">
        {/* Dropdown for selecting clients */}
        <select value={selectedClient} onChange={handleSelectChange}>
          <option value="">Select a Client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>

        {/* Link to Add New Client */}
        <Link to="/add-client">
          <div className="box"></div>
          <StyledButton>Add New Client</StyledButton>
        </Link>

        {/* Link to Generate Report */}
        <Link to="/create-report">
          <div className="box"></div>
          <StyledButton>Generate Report</StyledButton>
        </Link>
      </ButtonContainer>

    </HomeContainer>
  );
};

export default HomeView;
