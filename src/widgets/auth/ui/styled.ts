import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

export const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.medium};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const ToggleButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.medium};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  text-decoration: underline;
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
`;
