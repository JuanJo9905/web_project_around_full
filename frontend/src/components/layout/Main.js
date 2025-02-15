import { useState, useEffect } from "react";
import { useContext } from 'react';
import { currentUserContext } from '../../contexts/CurrentUserContext';
import api from "../../utils/api.js";
import Card from "../Card.js";

export default function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  onCardDelete,
  onCardLike,
  cards
}) {
  const currentUser = useContext(currentUserContext);

  return (
    <main className="content">
      <section className="explorer">
        <div className="content__explorer">
          <div className="content__explorer-image" style={{ backgroundImage: `url(${currentUser.avatar})`,backgroundSize: 'cover',backgroundPosition: 'center' }}>
            <button
              type="button"
              className="content__explorer-image-button"
              onClick={onEditAvatarClick}
              aria-label="Editar avatar"
            />
          </div>
          <div className="content__explorer-info">
            <div className="content__explorer-info-top">
              <h2 className="content__explorer-name">{currentUser.name}</h2>
              <button
                type="button"
                className="content__explorer-edit-enable"
                onClick={onEditProfileClick}
                aria-label="Editar perfil"
              />
            </div>
            <h3 className="content__explorer-job">{currentUser.about}</h3>
          </div>
          <button
            type="button"
            className="content__explorer-add-enable"
            onClick={onAddPlaceClick}
            aria-label="Añadir lugar"
          >
            +
          </button>
        </div>
      </section>
      <section className="grid">
        <div className="content__grid">
          {cards.map((card) => (
            <Card
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
              card={card}
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