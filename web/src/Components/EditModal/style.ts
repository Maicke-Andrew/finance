import styled from 'styled-components'

export const Overlay = styled.div`
  z-index: 1;
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
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    width: 29rem;
    height: 30rem;
    border: 1px solid #808080;
    border-radius: 5px;
    background-color: #fff;
 
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        border: 1px solid rgba(220,220,220);
        border-radius: 3px;
        width: 75%;
        height: 50px;
        background-color: #fff;
    }

    button:active, button:focus {
        outline: none;
    }

    button:hover {
        background-color: rgba(220,220,220);
    }

    @media (max-width: 612px) {
        width: 25rem;
    }

    @media (max-width: 516px) {
        width: 20rem;
    }

    @media (max-width: 412px) {
        width: 17rem;
    }
`

export const ButtonClose = styled.div`
    height: 20px;
    width: 20px;
    cursor: pointer;
    transform: rotate(45deg) translate(-1.5px, 4px);
    display: flex;
    align-items: center;
    margin-left: 4px;

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
`

export const TitleAndCloes = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    p {
        margin-bottom: 0;
    }
`

export const ColumnModal = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: center;
    gap: 20px;

    input {
        border: 1px solid rgba(220,220,220);
        border-radius: 3px;
        width: 96%;
        height: 40px;
        background-color: rgba(240,240,240);
        padding-left: 10px;
    }
`

export const ReceiveButton = styled.div`
    width: 75%;
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    gap: 5px;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        border: 1px solid rgba(220,220,220);
        border-radius: 3px;
        width: 90%;
        height: 50px;
        background-color: #fff;

        @media (max-width: 1460px) {
            width: 50%;
        }
    }

    button:active, button:focus {
        outline: none;
    }
`

export const SelectButton = styled.div`
    display: flex;
    flex-direction: column;
    width: 75%;
    gap: 20px;

    select {
        border: 1px solid rgba(220,220,220);
        border-radius: 3px;
        width: 100%;
        height: 40px;
        background-color: rgba(240,240,240);
        padding-left: 10px;
    }
    
    select option {
        background-color: #f2f2f2;
        padding-left: 10px;
    }
`