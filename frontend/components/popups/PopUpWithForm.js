import closeIcon from "../images/Close_Icon.png";

export default function PopUpWithForm(props) {
  return (

    <section 
      className={`popup popup_type_${props.name} 
      ${props.isOpen ? "popup__enabled":""} `} >
      
        <div className="popup__overlay"></div>
        <div className="popup__window">
        <h2 className="popup__window-title">{props.title}</h2>
        <form action="submit" className={`popup__window-form popup__form__${props.name}`} name={props.name}>
            {props.children}
            <button
            type="submit"
            className="popup__window-form-button popup__button">
            {props.buttonText}
            </button>
        </form>
        </div>
        <img src={closeIcon} className="popup__close" alt="close" onClick={props.onClose} />
    </section>
  )
}
