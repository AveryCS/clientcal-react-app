

// const SingleClientView = () => {
//     return (
//         <div>
//       <h2>Single Client View</h2>
//       <p>This is the content of the SingleClientView component.</p>
//     </div>

        
//     );
//   };
  
//   export default SingleClientView;
  
//------------

// SingleClientView.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Client {
  id: number;
  name: string;
  // Add other properties if needed
}

const SingleClientView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch(`http://localhost:8080/client/${id}`);
        const data = await response.json();
        setClient(data);
      } catch (error) {
        console.error('Error fetching client:', error);
      }
    };

    if (id) {
      fetchClient();
    }
  }, [id]);

  if (!client) {
    return <div>Loading...</div>;
  }

  // Render the client information
  return (
    <div>
      <h2>{client.name}'s Profile</h2>
      {/* Render other client information as needed */}
    </div>
  );
};

export default SingleClientView;
