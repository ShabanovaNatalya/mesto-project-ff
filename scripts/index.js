// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const content = document.querySelector('.content'),
      cardContainer = content.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(card, deleteHandler) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  newCard.querySelector('.card__title').textContent = card.name;
  newCard.querySelector('.card__image').src = card.link;
  newCard.querySelector('.card__image').alt = card.name;

  newCard.querySelector('.card__delete-button').addEventListener('click', () => deleteHandler(newCard));

  return newCard
};

// @todo: Функция удаления карточки

const deleteCard = card => {
  card.remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach(card => {
  cardContainer.append(createCard(card, deleteCard));
});
