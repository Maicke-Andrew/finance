import styled from 'styled-components'

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    color: black;
    display: flex;
    gap: 3%;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    
    .Toastify__close-button,
    .Toastify__close-button:hover,
    .Toastify__close-button:focus{
        color: #fff;
        border: none;
    }

    textarea {
        width: 36%;
        height: 25%;
        resize: none;
    }

    p {
        width: 36%;
    }
`

export const BtnFile = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 37%;
    height: 4rem;
    gap: 34%;

    .dropzoneStyle {
        display: flex;
        align-items: center;
        width: 100%;
        border: 2px solid #d8d8d8;
        background-color: #fafafa;
        color: #bdbdbd;
        transition: border .24s ease-in-out;
        border-radius: 5px;

        p {
            width: 100%;
        }
    }

    button {
        height: 3.5rem;
    }

    @media (max-width: 840px) {
        flex-direction: column;
        gap: 20px;
        height: 7rem;

        button {
            width: 100%;
        }
    }
`