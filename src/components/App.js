import React, { useEffect, useState } from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import Header from "./Header.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupImage from "./ImagePopup.js";
import CurrentUserContext from "../context/CurrentUserContext.js";
import CardContext from "../context/CardContext.js";
import myApi from "../utils/Api.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Register from "./Register.js"
import Login from "./Login.js"
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from '../utils/Auth.js';
import InfoTooltip from "./InfoTooltip.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditCardPopupOpen, setIsEditCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isloginResultPopupOpen, setIsloginResultPopupOpen] = useState(false);
  const [isloginResult, setIsloginResult] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [headerLinkText, setHeaderLinkText] = useState('Регистрация');

  const loginTrue = loggedIn === true

  function onClickHeaderLoginLink() {
    setHeaderLinkText('Войти')
  }

  function onClickHeaderRegisterLink() {
    setHeaderLinkText('Регистрация')
  }

  function handleUpdateUser(user) {
    const userName = user.name;
    const userAbout = user.about;
    myApi
      .pushNewUserInfo(userName, userAbout).then(()=>{
        setСurrentUser({ name: userName, about: userAbout , avatar: currentUser.avatar});
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    myApi
      .removeCard(card._id)
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setCards((item) =>
        item.filter((element) => element !== card)
        );
      });
  }

  function handleCardLike(card, user, callback) {
    const isLiked = card.likes.some((i) => i._id === user._id);
    if (isLiked) {
      myApi
        .deleteLike(card._id, isLiked)
        .catch((err) => {
          console.log(err);
        })
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
          callback(newCard.likes.length);
        });
    } else {
      myApi
        .addLike(card._id, !isLiked)
        .catch((err) => {
          console.log(err);
        })
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
          callback(newCard.likes.length);
        });
    }
  }

  function handleUpdateAvatar(link) {
    myApi
      .pushNewAvatar(link)
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setСurrentUser({ name: currentUser.name, about: currentUser.about , avatar: link })
        closeAllPopup();
      });
  }

  function closeAllPopup() {
    setIsEditProfilePopupOpen(false);
    setIsEditCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsloginResultPopupOpen(false)
    setSelectedCard({});
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleLoginPopupOnClick(result) {
    setIsloginResult(result)
    setIsloginResultPopupOpen(true);
  }


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsEditCardPopupOpen(true);
  }

  
  function onClickHeaderLink() {
    localStorage.removeItem('token');
    setLoggedIn(false)
  }

  function handleAddPlaceSubmit(name, link) {
    myApi
      .pushCard(name, link)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopup();
      });
  }

  function handleCardClick(name, link) {
    setSelectedCard({ opened: true, name: name, link: link });
  }

  useEffect(() => {
    if (loggedIn) {
      myApi
      .getCards()
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        setCards(res);
      });
    myApi
      .getUserInfoFromServer()
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        setСurrentUser(res);
      });
    }
  }, [loginTrue]);

  useEffect(() => {
  const jwt = localStorage.getItem('token')
  if (!jwt) {
    setLoggedIn(false)
  } else if (jwt) {
    auth.getUserInfo(jwt)
    .then((res)=> {
      setUserEmail(res.data.email)
      setLoggedIn(true)
    })
    .catch((err) => console.log(err));
  }
  }, []);

  return (
    <CardContext.Provider value={cards}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header loggedIn={loggedIn} userEmail={userEmail} onClickHeaderLink={onClickHeaderLink} headerLinkText={headerLinkText} onClickHeaderLoginLink={onClickHeaderLoginLink} onClickHeaderRegisterLink={onClickHeaderRegisterLink}/>
          <ProtectedRoute
            path="/" 
            loggedIn={loggedIn} 
            component={Main} 
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardRemove={handleCardDelete}>
          </ProtectedRoute>
          <AddPlacePopup
            isClose={closeAllPopup}
            isOpen={isEditCardPopupOpen}
            handleSubmit={handleAddPlaceSubmit}
          ></AddPlacePopup>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopup}
            onUpdateUser={handleUpdateUser}
          ></EditProfilePopup>
          <PopupWithForm
            name="remove"
            title="Вы уверены?"
            id=""
            btnText="да"
          ></PopupWithForm>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            isClose={closeAllPopup}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupImage isClose={closeAllPopup} isOpen={selectedCard} />
          <Switch>
          <Route exact path="/sign-up">
          <InfoTooltip isOpen={isloginResultPopupOpen} result={isloginResult} close={closeAllPopup} text={{trueText: 'Вы успешно зарегистрировались!', falseText: 'Что-то пошло не так! Попробуйте ещё раз.'}}></InfoTooltip>
            <Register handleLoginPopupOnClick={handleLoginPopupOnClick}></Register>
          </Route>
          <Route exact path="/sign-in">
          <InfoTooltip isOpen={isloginResultPopupOpen} result={isloginResult} close={closeAllPopup} text={{trueText: 'Вы успешно зарегистрировались!', falseText: 'Что-то пошло не так! Попробуйте ещё раз.'}}></InfoTooltip>
            <Login setLoggedIn={setLoggedIn} handleLoginPopupOnClick={handleLoginPopupOnClick}></Login>
          </Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}
          </Switch>
        </div>
      </CurrentUserContext.Provider>
    </CardContext.Provider>
  );
}
export default App;
