import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { LoggedInStatus } from '../contexts/LoggedInStatus';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteConfirmPopup from './DeleteConfirmPopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

function App() {

  let history = useHistory()

  // Переменные состояния, отвечающие за видимость попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)

  // Переменная состояния для выбраной карточки
  const [selectedCard, setSelectedCard] = useState({})

  // Переменная состояния для данных пользователя
  const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '' })

  //переменная состояния статуса авторизации
  const [loggedIn, setLoggedIn] = useState(false)

  // переменная состояния для карточек
  const [cards, setCards] = useState([])

  //переменная состояния для удаляемой карточки
  const [cardToDelete, setCardToDelete] = useState({})

  // переменная состояния, отвечающая за текст кнопок в формах
  const [isLoading, setIsLoading] = useState(false)

  // переменная состояния для отображения email в кабинете
  const [email, setEmail] = useState('')

  // переменная состояния для статуса ответа при попытке регистрации (управляет содержанием попапа)
  const [infoTooltipType, setInfoTooltipType] = useState(false)

  // переменная состояния для текста попапа
  const [infoTooltipText, setInfoTooltipText] = useState('')

  //Переменная состояния бургера меню в моб.вебе
  const [menuIsOpened, setMenuIsOpened] = useState(false)

  // Обработчики событий для открытия попапов (при клике на кнопку)
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  // Обработчик добавления новой карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleDeleteClick(card) {
    setIsDeleteConfirmPopupOpen(true)
    setCardToDelete(card)
  }

  // Обработчик закрытия всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsDeleteConfirmPopupOpen(false)
    // сбрасываем выбранные карточки
    setSelectedCard({})
    setCardToDelete({})
  }

  //Обработчик закрытия попапа упешной регистрации
  function closeInfoTooltip() {
    // закрываем попап
    setIsInfoTooltipOpen(false)
    if (infoTooltipType) { // проверяем, получилось ли зарегистироваться
      // перенаправляем пользователя со страницы регистрации на страницу входа
      history.push("/signin")
    }
  }

  // Колбек для открытия карточки в фулскрин
  function handleCardClick(card) {
    setSelectedCard(card)
  }

  // Обработчик для обновления информации профиля
  function handleUpdateUser({ name, about }) {
    setIsLoading(true)
    api.updateProfileInfo({ name: name, about: about })
      .then((res) => {
        setCurrentUser(res.data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err) // выведем ошибку в консоль
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // Обработчик для обновления аватара
  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true)
    api.updateAvatar({ avatarLink: avatar })
      .then((res) => {
        setCurrentUser(res.data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err) // выведем ошибку в консоль
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // обработчик нажатия лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus({ cardID: card._id, isLiked: isLiked })
      .then(
        (newCard) => {
          setCards(
            // создаем копию массива, заменив в нем измененную карточку
            cards.map(
              (cardElement) => cardElement._id === card._id ? newCard.data : cardElement
            )
          )
        })
      .catch((err) => {
        console.log(err) // выведем ошибку в консоль
      })
  }

  // обработчик удаления карточки
  function handleCardDelete(cardToDelete) {
    setIsLoading(true)
    api.deleteCardFromServer({ cardID: cardToDelete._id })
      .then(() => {
        setCards(
          // создаем копию массива, исключив из него удалённую карточку
          (state) => state.filter((item) => item._id !== cardToDelete._id)
        )
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err) // выведем ошибку в консоль
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // обработчик добавления карточки
  function handleAddPlaceSubmit(cardInfo) {
    setIsLoading(true)
    api.addNewCard(cardInfo)
      .then((res) => {
        // обновляем стейт cards с помощью расширенной копии текущего массива
        setCards([res.data, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err) // выведем ошибку в консоль
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  //обработчик регистрации пользователя
  function handleRegister(credentials) {
    auth.register(credentials)
      .then(() => {
        setInfoTooltipType(true)
        setInfoTooltipText('Вы успешно зарегистрировались!')
        setIsInfoTooltipOpen(true)
      })
      .catch(() => {
        setInfoTooltipType(false)
        setInfoTooltipText(`Что-то пошло не так!
        Попробуйте ещё раз.`)
        setIsInfoTooltipOpen(true)
      })
  }

  // Обработчик нажатия кнопки авторизации
  function handleAuthorize(credentials) {
    auth.authorize(credentials)
      .then((res) => {
        if (res.token) { //проверяем, есть ли в ответе токен. Еслии да, значит успешно авторизовались
          // добавляем токен в локальное хранилище
          localStorage.setItem('token', res.token)
          setEmail(credentials.email)
          setLoggedIn(true)
          history.push("/")
        }
      })
      .catch((err) => {
        setInfoTooltipType(false)
        setInfoTooltipText(`Что-то пошло не так!
        Попробуйте ещё раз.`)
        setIsInfoTooltipOpen(true)
      })
  }

  // Обработчик нажатия кнопки выхода из профиля
  function handleLogout() {
    // Проверяем, залогинен ли пользователь. Важно, т.к. кнопка общая для всех экранов, а каждый раз ходить в LokalStorage вхолостую не нужно
    if (!loggedIn) {
      return
    } else {
      // Удаляем токен из хранилища
      localStorage.removeItem('token')
      // Разлогиниваем
      setLoggedIn(false)
      //Убираем меню с email
      setMenuIsOpened(false)
    }

  }

  function handleClickMenu() {
    setMenuIsOpened(!menuIsOpened)
  }

  // эффект, вызываемый при монтировании компонента

  useEffect(() => {
    if (!loggedIn) { // Если не авторизован, то не заправшиваем
      return
    } else {
      //  запрос в API за пользовательскими данными
      api.getProfileInfo()
        .then((res) => {
          // После получения ответа задаем полученные данные в соответствующие переменные состояния
          setCurrentUser(res.data)
        })
        .catch((err) => {
          console.log(err) // выведем ошибку в консоль
        })

      // запрашиваем начальные карточки
      api.getInitialCards()
        .then((res) => {
          // передаем карточки в переменную состояни
          setCards(res.data.reverse())
        })
        .catch((err) => {
          console.log(err) // выведем ошибку в консоль
        })
    }
  }, [loggedIn]) // Если авторизовался, вызвается эффект

  useEffect(() => {
  }, [])

  // обработчик закрытия попапов по нажатию Escape
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  //Автоматичекий лог-ин в новой сессии
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) { // Проверяем наличие токена
      auth.tokenVerification(token) //Верифицируем токен на сервере 
        .then((res) => {
          // Берем почту из ответа в переменную состояния
          setEmail(res.data.email)
          setLoggedIn(true)
          history.push("/")
        })
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedInStatus.Provider value={loggedIn}>
        <div className="App">
          <Header onClickLogout={handleLogout} onClickMenu={handleClickMenu} email={email} menuIsOpened={menuIsOpened} />
          <Switch>
            <Route exact path="/signup">
              <Register onSubmit={handleRegister} />
            </Route>
            <Route exact path="/signin">
              <Login onSubmit={handleAuthorize} />
            </Route>
            <ProtectedRoute
              exact path="/"
            >
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClickCallback={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteClick}
              />
              <Footer />
            </ProtectedRoute>

            {/* В остальных случаях редиректим в зависимости от статуса лог-ина */}
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>

          {/* <Footer /> */}
          {/* Добавляю компонент попапов с children кодом внутри. Общая разметка, отличия приходят в компонент через children */}

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading} />
          <DeleteConfirmPopup
            isOpen={isDeleteConfirmPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            cardToDelete={cardToDelete}
            isLoading={isLoading} />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />
          {/* Попап успешной (или нет) регистрации */}
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeInfoTooltip}
            infoTooltipType={infoTooltipType}
            infoTooltipText={infoTooltipText} />
        </div>
      </LoggedInStatus.Provider>
    </CurrentUserContext.Provider>
  )
}

export default App