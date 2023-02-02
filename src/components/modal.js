export const renderLoading = (isLoading, button, buttonText, loadingText) => {
    if (isLoading) {
        button.value = loadingText;
    } else {
        button.value = buttonText;
    }
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');

    document.addEventListener('keydown', handleKeyClose);
    document.addEventListener('mousedown', handleKeyClose);
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', handleKeyClose);
    document.removeEventListener('mousedown', handleKeyClose);
}

const handleKeyClose = (evt) => {
    if (evt.key === 'Escape' || evt.target.classList.contains('popup_opened')) {
        closePopup(document.querySelector('.popup_opened'));
    };
}