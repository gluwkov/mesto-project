import { userId } from "./index.js";
import { putLikeOnServer, deleteLikeFromServer, deleteCard } from "./api.js";
import { openPopup } from "./modal.js";

export const imageForm = document.querySelector('.popup_form_photo');
export const popupImage = document.querySelector('.formPhotoContainer__image');
export const popupCaption = document.querySelector('.formPhotoContainer__caption');

const photoCardsContainer = document.querySelector('.photos');
const photoCardTemplate = document.querySelector('#photoCardTemplate').content;

export const createCard = (title, link, likes, ownerId, cardId) => {
    const photoCardElement = photoCardTemplate.querySelector('.photo-card').cloneNode(true);
    const photoCardImage = photoCardElement.querySelector('.photo-card__image');
    const photoCardDeleteButton = photoCardElement.querySelector('.photo-card__delete-button');
    const photoCardLikeButton = photoCardElement.querySelector('.photo-card__like-button');
    const photoCardLikeCounter = photoCardElement.querySelector('.photo-card__like-count');
    const cardLikes = Array.from(likes);
    photoCardElement.querySelector('.photo-card__title').textContent = title;
    photoCardImage.src = link;
    photoCardImage.alt = title;
    photoCardLikeCounter.textContent = likes.length > 0 ? likes.length : '';

    cardLikes.forEach((card) => {
        if (card._id === userId) {
            photoCardLikeButton.classList.add('photo-card__like-button_active');
        }
    });

    openImageForm(photoCardImage, title, link);

    photoCardLikeButton.addEventListener('click', () => {
        if (photoCardLikeButton.classList.contains('photo-card__like-button_active')) {
            deletelike(photoCardLikeButton, photoCardLikeCounter, likes, cardId);
        } else {
            addlike(photoCardLikeButton, photoCardLikeCounter, likes, cardId);
        }
    });

    if (ownerId !== userId) { photoCardDeleteButton.remove(); }

    photoCardDeleteButton.addEventListener('click', () => {
        deleteCard(cardId)
            .then(() => photoCardElement.remove())
            .catch((err) => console.log(err));
    });

    return photoCardElement;
}

export const addCardToDOM = (card) => {
    photoCardsContainer.prepend(card);
}

const openImageForm = (photoCardImage, title, link) => {
    photoCardImage.addEventListener('click', () => {
        popupCaption.textContent = title;
        popupImage.src = link;
        popupImage.alt = title;
        openPopup(imageForm);
    });
};

const addlike = (button, counter, likes, cardId) => {
    return putLikeOnServer(cardId)
        .then((result) => {
            if (!(button.classList.contains('photo-card__like-button_active'))) {
                counter.textContent = likes.length + 1;
            }
            button.classList.add('photo-card__like-button_active');
            counter.textContent = result.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
};

const deletelike = (button, counter, likes, cardId) => {
    return deleteLikeFromServer(cardId)
        .then((result) => {
            if (button.classList.contains('photo-card__like-button_active')) {
                counter.textContent = likes.length - 1;
            }
            button.classList.remove('photo-card__like-button_active');
            counter.textContent = result.likes.length > 0 ? result.likes.length : '';
        })
        .catch((err) => {
            console.log(err);
        });
};