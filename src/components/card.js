export { createCard, deleteCard, likeCard };


// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки

function createCard(cardData) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true),
    cardImage = newCard.querySelector(".card__image");

  newCard.querySelector(".card__title").textContent = cardData.name;

  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;

  newCard
    .querySelector(".card__delete-button")
    .addEventListener("click", () => cardData.deleteCard(newCard));

  cardImage.addEventListener("click", () => cardData.openCard(cardData.link, cardData.name));

  newCard
    .querySelector(".card__like-button")
    .addEventListener("click", cardData.likeCard);

  return newCard;
}

// @todo: Функция удаления карточки

const deleteCard = (card) => {
  card.remove();
};

// @todo: Функция лайка карточки

const likeCard = (event) => {
  event.target.classList.toggle("card__like-button_is-active");
};

