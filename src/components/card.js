import { openPopup } from "./modal.js";

const imageForm = document.querySelector('.popup_form_photo');

export const photoCardsContainer = document.querySelector('.photos');

const popupImage = document.querySelector('.formPhotoContainer__image');
const popupCaption = document.querySelector('.formPhotoContainer__caption');

const photoCardTemplate = document.querySelector('#photoCardTemplate').content;

export function copyPhotoCard(titleValue, linkValue) {
    const photoCardElement = photoCardTemplate.querySelector('.photo-card').cloneNode(true);

    photoCardElement.querySelector('.photo-card__image').src = linkValue;
    photoCardElement.querySelector('.photo-card__image').alt = titleValue;
    photoCardElement.querySelector('.photo-card__title').textContent = titleValue;
    photoCardElement.querySelector('.photo-card__delete-button').addEventListener('click', function (evt) {
        evt.target.closest('.photo-card').remove();
    })
    photoCardElement.querySelector('.photo-card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('photo-card__like-button_active')
    });
    photoCardElement.querySelector('.photo-card__image').addEventListener('click', function (evt) {
        popupImage.src = evt.target.src;
        popupImage.alt = evt.target.alt;
        popupCaption.textContent = evt.target.alt;
        openPopup(imageForm);
    })

    return photoCardElement;
}