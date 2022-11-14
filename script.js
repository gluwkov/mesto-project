const editButton = document.querySelector('#editButton');
const addButton = document.querySelector('#addButton');
const createButton = document.querySelector('#createButton');
const saveButton = document.querySelector('#saveButton');
const closeButtons = document.querySelectorAll('.popup__close');

const editForm = document.querySelector('.popup_form_edit');
const addForm = document.querySelector('.popup_form_add');
const imageForm = document.querySelector('.popup_form_photo');

const photoCardsContainer = document.querySelector('.photos');

const nameInput = document.querySelector('#nameInput');
const jobInput = document.querySelector('#jobInput');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

let title = document.querySelector('#titleInput');
let link = document.querySelector('#linkInput');

const popupImage = document.querySelector('.formPhotoContainer__image');
const popupCaption = document.querySelector('.formPhotoContainer__caption');

const photoCardTemplate = document.querySelector('#photoCardTemplate').content;
//functions
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function copyPhotoCard(titleValue, linkValue) {
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

function createPhotoCard(titleValue, linkValue) {
    const photoCardElement = copyPhotoCard(titleValue, linkValue);
    photoCardsContainer.prepend(photoCardElement);
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
    closePopup(addForm);
}
//
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

addButton.addEventListener('click', function () {
    openPopup(addForm);
})

editButton.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    openPopup(editForm);
})

addForm.addEventListener('submit', addFormSubmitHandler)
editForm.addEventListener('submit', editFormSubmitHandler)

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