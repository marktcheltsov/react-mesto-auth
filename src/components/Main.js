import React, { useContext } from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import profileEditBntImg from '../images/edit__button/Vector(3).svg';
import profileChangeImg from '../images/profile__image/image-change.png';
import Card from './Card.js';
import CurrentUserContext from '../context/CurrentUserContext.js';
import CardContext from '../context/CardContext.js';
import Footer from "./Footer.js";


function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardRemove, path}) {
  const user = useContext(CurrentUserContext);
  const cards = useContext(CardContext);

    return(
      <>
      <Route path={path}>
        <main className="main">
        <section className="profile">
          <div className="profile__info">
            <div className="profile__user-block">
              <h1 className="profile__name">{ user.name }</h1>
              <p className="profile__about">{ user.about }</p>
            </div>
            <button className="profile__edit-button" type="button" onClick={ onEditProfile }><img src={ profileEditBntImg } alt="добавить"/></button>
            <div className="profile__avatar">
              <div className="profile__change-image" onClick={ onEditAvatar }>
                <img src={ profileChangeImg } alt="аватарка" className="profile__avatar-image"/>
              </div>
              <img src={ user.avatar } alt="аватарка" className="profile__image"/>
            </div>
          </div>
          <button className="profile__card-button" type="button" onClick={ onAddPlace }></button>
        </section>
        <section className="elements">

        {cards.map((info, i) => (

          <Card url={info.link} title={ info.name } key={ info._id } likes={ info.likes } handleClick={ onCardClick } owner={ info.owner._id } onCardLike={onCardLike} card={info} onCardRemove={onCardRemove}/>)
    )}
        </section>
      </main>
      <Footer />
      </Route>
      </>
    )
}

export default Main;