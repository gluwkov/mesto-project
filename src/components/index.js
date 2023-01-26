import '../pages/index.css';

import { copyPhotoCard, photoCardsContainer } from './card.js';
import { enableValidation } from "./validate.js";
import { closeButtons, popupProfileForm, popupPlaceForm, nameInput, jobInput, profileName, profileJob, profileButton, placeButton, title, link, openPopup, closePopup } from './modal.js';

export function createPhotoCard(titleValue, linkValue) {
    const photoCardElement = copyPhotoCard(titleValue, linkValue);
    photoCardsContainer.prepend(photoCardElement);
}

const initialCards = [
    {
        name: 'Чёрная речка',
        link: 'https://images.unsplash.com/photo-1635530043255-eb163c579d4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
    },
    {
        name: 'Никола-Ленивец',
        link: 'https://images.unsplash.com/photo-1603617913858-0cc7fcbf7eab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
    },
    {
        name: 'Москва',
        link: 'https://images.unsplash.com/photo-1635847421556-f39631511aa3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
    },
    {
        name: 'Санкт-Петербург',
        link: 'https://images.unsplash.com/photo-1599756972648-196c48e6fca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        name: 'Кинерма',
        link: 'https://images.unsplash.com/photo-1559029881-7cfd01ac1f18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80'
    },
    {
        name: 'Сочи',
        link: 'https://images.unsplash.com/photo-1608926632580-067ba78be72b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1444&q=80'
    }
];

initialCards.forEach(function (element) {
    const items = Object.keys(element);
    const name = element[items[0]];
    const link = element[items[1]];
    createPhotoCard(name, link);
})

function profileFormSubmitHandler(evt) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    evt.preventDefault();
    closePopup(popupProfileForm);
}

function placeFormSubmitHandler(evt) {
    createPhotoCard(title.value, link.value);

    evt.preventDefault();
    evt.target.reset();
    closePopup(popupPlaceForm);
}

placeButton.addEventListener('click', function () {
    openPopup(popupPlaceForm);
})

profileButton.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    openPopup(popupProfileForm);
})

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

popupProfileForm.addEventListener('submit', profileFormSubmitHandler);
popupPlaceForm.addEventListener('submit', placeFormSubmitHandler);

enableValidation({
    formSelector: '.form',
    inputSelector: '.popup__item_element_text',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_status_disabled',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__input-error'
});