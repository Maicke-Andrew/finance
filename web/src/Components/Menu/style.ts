import styled from 'styled-components'

interface SwitchProps {
  isChecked: boolean;
}

export const HamburgerButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 34px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 30px;
  transform: translateX(0%);
  transition: transform 0.3s ease-in-out;
  position: relative;
  right: 30px;

  &.open {
    transform: translateX(-400%);
  }

  @media (max-width: 320px) {
    &.open {
      transform: translateX(-300%);
    }
  }

  &:focus {
    outline: none;
  }

  div {
    width: 45px;
    height: 2px;
    background-color: white;
    border-radius: 10px;
    transition: all 0.3s ease;
    transform-origin: 5px 5px;
  }


  &.open div:first-child {
    transform: rotate(45deg) translate(-1.5px, 4px);
    width: 40px;
  }

  &.open div:nth-child(2) {
    opacity: 0;
  }

  &.open div:nth-child(3) {
    transform: rotate(-45deg);
    width: 40px;
  }
`;

export const MenuContainer = styled.div`
  position: fixed;
  top: 0.1%;
  z-index: 1;
  width: 300px;
  height: 98.7vh;
  background-color: #2864F6;
  transform: translateX(100vw);
  transition: transform 0.3s ease-in-out;
  border-radius: 10px;
  border: 5px solid white;
  
  &.open {
    left: auto;
    right: 0;
    transform: translateX(0);
  }
  
  @media (max-width: 320px) {
    width: 250px;
  }
  
`;

export const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 100%;
  padding: 0;
  justify-content: space-between;
  
  a {
    display: flex;
    justify-content: flex-start;
    color: #fff;
    font-size: 20px;
    margin-bottom: 20px;
    margin-right: 10px;
  }
`;

export const FirstMenu = styled.div`
  margin-top: 60px;
  border-bottom: 1px solid white;
  width: 80%;
`

export const SecondMenu = styled.div`
  width: 80%;
`

export const Overlay = styled.div<{ open: boolean }>`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: ${({ open }) => (open ? "1" : "0")};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  cursor: pointer;
`;

export const Language = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  p {
    padding-top: 3px;
    cursor: pointer;
  }
  div {
    margin: 0;
  }
`

export const Switch = styled.div<SwitchProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 48px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ isChecked }) => (isChecked ? "#2196F3" : "#ccc")};
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  div {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.24);
    transform: translateX(${({ isChecked }) => (isChecked ? "26px" : "5px")});
    transition: transform 0.3s ease-in-out;
  }
`;