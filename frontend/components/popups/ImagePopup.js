import closeIcon from "../images/Close_Icon.png";

export default function ImagePopup(props) {
  return (
      <section 
        className={`content__grid-poster  ${props.isOpen ? "content__grid-poster-enabled":""} `} 
        id="modalPopUp">
          <div className="content__grid-poster-top">
            <img
              src={props.link}
              alt=""
              className="content__grid-poster-image"
              id="cardPopUp"
            />
            <img
              src={closeIcon}
              onClick={props.onClose}
              alt="close"
              className="content__grid-poster-close"
              id="closeImgBtn"
            />
          </div>
          <p className="content__grid-poster-name" id="popUpImgTitle">{props.name} </p>
      </section>
  )
}
