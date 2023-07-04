import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import userDefault from '/userDefault.png';
import { AuthContext } from '../../Contexts/Auth/AuthContext';
import { useApi } from "../../hooks/useApi";
import { Container, MenuContainer, MenuHref, MenuImg, Overlay } from "./style";
import imagenUser from "./userImagen";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";

interface IUser {
    createdAt?: string;
    email: string;
    name: string;
    surname: string;
    pictureUrl: string;
}

const User = (props: any) => {
    const api = useApi()
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const { i18n: i18n2 } = useTranslation()
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<IUser>()
    const [image, setImage] = useState<string>()


    useEffect(() => {
        setUser(auth.user!)
        setImage(auth.user!.pictureUrl)
    }, [])

    useEffect(() => {
        const takePicture = async () => {
            const response: any = await api.user.getPicture(auth.user!.id)
            setImage(response.pictureUrl)
        }
        takePicture()
    }, [auth.response.message.includes('Image')])

    const handleOpen = async () => {
        setOpen(!open)
        props.callback(open)
    }

    const profile = () => {
        auth.profileModalIsOpen(true)
        setOpen(!open)
    }

    const feedback = () => {
        return navigate('/feedback');
    }


    const logout = () => {
        auth.logout();
        return navigate('/');
    }

    return (
        <>
            <Container className={props.props ? 'open' : ''} style={{ zIndex: props.props ? 0 : 2 }}>
                {image ?
                    <img referrerPolicy={'no-referrer'} src={image} onClick={handleOpen} />
                    :
                    <img src={userDefault} onClick={handleOpen} />
                }
            </Container>
            <Overlay open={open} onClick={handleOpen} />
            {open ?
                <MenuContainer>
                    <MenuImg>
                        <img onClick={profile} src={imagenUser.menuser1} />
                        <img onClick={feedback} src={imagenUser.feedback1} />
                        <img onClick={logout} src={imagenUser.logout1} />
                    </MenuImg>
                    <MenuHref>
                        <p onClick={profile}>{i18n.t('profile')}</p>
                        <p onClick={feedback}>{i18n.t('feedback')}</p>
                        <p onClick={logout}>{i18n.t('logout')}</p>
                    </MenuHref>
                </MenuContainer>
                :
                ''
            }
        </>
    )
}

export default User