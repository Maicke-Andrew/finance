import styled, { keyframes } from 'styled-components';

const Container = styled.div`
    z-index: 100;
    background-color: white;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
`;

interface props {
  widthpx?: string;
  heightpx?: string;
}

const Loading = ({ widthpx, heightpx }: props) => {
  return (
    <Container style={{ width: widthpx, height: heightpx }}>
      <LoadingSpinner>
      </LoadingSpinner>
    </Container>
  )
}

export default Loading