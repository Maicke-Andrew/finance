import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from "react-router-dom";
import i18n from '../../../../i18n';
import LanguageDropdown from '../../../Components/Language';
import { useApi } from '../../../hooks/useApi';
import { BottomSign, Container, Inputs, Language, LoginImage, LoginPart, Logo, ModalOverlay, OrSign, ShowPassword, SimpleModal, WelcomeText } from "../style";
import checkGreen from '/checkgreen.jfif';
import logo from '/dolarLoginImg.png';
import hide from '/hide.png';
import leftImg from '/leftImg.jpg';
import show from '/show.png';

interface Validation {
    login: string;
    name: string;
    password: string;
    rePassword: string;
    diferentPassword: boolean;
}

const Register = () => {
    const api = useApi()
    const { i18n: i18n2 } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation();
    const email = location.state;
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showRePassword, setShowRePassword] = useState<boolean>(false);
    const [login, setLogin] = useState<string>()
    const [completeName, setCompleteName] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [rePassword, setRePassword] = useState<string>()
    const [loginUsed, setLoginUsed] = useState<string>()
    const [errorToSend, setErrorToSend] = useState<string>()
    const [showModal, setShowModal] = useState<boolean>(false)
    const [validation, setValidation] = useState<Validation>({
        login: '',
        name: '',
        password: '',
        rePassword: '',
        diferentPassword: false
    })

    useEffect(() => {
        if (!email) {
            return navigate('/validatemail')
        }
    }, [email])

    const validates = async () => {
        const response = await api.auth.eamilAlreadyUsed(email);

        if (response) {
            return navigate('/validatemail')
        }
    }

    const validateInformations = async () => {
        validates();

        if (!login) {
            return setValidation((object) => { return { ...object, login: 'Required field' } });
        } else {
            if (!/^\S+$/.test(login)) {
                return setValidation((object) => { return { ...object, login: 'Backspace not allowed' } })
            }

            const alreadyUsed = await api.auth.loginAlreadyExist(login);

            if (alreadyUsed) {
                setLoginUsed(alreadyUsed)
            }
            setValidation((object) => { return { ...object, login: '' } });
        }

        if (!completeName) {
            return setValidation((object) => { return { ...object, name: 'Required field' } });
        } else {
            if (!/^[a-zA-Z]+\s[a-zA-Z]+\.?$/.test(completeName)) {
                return setValidation((object) => { return { ...object, name: 'The field must have name space and surname' } })
            }
            setValidation((object) => { return { ...object, name: '' } });
        }

        if (!password) {
            return setValidation((object) => { return { ...object, password: 'Required field' } });
        } else {
            if (!/^\S+$/.test(password)) {
                return setValidation((object) => { return { ...object, password: 'Backspace not allowed' } })
            }
            if (password.length < 7) {
                return setValidation((object) => { return { ...object, password: 'Password field must contain more than 6 letters' } })
            } else if (password.length > 14) {
                return setValidation((object) => { return { ...object, password: 'Password field must not contain more than 13 letters' } })
            }
            setValidation((object) => { return { ...object, password: '' } });
        }

        if (!rePassword) {
            return setValidation((object) => { return { ...object, rePassword: 'Required field' } });
        } else {
            setValidation((object) => { return { ...object, rePassword: '' } });
        }

        if (password !== rePassword) {
            return setValidation((object) => { return { ...object, diferentPassword: true } });
        } else {
            setValidation((object) => { return { ...object, diferentPassword: false } });
        }

        const newUser = {
            name: `${completeName.split(' ')[0]}`,
            surname: `${completeName.split(' ')[1]}`,
            login: login,
            email: email,
            password: password,
            pictureUrl: null
        }

        sendEmail(newUser)
    }

    const sendEmail = async (user: object) => {
        const response = await api.user.sendEmailNewAccount(user)

        if (typeof (response) == 'string') {
            return setErrorToSend(response)
        }
        setErrorToSend('')

        return setShowModal(!showModal)
    }

    return (
        <>
            <Container>
                <h1 style={{ position: 'absolute', bottom: 0, left: 0, fontSize: '10px' }}>© 2023-Present Maicke Andrew</h1>
                <LoginPart style={{ borderRadius: '5px 0 0 5px', gap: '12px' }}>
                    <Language style={{ justifyContent: 'flex-start', marginLeft: '40px', marginBottom: '30px' }}>
                        <LanguageDropdown />
                    </Language>
                    <Logo>
                        <img src={logo} />
                        <p>finance.</p>
                    </Logo>
                    <WelcomeText>
                        <h1>{i18n.t('organizing')}</h1>
                        <p>{i18n.t('startCreate')}</p>
                    </WelcomeText>
                    <Inputs>
                        <h2>Login</h2>
                        <input
                            onChange={e => setLogin(e.target.value)}
                            placeholder={`${i18n.t('inputLogin')}`}
                            onKeyDown={e => { if (e.key === 'Enter') validateInformations() }}
                        />
                        {loginUsed && <p style={{ color: 'red' }}>{loginUsed}</p>}
                        {validation.login.length > 0 && <p style={{ color: 'red' }}>{validation.login}</p>}
                    </Inputs>
                    <Inputs>
                        <h2>{i18n.t('nameSurname')}</h2>
                        <input
                            onChange={e => setCompleteName(e.target.value)}
                            placeholder={`${i18n.t('inputName')}`}
                            onKeyDown={e => { if (e.key === 'Enter') validateInformations() }}
                        />
                        {validation.name.length > 0 && <p style={{ color: 'red' }}>{validation.name}</p>}
                    </Inputs>
                    <Inputs>
                        <h2>{i18n.t('password')}</h2>
                        <ShowPassword>
                            <input
                                onChange={e => setPassword(e.target.value)}
                                type={showPassword ? '' : 'password'}
                                placeholder={`${i18n.t('password')}`}
                                onKeyDown={e => { if (e.key === 'Enter') validateInformations() }}
                            />
                            <img
                                src={showPassword ? hide : show}
                                style={{ width: '1.25rem' }}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </ShowPassword>
                        {validation.password.length > 0 && <p style={{ color: 'red' }}>{validation.password}</p>}
                    </Inputs>
                    <Inputs>
                        <h2>{i18n.t('repeatPass')}</h2>
                        <ShowPassword>
                            <input
                                onChange={e => setRePassword(e.target.value)}
                                type={showRePassword ? '' : 'password'}
                                placeholder={`${i18n.t('repeatPass')}`}
                                onKeyDown={e => { if (e.key === 'Enter') validateInformations() }}
                            />
                            <img
                                src={showRePassword ? hide : show}
                                style={{ width: '1.25rem' }}
                                onClick={() => setShowRePassword(!showRePassword)}
                            />
                        </ShowPassword>
                        {validation.rePassword.length > 0 && <p style={{ color: 'red' }}>{validation.rePassword}</p>}
                        {validation.diferentPassword && <p style={{ color: 'red' }}>{i18n.t('diffPassword')}</p>}
                        {errorToSend && <p style={{ color: 'red' }}>{errorToSend}</p>}
                        {showModal && <ModalOverlay />}
                        {showModal &&
                            <SimpleModal>
                                <img src={checkGreen} />
                                <p>{i18n.t('activeAccountEmail')}</p>
                                <p>{i18n.t('verifyEmail')}</p>
                            </SimpleModal>}
                    </Inputs>
                    <BottomSign onClick={validateInformations} style={{ backgroundImage: 'linear-gradient(to right, #223C5F, #77D1DD)' }}>
                        <h2 style={{ color: 'white' }} >{i18n.t('confirmCreation')}</h2>
                    </BottomSign>
                    <OrSign>
                        <div></div>
                        {i18n.t('or')}
                        <div></div>
                    </OrSign>
                    <BottomSign onClick={() => navigate('/')}>
                        <h2 style={{ color: 'black' }}>{i18n.t('backLogin')}</h2>
                    </BottomSign>
                </LoginPart>
                <LoginImage style={{ borderRadius: '0 5px 5px 0' }}>
                    <img src={leftImg} />
                </LoginImage>
            </Container>
        </>
    )
}

export default Register