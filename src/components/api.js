export const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
    headers: {
        authorization: '068cde59-a939-4ad7-be0e-b19326e011a5',
        'Content-Type': 'application/json'
    }
};

const getAnswer = (result) => {
    if (result.ok) {
        return result.json();
    }
    return Promise.reject(`Ошибка: ${result.status}`);
};

export const getUserData = () => {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        headers: apiConfig.headers
    })
        .then((res) => getAnswer(res))
        .catch((err) => console.log(err));
};

export const getCards = () => {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        headers: apiConfig.headers
    })
        .then((res) => getAnswer(res))
        .catch((err) => console.log(err));
};

export function setUserInfo(name, about) {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name,
            about
        })
    }).then(getAnswer);
}

export function postNewCard(name, link) {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name,
            link
        })
    }).then(getAnswer);
}

export function setUserAvatar(avatarLink) {
    return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            avatar: avatarLink
        })
    }).then(getAnswer);
}

export function deleteCard(idCard) {
    return fetch(`${apiConfig.baseUrl}/cards/${idCard}`, {
        method: 'DELETE',
        headers: apiConfig.headers
    }).then(getAnswer);
}

export function putLikeOnServer(idCard) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${idCard}`, {
        method: 'PUT',
        headers: apiConfig.headers
    }).then(getAnswer);
}

export function deleteLikeFromServer(idCard) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${idCard}`, {
        method: 'DELETE',
        headers: apiConfig.headers
    }).then(getAnswer);
}

export function getAppInfo() {
    return Promise.all([getUserData(), getCards()]);
}