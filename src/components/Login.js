import React, {useState} from "react";
import * as auth from './Auth.js';

function Login({handleLoginPopupOnClick, setLoggedIn}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   
       function handleChangeInputEmail(e) {
           setEmail(e.target.value)
       }
   
       function handleChangeInputPassword(e) {
           setPassword(e.target.value)
       }

       function loginHandleSubmitForm(e) {
        e.preventDefault()
        auth.login(password, email).then((res) => {
            localStorage.setItem('token', res.token);
                setLoggedIn(true)
                setEmail('')
                setPassword('')
          }).catch((err) => {
            console.log(err)
            handleLoginPopupOnClick(false)
          });
      }

    return (
        <section className="sign">
            <h2 className="sign__title">Вход</h2>
                <form className="sign__form" name="sign-form" noValidate onSubmit={loginHandleSubmitForm}>
                    <div className="sign__input-block">
                    <input type="email" className="sign__input" placeholder="Email" required minLength="2" value={email} maxLength="30" name="email" onChange={handleChangeInputEmail}/>
                    <input type="text" className="sign__input" placeholder="Пароль" required minLength="2" value={password} maxLength="30" name="password" onChange={handleChangeInputPassword}/>
                    </div>
                    <button className="sign__button" type="submit">Войти</button>
                </form>
        </section>
    )
}

export default Login;