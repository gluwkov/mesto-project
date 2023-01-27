import { toggleButtonState } from "./validate.js";

export const closeButtons = document.querySelectorAll('.popup__close');

export const popupProfileForm = document.querySelector('.popup_form_edit');
export const popupPlaceForm = document.querySelector('.popup_form_add');

export const placeForm = document.forms.addForm;
export const createButton = placeForm.elements.createButton;

export const profileForm = document.forms.editForm;
export const saveButton = profileForm.elements.saveButton;

export const nameInput = document.querySelector('#nameInput');
export const jobInput = document.querySelector('#jobInput');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__description');

export const profileButton = document.querySelector('#editButton');
export const placeButton = document.querySelector('#addButton');

export const title = document.querySelector('#titleInput');
export const link = document.querySelector('#linkInput');

export function openPopup(popup) {
    popup.classList.add('popup_opened');

    document.addEventListener('keydown', keyHandler);
    document.addEventListener('mousedown', keyHandler);
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', keyHandler);
    document.removeEventListener('mousedown', keyHandler);
}

const keyHandler = (evt) => {
    if (evt.key === 'Escape' || evt.target.classList.contains('popup_opened')) {
        closePopup(document.querySelector('.popup_opened'));
    };
}