import { useState, useEffect } from "react";
import api from "../utils/api";
import Card from "./Card.js";

export default function Main(props){
    const[userName, setUserName] = useState("");
    const[userDescription, setUserDescription] = useState("");
    const[userAvatar, setUserAvatar] = useState("");
    const[cards, setCards] = useState([]);


    useEffect(()=>{
      async function getProfileInfo(){
        const response = await api.getUserInfo();
        setUserName(response.name);
        setUserDescription(response.about);
        setUserAvatar(response.avatar);

      }
      getProfileInfo();
    },[]);

    useEffect(()=>{
      async function getCards(){
        const response = await api.getInitialCards();
        console.log(response);
        setCards(response);
      }
      getCards();
    },[]);



  return(
      <main className="content">
        <section className="explorer">
          <div className="content__explorer">
            <div className="content__explorer-image" style={{ backgroundImage: `url(${userAvatar})` }}>
              <button className="content__explorer-image-button" onClick={props.onEditAvatarClick}></button>
            </div>
            <div className="content__explorer-info">
              <div className="content__explorer-info-top">
                <h2 className="content__explorer-name">{userName}</h2>
                <button className="content__explorer-edit-enable" onClick={props.onEditProfileClick}></button>
              </div>
              <h3 className="content__explorer-job">{userDescription}</h3>
            </div>
            <button className="content__explorer-add-enable" onClick={props.onAddPlaceClick}>+</button>
          </div>
        </section>
        <section className="grid">

          <div className="content__grid">
              {cards.map((card) => (
                <Card 
                  onCardClick = {props.onCardClick}
                  card = {card}
                  key={card._id} 
                  name={card.name} 
                  likes={card.likes} 
                  link={card.link}
                />
              ))}
          </div>

          
        </section>

      </main>
    );
}
