import styled from 'styled-components'

export const Overlay = styled.div`
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 1 ;
  visibility: visible;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  pointer-events: auto;
  cursor: pointer;
`;

export const ModalDelete = styled.div`
    z-index: 3;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 35rem;
    height: 20rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    border: 1px solid #808080;
    border-radius: 5px;

    h1 {
      font-size: 1.1rem;
    }

    div {
      display: flex;
      gap: 80px;
    }

    @media (max-width: 730px) {
      width: 28rem;
      height: 18rem;

      h1 {
        font-size: 0.9rem;
      }

      button {
        font-size: 1rem;
      }
    }

    @media (max-width: 590px) {
      width: 24rem;
      height: 16rem;

      h1 {
        font-size: 0.8rem;
      }

      button {
        font-size: 0.8rem;
      }
    }

    @media (max-width: 490px) {
      width: 20rem;
      height: 12rem;

      h1 {
        font-size: 0.6rem;
      }

      button {
        font-size: 0.8rem;
      }
    }

    @media (max-width: 412px) {
      width: 18rem;
      height: 12rem;

      h1 {
        font-size: 0.6rem;
      }

      button {
        font-size: 0.7rem;
      }
    }

    @media (max-width: 374px) {
      width: 16rem;
      height: 10rem;

      h1 {
        font-size: 0.5rem;
      }

      button {
        font-size: 0.6rem;
      }
    }
`;