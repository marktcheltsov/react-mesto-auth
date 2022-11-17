import React from 'react'
import headeLogoImg from '../images/header__logo/Vector.svg'
import { Link} from 'react-router-dom';

function Header({userEmail, onClickHeaderLink, loggedIn, headerLinkText, onClickHeaderLoginLink, onClickHeaderRegisterLink}) {

   function renderHaeder(){
      if (loggedIn) {
         return (
            <>
               <h2 className="header__user-email">{userEmail}</h2>
               <a className="header__link" onClick={onClickHeaderLink}>Выйти</a>
            </>
         )
      } else if (headerLinkText === 'Регистрация' && !loggedIn) {
         return (
               <Link className="header__link" to="sign-up" onClick={onClickHeaderLoginLink}>Регистрация</Link>
         )
      } else {
         return (
               <Link className="header__link" to="sign-in" onClick={onClickHeaderRegisterLink}>Войти</Link>
         )
      }
   }

 return (
    <header className="header">
    <img src={ headeLogoImg } alt="лого" className="header__logo" />
    <nav className="header__menu">
    {renderHaeder()}
    </nav>
    </header>
 )
}

export default Header;