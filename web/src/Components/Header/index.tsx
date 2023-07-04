import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '/dolarLoginImg.png'
import Menu from '../Menu';
import User from '../User';
import { HeaderHome, HeaderLogo, HeaderMenu } from './style';


const Header = () => {
    const navigate = useNavigate();
    const [userProps, setUserProps] = useState<object>();
    const [menuProps, setMenuProps] = useState<object>();

    const goHome = () => {
        navigate('/home')
    }

    const userCallback = (userClick: object) => {
        setMenuProps(userClick)
    }

    const menuCallback = (menuClick: object) => {
        setUserProps(menuClick);
    }

    return (
        <HeaderHome>
            <HeaderLogo onClick={goHome}>
                <img src={Logo} />
                <p>finance.</p>
            </HeaderLogo>
            <HeaderMenu>
                <User props={userProps} callback={userCallback} />
                <Menu callback={menuCallback} props={menuProps} />
            </HeaderMenu>
        </HeaderHome>
    )
}

export default Header