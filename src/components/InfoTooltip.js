import React from "react";
import trueImg from "../images/info__tooltip/Union-true.png"
import falseImg from "../images/info__tooltip/Union-false.png"


function InfoTooltip({result, isOpen, close}) {

    return (
        <div className={`popup popup-result ${isOpen ? 'popup_opened' : ''}`} id="popup">
        <div className={`popup__container popup-result__container`}> 
        <img className="popup__result-img" src={result ? trueImg : falseImg}/>
        <h2 className="popup__title popup__result__title">{result ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
        <button className={`popup__close-button popup__result__close-button`} type="button" onClick={close}></button>
        </div>
      </div>
    )
}

export default InfoTooltip;