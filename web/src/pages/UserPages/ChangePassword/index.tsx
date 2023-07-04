import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import i18n from '../../../../i18n';
import LanguageDropdown from '../../../Components/Language';
import { useApi } from '../../../hooks/useApi';
import { BottomSign, Container, Inputs, Language, LoginImage, LoginPart, Logo, ShowPassword, WelcomeText } from "../style";
import logo from '/dolarLoginImg.png';
import hide from '/hide.png';
import leftImg from '/leftImg.jpg';
import show from '/show.png';

interface Validation {
    password: string;
    rePassword: string;
    diferentPassword: boolean;
}

const ChangePassword = () => {
    const api = useApi()
    const { i18n: i18n2 } = useTranslation()
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showRePassword, setShowRePassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>()
    const [rePassword, setRePassword] = useState<string>()
    const [passwordErro, setPasswordErro] = useState<string>()
    const [validation, setValidation] = useState<Validation>({
        password: '',
        rePassword: '',
        diferentPassword: false
    })

    const validatePassword = () => {
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

        changePassword()
    }

    const changePassword = async () => {
        const queryToken = document.cookie.split('; ').find(item => item.startsWith('userToken='))
        const token = queryToken?.split('userToken=')[1]

        const item = {
            token: token,
            password: password
        }

        const response = await api.user.newPassword(item)

        if (response.includes('sucefully')) {
            navigate('/')
        }

        setPasswordErro(response)
    }

    return (
        <>
            <Container>
                <h1 style={{ position: 'absolute', bottom: 0, left: 0, fontSize: '10px' }}>© 2023-Present Maicke Andrew</h1>
                <LoginPart style={{ borderRadius: '5px 0 0 5px' }}>
                    <Language>
                        <LanguageDropdown />
                    </Language>
                    <Logo>
                        <img src={logo} />
                        <p>finance.</p>
                    </Logo>
                    <WelcomeText>
                        <h1>{i18n.t('letsUseNewPass')}</h1>
                        <p>{i18n.t('dontForget')}</p>
                    </WelcomeText>
                    <Inputs>
                        <h2>{i18n.t('password')}</h2>
                        <ShowPassword>
                            <input
                                onChange={e => setPassword(e.target.value)}
                                type={showPassword ? '' : 'password'}
                                placeholder={`${i18n.t('password')}`}
                                onKeyDown={e => { if (e.key === 'Enter') validatePassword() }}
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
                                onKeyDown={e => { if (e.key === 'Enter') validatePassword() }}
                            />
                            <img
                                src={showRePassword ? hide : show}
                                style={{ width: '1.25rem' }}
                                onClick={() => setShowRePassword(!showRePassword)}
                            />
                        </ShowPassword>
                        {passwordErro && <p style={{ color: 'red' }}>{passwordErro}</p>}
                        {validation.password.length > 0 && <p style={{ color: 'red' }}>{validation.password}</p>}
                    </Inputs>
                    <BottomSign onClick={validatePassword} style={{ backgroundImage: 'linear-gradient(to right, #223C5F, #77D1DD)' }}>
                        <h2 style={{ color: 'white' }} >{i18n.t('createYourNewPassword')}</h2>
                    </BottomSign>
                </LoginPart>
                <LoginImage style={{ borderRadius: '0 5px 5px 0' }}>
                    <img src={leftImg} />
                </LoginImage>
            </Container>
        </>
    )
}

export default ChangePassword