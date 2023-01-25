const showInputError = (form, input, errorMessage) => {
  const inputError = form.querySelector(`.${input.id}-error`);

  input.classList.add('popup__item_type_error');
  inputError.textContent = errorMessage;
}

const hideInputError = (form, input) => {
  const inputError = form.querySelector(`.${input.id}-error`);

  input.classList.remove('popup__item_type_error');
  inputError.textContent = '';
};

const isValid = (form, input) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__item_element_text'));
  const submitButton = form.querySelector('.popup__submit');
  toggleButtonState(inputList, submitButton);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input);
      toggleButtonState(inputList, submitButton);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
}

const toggleButtonState = (inputList, submitButton) => {
  if (hasInvalidInput(inputList)) {
    submitButton.disabled = true;
    submitButton.classList.add('popup__submit_status_disabled');
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove('popup__submit_status_disabled');
  }
}

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((form) => {
    setEventListeners(form);
  })
}