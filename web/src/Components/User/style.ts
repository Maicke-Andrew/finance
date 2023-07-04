import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    align-items: end;
    gap: 10px;
    transform: translateX(0%);
    transition: transform 0.3s ease-in-out;
    
    img {
        width: 60px;
        border-radius: 50%;
        cursor: pointer;
    }
    
    &.open {
        transform: translateX(-350%);
        
        @media (max-width: 566px) {
            transform: translateX(0);
        }
    }
    
    p {
        margin-bottom: 10px;
        font-size: 18px;
    }

    @media (max-height: 781px) {
        img {
            width: 48px;
        }

    }
    
    @media (max-height: 635px) {
        img {
            width: 36px;
        }

    }
`

export const MenuContainer = styled.div`
    z-index: 2;
    position: fixed;
    top: 80px;
    right: 105px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: flex;
    justify-content: flex-start;
    width: 10rem;
    height: 6rem;
    border: 1px solid #808080;
    border-radius: 6px;
    background-color: white;

    a {
        margin: 0;
        color: black;
    }

    p {
        margin: 0;
        font-size: 15px;
        cursor: pointer;
    }
`;

export const MenuImg = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    margin-left: 10px;

    img {
        width: 20px;
        cursor: pointer;
    }
`

export const MenuHref = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 14px;
    margin-top: 5px;
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