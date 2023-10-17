// src/components/Button.jsx
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

export default StyledButton;
