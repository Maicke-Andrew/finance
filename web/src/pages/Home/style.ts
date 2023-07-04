import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    color: black;
    display: flex;
    gap: 10%;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;

    .Toastify__close-button,
    .Toastify__close-button:hover,
    .Toastify__close-button:focus{
        color: #fff;
        border: none;
    }

    @media  (max-width: 1450px) {
        gap: 5%; 
    }
`

export const SomeValues = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 20%;
    justify-content: center;

        div {
            width: 410px;
            height: 180px;
            border: 2px solid #808080;
            border-radius: 9px;
        }

        span {
            height: 0;
            width: 100px;
            border: 1px solid #808080;
        }

    @media  (max-width: 1450px){
        width: 80%;

        div {
            height: 4rem;
        }

        span {
            height: 0;
            width: 4rem;
        }
    }

    @media  (max-width: 660px) {
        width: 80%;
        height: 1.5rem;

        div {
            height: 3rem;
        }
    }
`

export const ContainerValue = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 12px;

    img {
        width: 60px;
        height: 60px;
    }

    h1 {
        margin-top: 9%;
    }

    @media  (max-width: 1450px){
        img {
            width: 2rem;
            height: 2rem;
        }

        h1 {
            margin-top: 1.5rem;
            font-size: 1.7rem;
        }
    }

    @media  (max-width: 900px){
        h1 {
            margin-top: 1.5rem;
            font-size: 1.4rem;
        }
    }

    @media  (max-width: 700px) {
        img {
            width: 1rem;
            height: 1rem;
        }

        h1 {
            margin-top: 1rem;
            font-size: 1.2rem;
        }
    }

    @media  (max-width: 580px) {
        h1 {
            margin-top: 0.9rem;
            font-size: 0.9rem;
        }
    }

    @media  (max-width: 500px) {
        h1 {
            margin-top: 0.8rem;
            font-size: 0.7rem;
        }
    }
`

export const MidleButtons = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 1920px;
    gap: 8%;
    
    img {
        cursor: pointer;
    }

    @media  (max-width: 1450px){
        width: 100%;
    }

    @media  (max-width: 660px){
        gap: 20%;
        width: 80%;
    }

    @media  (max-width: 660px){
        gap: 12%;
        width: 80%;
    }
`

export const MonthButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    img {
        width: 20px;
    }

    img:hover {
        width: 25px;
    }
`

export const Items = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 50px;
    width: 90rem;
    min-height: 6rem;
    border: 2px solid #808080;
    border-radius: 9px;
    
    @media  (max-width: 1450px){
        width: 80%;
        min-height: 4rem !important;
    }

    @media  (max-width: 660px){
        gap: 0;
        font-size: 14px;
        max-height: 10%;
        min-height: 3rem !important;
    }

    @media  (max-width: 460px){
        font-size: 0.8rem;
    }
`

export const EditButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50%;

    img:first-child {
        width: 40px;
        cursor: pointer;
    }
    img {
        width: 30px;
    }
    @media  (max-width: 1450px){
        img:first-child {
            width: 30px;
        }
        img {
            width: 25px;
        }
    }

    @media  (max-width: 660px){
        img:first-child {
            width: 20px;
        }
        img {
            width: 18px;
        }
    }

    @media  (max-width: 460px){
        img:first-child {
            width: 14px;
        }
        img {
            width: 12px;
        }
    }
`