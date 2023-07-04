import { useGoogleLogin } from '@react-oauth/google';
import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '/dolarLoginImg.png';
import logoGoogle from '/gGoogle.png';
import checkGreen from '/checkgreen.jfif'
import leftImg from '/leftImg.jpg';
import { AuthContext } from '../../../Contexts/Auth/AuthContext';
import { useApi } from '../../../hooks/useApi';
import { BottomSign, Container, Inputs, Language, LoginImage, LoginPart, Logo, ModalOverlay, OrSign, SignUp, SimpleModal, WelcomeText } from "../style";
import LanguageDropdown from '../../../Components/Language';
import { useTranslation } from 'react-i18next';
import i18n from '../../../../i18n'

const NewPassword = () => {
    const auth = useContext(AuthContext);
    const { i18n: i18n2 } = useTranslation();
    const api = useApi()
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('')
    const [validEmail, setValidEmail] = useState<boolean>(true)
    const [emailUsed, setEmailUsed] = useState<string>('')
    const [resp, setResp] = useState<string>()
    const [showModal, setShowModal] = useState<boolean>(false)

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const query = queryParams.get('res')
        const queryToken = document.cookie.split('; ').find(item => item.startsWith(`${query}=`))
        const response = queryToken?.split(`${query}=`)[1]
        setResp(response?.replaceAll('%20', ' '))
    }, [resp])

    const googleLogin = useGoogleLogin({
        onSuccess: response => loginWithGoogle(response.access_token)
    });

    const loginWithGoogle = async (res: string) => {
        const response = await auth.loginGoogle(res)

        if (response === true) {
            return navigate('/home')
        } else {
            console.log(response.response.data.message)
        }
    }

    const sendEmail = async () => {
        const allowedDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
        const domain = email.split('@')[1];
        const valid = allowedDomains.includes(domain)

        if (valid === false) {
            return setValidEmail(valid)
        }

        setValidEmail(valid)

        const response = await api.user.emailNewPassword(email)

        if (typeof (response) == 'string') {
            return setEmailUsed(response)
        }

        setEmailUsed('')
        return setShowModal(true)
    }

    return (
        <>
            <Container>
                <h1 style={{ position: 'absolute', bottom: 0, left: 0, fontSize: '10px' }}>© 2023-Present Maicke Andrew</h1>
                <LoginPart style={{ borderRadius: '5px 0 0 5px' }}>
                    <Language style={{ marginBottom: '60px', justifyContent: 'flex-start', marginLeft: '40px' }}>
                        <LanguageDropdown />
                    </Language>
                    <Logo>
                        <img src={logo} />
                        <p>finance.</p>
                    </Logo>
                    <WelcomeText>
                        <h1>{i18n.t('forgotPassword')}</h1>
                        <p>{i18n.t('letsFix')} </p>
                    </WelcomeText>
                    <Inputs>
                        <h2>E-mail</h2>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            placeholder={`${i18n.t('inputEmail')}`}
                            onKeyDown={e => { if (e.key === 'Enter') sendEmail() }}
                        />
                        {!validEmail && <p style={{ color: 'red' }}>{i18n.t('invalidEmail')}</p>}
                        {emailUsed && <p style={{ color: 'red' }}>{emailUsed}</p>}
                        {showModal && <ModalOverlay />}
                        {showModal &&
                            <SimpleModal>
                                <img src={checkGreen} />
                                <p>{i18n.t('sentEmailChangePassword')}</p>
                                <p>{i18n.t('verifyEmail')}</p>
                            </SimpleModal>}
                    </Inputs>
                    {resp && <p style={{ color: 'red' }}>{resp}</p>}
                    <BottomSign onClick={sendEmail} style={{ backgroundImage: 'linear-gradient(to right, #223C5F, #77D1DD)' }}>
                        <h2 style={{ color: 'white' }} >{i18n.t('createNewPass')}</h2>
                    </BottomSign>
                    <OrSign>
                        <div></div>
                        {i18n.t('or')}
                        <div></div>
                    </OrSign>
                    <BottomSign onClick={() => googleLogin()}>
                        <img src={logoGoogle} />
                        <h2>{i18n.t('signGoogle')}</h2>
                    </BottomSign>
                    <BottomSign onClick={() => navigate('/')}>
                        <h2 style={{ color: 'black' }}>{i18n.t('backLogin')}</h2>
                    </BottomSign>
                    <SignUp>
                        <p style={{ color: '#a5a5a5' }}>{i18n.t('hasAccount')}</p>
                        <Link to={'/validatemail'}>
                            <p style={{ color: 'black' }}>{i18n.t('signUp')}</p>
                        </Link>
                    </SignUp>
                </LoginPart>
                <LoginImage style={{ borderRadius: '0 5px 5px 0' }}>
                    <img src={leftImg} />
                </LoginImage>
            </Container>
        </>
    )
}

export default NewPassword