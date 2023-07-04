import { useGoogleLogin } from '@react-oauth/google';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import LanguageDropdown from '../../../Components/Language';
import { AuthContext } from '../../../Contexts/Auth/AuthContext';
import { BottomSign, Container, Forgot, Inputs, Language, LoginImage, LoginPart, Logo, OrSign, RememberAndForget, ShowPassword, SignUp, WelcomeText } from "../style";
import logo from '/dolarLoginImg.png';
import logoGoogle from '/gGoogle.png';
import hide from '/hide.png';
import leftImg from '/leftImg.jpg';
import show from '/show.png';
import i18n from '../../../../i18n'

const Login = () => {
    const auth = useContext(AuthContext);
    const { i18n: i18n2 } = useTranslation();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [remember, setRemember] = useState<boolean>()
    const [password, setPassword] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [errorField, setErrorField] = useState<string>('')
    const navigate = useNavigate();

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

    const validateLogin = async () => {

        if (!login || !password) {
            setErrorField('Empty field, fill in all fields')
            return false
        } else {
            setErrorField('')
        }

        const isLogged = await auth.login(login, password)

        if (isLogged === true) {
            return navigate('/home')
        } else {
            setErrorField('Incorrect username or password')
            console.log(isLogged.response)
        }
    }

    return (
        <>
            <Container>
                <p style={{ position: 'absolute', top: 0, right: 0, fontSize: '1.3rem', marginRight: '10px', marginTop: '10px', fontFamily: 'sans-serif' }} >V. β-0.0.1</p>
                <h1 style={{ position: 'absolute', bottom: 0, left: 0, fontSize: '0.625rem' }}>© 2023-Present Maicke Andrew</h1>

                <LoginImage style={{ borderRadius: '5px 0 0 5px' }}>
                    <img src={leftImg} />
                </LoginImage>
                <LoginPart style={{ borderRadius: '0 5px 5px 0' }}>
                    <Language>
                        <LanguageDropdown />
                    </Language>
                    <Logo>
                        <img src={logo} />
                        <p>finance.</p>
                    </Logo>
                    <WelcomeText>
                        <h1>{i18n.t('welcome')}</h1>
                        <p>{i18n.t('start')}</p>
                    </WelcomeText>
                    <Inputs>
                        <h2>Login</h2>
                        <input
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                            placeholder={'Login'}
                            onKeyDown={e => { if (e.key === 'Enter') validateLogin() }}
                        />
                    </Inputs>
                    <Inputs>
                        <h2>{i18n.t('password')}</h2>
                        <ShowPassword>
                            <input
                                onChange={e => setPassword(e.target.value)}
                                type={showPassword ? '' : 'password'} placeholder={`${i18n.t('password')}`}
                                onKeyDown={e => { if (e.key === 'Enter') validateLogin() }}
                            />
                            <img
                                src={showPassword ? hide : show}
                                style={{ width: '1.25rem' }}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </ShowPassword>
                        {errorField ? <p style={{ color: 'red', position: 'relative', top: '0.625rem' }}>{errorField}</p> : ''}
                    </Inputs>
                    <RememberAndForget>
                        <Forgot>
                            <p>
                                <input
                                    checked={remember}
                                    type='checkbox'
                                    onClick={() => setRemember(!remember)}
                                    style={{ marginBottom: '0.125rem' }}
                                />
                                <label>{i18n.t('remember')}</label>
                            </p>
                        </Forgot>
                        <Link to={'/newpassword'}>
                            <p style={{ color: 'black', height: '100%', marginBottom: '0.188rem' }}>{i18n.t('forgot')}</p>
                        </Link>
                    </RememberAndForget>
                    <BottomSign onClick={() => validateLogin()} style={{ backgroundImage: 'linear-gradient(to right, #223C5F, #77D1DD)' }}>
                        <h2 style={{ color: 'white' }} >{i18n.t('sign')}</h2>
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
                    <SignUp>
                        <p style={{ color: '#a5a5a5' }}>{i18n.t('hasAccount')}</p>
                        <Link to={'/validatemail'}>
                            <p style={{ color: 'black' }}>{i18n.t('signUp')}</p>
                        </Link>
                    </SignUp>
                </LoginPart>
            </Container>
        </>
    )
}

export default Login
