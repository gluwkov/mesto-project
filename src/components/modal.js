import { createPhotoCard } from "./card.js";

const closeButtons = document.querySelectorAll('.popup__close');

const editForm = document.querySelector('.popup_form_edit');
const addForm = document.querySelector('.popup_form_add');

const nameInput = document.querySelector('#nameInput');
const jobInput = document.querySelector('#jobInput');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

const editButton = document.querySelector('#editButton');
const addButton = document.querySelector('#addButton');

const title = document.querySelector('#titleInput');
const link = document.querySelector('#linkInput');

export function openPopup(popup) {
    popup.classList.add('popup_opened');

    document.addEventListener('keydown', keyHandler);
    document.addEventListener('mousedown', keyHandler);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', keyHandler);
    document.removeEventListener('mousedown', keyHandler);
}

const keyHandler = (evt) => {
    const openedPopup = document.querySelector('.popup_opened');

    if (evt.key === 'Escape' || evt.target.classList.contains('popup_opened')) {
        closePopup(openedPopup);
    };
}

function editFormSubmitHandler(evt) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    evt.preventDefault();
    closePopup(editForm);
}

function addFormSubmitHandler(evt) {
    createPhotoCard(title.value, link.value);
    
    evt.preventDefault();
    evt.target.reset();
    closePopup(addForm);
}

addButton.addEventListener('click', function () {
    openPopup(addForm);
})

editButton.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    openPopup(editForm);
})

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

addForm.addEventListener('submit', addFormSubmitHandler);
editForm.addEventListener('submit', editFormSubmitHandler);