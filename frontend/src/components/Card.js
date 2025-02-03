export default function Card( props ) {
  function handleClick(){
    props.onCardClick(props.card);
  }
  return (
    <div className="content__grid-card">
    <img
      src={props.link} 
      alt="card-image"
      className="content__grid-image"
      onClick={handleClick}
    />
    <div
      className="content__grid-image-delete">
    </div>
    <div className="content__grid-card-description">
      <p className="content__grid-card-name">{props.name}</p>
      <div className="content__grid-card-container">
        <button className="content__grid-like"></button>
        <p className="content__grid-number">{props.likes.length}</p>
      </div>
    </div>
  </div>
  )
}
