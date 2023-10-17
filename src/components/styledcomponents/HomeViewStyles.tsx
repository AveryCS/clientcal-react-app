
import styled from 'styled-components';

export const HomeContainer = styled.div`
  text-align: center; /* Center the text horizontally */
  height: 100vh; /* Make the container take the full height of the viewport */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center vertically */
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center; /* Center horizontally */
  gap: 10px; /* Adjust the gap between buttons as needed */
`;

export const Box = styled.div`
  /* Add styling for your box if necessary */
`;

export const ButtonLink = styled.a`
  text-decoration: none;
`;