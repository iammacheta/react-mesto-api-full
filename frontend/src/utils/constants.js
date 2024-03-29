const data = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
}

// Находим поля формы профиля
const nameInput = document.querySelector('.form__input_type_name')
const jobInput = document.querySelector('.form__input_type_job')

// Находим кнопку рекдактировать профиль
const editButton = document.querySelector('.profile__edit-button')
// Находим кнопку добавить карточку
const addButton = document.querySelector('.profile__add-button')
// Находим модальное окно PROFILE
const popupElementProfile = document.querySelector('.popup_type_edit-profile')
// Находим модальное окно CARD
const popupElementCard = document.querySelector('.popup_type_add-card')
// Находим аватарку
const avatarElement = document.querySelector('.profile__image')
const popupElementAvatar = document.querySelector('.popup_type_update-avatar')

const BASE_URL = 'https://mesto.back.ichetovkin.nomoredomains.club'

export { data, nameInput, jobInput, editButton, addButton, popupElementProfile, popupElementCard, popupElementAvatar, avatarElement, BASE_URL } 