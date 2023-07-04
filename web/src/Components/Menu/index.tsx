import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FirstMenu, HamburgerButton, Language, Menu, MenuContainer, Overlay, SecondMenu, Switch } from "./style";

const Header = (props: any) => {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(window.localStorage.getItem('language') == 'pt' ? false : true);

  console.log(window.localStorage.getItem('language'))
  const handleToggle = (language?: string) => {
    if (language === 'pt') {
      i18n.changeLanguage(language)
      localStorage.setItem("language", language);
      return setIsChecked(false)
    } else if (language === 'en') {
      i18n.changeLanguage(language)
      localStorage.setItem("language", language);
      return setIsChecked(true)
    } else {
      let lng = window.localStorage.getItem('language')!;
      if (lng === 'pt') {
        i18n.changeLanguage('en')
        localStorage.setItem("language", 'en');
      } else {
        i18n.changeLanguage('pt')
        localStorage.setItem("language", 'pt');
      }
      return setIsChecked(!isChecked)
    }
  }

  const handleOpen = () => {
    setOpen(!open);
    props.callback(!open)
  };

  return (
    <>
      <HamburgerButton className={open ? 'open' : ''} onClick={handleOpen} style={{ zIndex: `${open ? 2 : 0}` }} >
        <div />
        <div />
        <div />
      </HamburgerButton>
      <Overlay open={open} onClick={handleOpen} />
      <MenuContainer className={open ? "open" : ""}>
        <Menu>
          <FirstMenu>
            <a href="/home">{i18n.t('home')}</a>
            <a href="#">{i18n.t('items')}</a>
            <a href="#">{i18n.t('settings')}</a>
          </FirstMenu>
          <SecondMenu>
            <Language>
              <p onClick={() => handleToggle('pt')} >PT</p>
              <Switch isChecked={isChecked} onClick={() => handleToggle()}>
                <div />
              </Switch>
              <p onClick={() => handleToggle('en')}>EN</p>
            </Language>
            <a href="#">{i18n.t('darkMode')}</a>
          </SecondMenu>
        </Menu>
      </MenuContainer>
    </>
  );
};

export default Header;