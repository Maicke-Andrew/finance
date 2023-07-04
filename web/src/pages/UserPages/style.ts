import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #D9D9D9;
    display: flex;
    justify-content: center;
    align-items: center;

    * {
        margin: 0;
        padding: 0;
    }
`

export const Language = styled.div`
    display: flex;
    width: 100% !important;
    justify-content: flex-end;
    height: 0;
    margin-top: -18px;
    
    div:first-child{
        width: 140px;
    }

    @media (max-width: 450px) {
        margin-top: -5px;
    }
`

export const LoginImage = styled.div`
    height: 46rem;
    width: 36rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    border-radius: 5px 0 0 5px;

    @media (max-width: 1170px) {
        height: 43rem;
        width: 26rem;
    }

    @media (max-width: 846px) {
        display: none;
    }
`

export const LoginPart = styled.div`
    height: 46rem;
    width: 36rem;
    background-color: #FFFFFF;
    border-radius: 0 5px 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: black;
    gap: 3.5%;

    div {
        width: 70%;
    }

    @media (max-width: 1170px) {
        height: 43rem;
        width: 26rem;
    }

    @media (max-width: 450px) {
        width: 20rem;
    }
`

export const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;

    img {
        margin-left: -0.375rem;
        width: 4.563rem;
    }

    p {
        align-self: end;
        font-size: 1.75rem;
    }
`

export const WelcomeText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.313rem;

    h1 {
        font-size: 1.25rem;
    }

    p {
        color: #a5a5a5;
        font-size: 1rem;
    }

    @media (max-width: 1170px) {
        h1 {
            font-size: 1rem;
        }

        p {
            font-size: 0.8rem;
        }
    }

    @media (max-width: 450px) {
        h1 {
            font-size: 0.9rem;
        }

        p {
            font-size: 0.6rem;
        }
    }
`

export const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    
    input {
        border: solid 0.063rem #D9D9D9;
        border-radius: 0.313rem; 
        padding-left: 10px;
        height: 3.25rem;
        font-size: 1rem;
    }

    h2 {
        font-size: 1.125rem;
    }

    @media (max-width: 1170px) {
        input {
            font-size: 0.8rem;
        }

        h2 {
            font-size: 0.8rem;
        }
    }

    @media (max-width: 450px) {
        input {
            font-size: 0.6rem;
        }

        h2 {
            font-size: 0.6rem;
        }
    }
`

export const RememberAndForget = styled.div`
    display: flex;
    justify-content: space-between;
    
    p {
        display: flex;
        align-items: center;
        white-space: nowrap;
        height: 1rem;
        font-size: 1rem;

        label {
            height: 100%;
            margin-top: 0.188rem;
            margin-left: 0.313rem;
        }

        @media (max-width: 1170px) {
            font-size: 0.8rem;
        }

        @media (max-width: 846px) {
            font-size: 0.8rem;

            label {
                margin-top: 0.2rem;
            }
        }

        @media (max-width: 450px) {
            font-size: 0.65rem;

            label {
                margin-top: 0.35rem;
            }
        }
    }

`

export const Forgot = styled.label`
    display: flex;
    gap: 4%;
    font-size: 0.75rem;
    
    input {
        border-radius: 0.313rem;
        width: 1rem;
        height: 100%;
    }

    @media (max-width: 1170px) {
        font-size: 0.7rem;
    }

    @media (max-width: 450px) {
        font-size: 0.65rem;
    }
`

export const BottomSign = styled.div`
    display: flex;
    min-height: 3.25rem;
    width: 0.625rem;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    border: solid 0.063rem #D9D9D9;
    border-radius: 0.625rem;
    gap: 0.75rem;
    cursor: pointer;
    
    h2 {
        font-weight: normal;
    }

    img {
        width: 1.875rem;
    }

    @media (max-width: 1170px) {
        font-size: 0.6rem;
    }

    @media (max-width: 450px) {
        font-size: 0.5rem;
    }
`

export const OrSign = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: #a5a5a5;
    font-size: 1rem;

    div {
        width: 50%;
        border: 0.1px solid #D9D9D9;
    }

    @media (max-width: 1170px) {
        font-size: 0.8rem;
    }

    @media (max-width: 450px) {
        font-size: 0.7rem;
    }
`

export const SignUp = styled.div`
    display: flex;
    justify-content: center;
    font-size: 1rem;
    gap: 0.375rem;

    @media (max-width: 1170px) {
        font-size: 0.8rem;
    }

    @media (max-width: 450px) {
        font-size: 0.7rem;
    }
`

export const ShowPassword = styled.div`
    position: relative;
    width: 97% !important;
    
    input {
        width: 100%;
        position: relative;
        padding-left: 10px;
    }

    img {
        position: absolute;
        right: 10px;
        top: 33%;
        cursor: pointer;
    }
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

export const SimpleModal = styled.div`
  position: fixed;
  z-index: 11;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  max-width: 700px;
  height: 400px;
  padding: 20px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > img {
    width: 25%;
    max-width: 300px;
    height: auto;
    margin-bottom: 10px;
  }

  & > p {
    margin: 0;
    font-size: 27px;
    line-height: 1.5;
    text-align: center;
  }
`;