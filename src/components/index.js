import '../pages/index.css';

import { createCard, addCardToDOM } from './card.js';
import { enableValidation } from "./validate.js";
import { closeButtons, popupProfileForm, popupPlaceForm, popupAvatarForm, avatarPicture, avatarLink, avatarButton, avatarSaveButton, nameInput, jobInput, profileName, profileJob, profileButton, placeButton, saveButton, createButton } from './variables.js';
import { getAppInfo, postNewCard, setUserAvatar, setUserInfo } from './api.js';
import { renderLoading, openPopup, closePopup } from './modal.js';

export let userId;

const setProfileData = (user) => {
    profileName.textContent = user.name,
        profileJob.textContent = user.about,
        avatarPicture.src = user.avatar,
        userId = user._id
};

const renderPage = () => {
    getAppInfo()
        .then(([user, cards]) => {
            setProfileData(user);
            cards.reverse().forEach(item => {
                addCardToDOM(createCard(item.name, item.link, item.likes, item.owner._id, item._id));
            });
        })
        .catch((err) => console.log(err));
};

function profileFormSubmitHandler(evt) {
    evt.preventDefault();

    const submitButton = evt.submitter;
    const initialText = submitButton.value;

    renderLoading(true, submitButton, initialText, 'Сохранение...');
    setUserInfo(nameInput.value, jobInput.value)
        .then((user) => {
            setProfileData(user);
            closePopup(popupProfileForm)
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, submitButton, initialText)
        })
}

function placeFormSubmitHandler(evt) {
    evt.preventDefault();

    const submitButton = evt.submitter;
    const initialText = submitButton.value;

    renderLoading(true, submitButton, initialText, 'Создание...')
    postNewCard(titleInput.value, linkInput.value)
        .then((item) => {
            addCardToDOM(createCard(item.name, item.link, item.likes, item.owner._id, item._id));
            evt.target.reset();
            closePopup(popupPlaceForm);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, submitButton, initialText)
        })
}

const avatarFormSubmitHandler = (evt) => {
    evt.preventDefault();

    const submitButton = evt.submitter;
    const initialText = submitButton.value;

    renderLoading(true, submitButton, initialText, 'Сохранение...')
    setUserAvatar(avatarLink.value)
        .then((user) => {
            setProfileData(user);
            evt.target.reset();
            closePopup(popupAvatarForm);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, submitButton, initialText)
        })
}

avatarButton.addEventListener('click', () => {
    avatarSaveButton.disabled = true;
    avatarSaveButton.classList.add('popup__submit_status_disabled');

    openPopup(popupAvatarForm);
})

placeButton.addEventListener('click', function () {
    createButton.disabled = true;
    createButton.classList.add('popup__submit_status_disabled');

    openPopup(popupPlaceForm);
})

profileButton.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    saveButton.disabled = true;
    saveButton.classList.add('popup__submit_status_disabled');

    openPopup(popupProfileForm);
})

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

popupProfileForm.addEventListener('submit', profileFormSubmitHandler);
popupPlaceForm.addEventListener('submit', placeFormSubmitHandler);
popupAvatarForm.addEventListener('submit', avatarFormSubmitHandler);

enableValidation({
    formSelector: '.form',
    inputSelector: '.popup__item_element_text',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_status_disabled',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__input-error'
});

renderPage();