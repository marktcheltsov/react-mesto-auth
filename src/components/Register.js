import React, {useState} from "react";
import * as auth from './Auth.js';


function Register({handleLoginPopupOnClick}) {
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')

    function handleChangeInputEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangeInputPassword(e) {
        setPassword(e.target.value)
    }

    function RegisterHandleSubmitForm(e) {
        e.preventDefault()
        auth.registration(password, email).then((res)=>{
          console.log(res)
          handleLoginPopupOnClick(true)
        }).catch((err) => {
          console.log(err)
          handleLoginPopupOnClick(false)
        });
      }

    return (
        <section className="sign">
            <h2 className="sign__title">Регистрация</h2>
                <form className="sign__form" name="" noValidate onSubmit={RegisterHandleSubmitForm}>
                    <div className="sign__input-block">
                    <input type="email" className="sign__input" placeholder="Email" value={email} required minLength="2" maxLength="30" name="email" onChange={handleChangeInputEmail}/>
                    <input type="text" className="sign__input" placeholder="Пароль" value={password} required minLength="2" maxLength="30" name="password" onChange={handleChangeInputPassword}/>
                    </div>
                    <button className="sign__button" type="submit">Зарегистрироваться</button>
                </form>
                <p className="sign__link-decription">Уже зарегистрированы? Войти</p>
        </section>
    )
}

export default Register;