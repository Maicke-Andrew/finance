import styled from 'styled-components';

export const HeaderHome = styled.header`
    background-image: linear-gradient(to right, #223C5F, #77D1DD, #223C5F);
    width: 100vw;
    height: 8vh;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const HeaderLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 60px;
    height: 73px;
    left: 30px;
    cursor: pointer;

    img {
        width: 100%;
    }

    p {
        position: absolute;
        bottom: -17px;
        left: 60px;
        text-align: center;
        font-size: 25px;
        color: white;
    }

    @media (max-height: 781px) {
        img {
            width: 80%;
        }

        p {
            bottom: -14px;
        }
    }

    @media (max-height: 635px) {
        img {
            width: 60%;
        }

        p {
            bottom: -8px;
        }
    }
`

export const HeaderMenu = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
`