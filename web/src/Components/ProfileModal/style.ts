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

export const ModalComplet = styled.div`
    z-index: 3;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    width: 20rem;
    height: 27.8rem;
    border: 1px solid #808080;
    border-radius: 5px;
    background-color: #fff;

    @media (max-width: 650px) {
        width: 16rem;
    }
`

export const ButtonClose = styled.div`
    position: fixed;
    left: 17rem;
    right: 0;
    margin: auto;
    height: 20px;
    width: 20px;
    cursor: pointer;
    transform: rotate(45deg) translate(-1.5px, 4px);
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid black;
        border-radius: 10px;
        height: 0px;
        width: 20px;
        
        div {
            height: 18px;
            width: 0px;
        }
    }

    @media (max-width: 650px) {
        left: 14rem;
    }
`

export const ImageDrop = styled.div<{ imgUrl: string }>`
    cursor: pointer;
    margin-top: 5rem;
    
    .dropzoneStyle {
        position: relative;
        background-image: url(${({ imgUrl }) => imgUrl});
        background-size: cover;
        flex: 1;
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        display: flex;

        p {
            z-index: 2;
            display: flex;
            align-self: center;
            margin-left: 23px;
            color: white;
        }

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 50%;
        }
    }

`


