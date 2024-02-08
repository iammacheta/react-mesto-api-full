# Фронтенд для проекта "Личная фотогалерея"

## Описание проекта

"Личная фотогалерея" - это интерактивный веб-сервис с авторизацией и регистрацией пользователя, подключенный к серверу. Сервис позволяет пользователям добавлять карточки с фотографиями, удалять ранее созданные карточки и ставить лайки. 
Проект был создан в образовательных целях для освоения передовых технологий веб-разработки, включая React, адаптивную верстку, работу с JavaScript, модульность, объектно-ориентированное программирование и взаимодействие с сервером.

## Функциональность

- Фото-галерея c загрузкой с сервера
- Редактирование информации профиля
- Замена аватара пользователя
- Добавление новых карточек через форму
- Удаление собственных карточек
- Просмотр карточек в полноэкранном режиме
- Возможность ставить и убирать лайки карточкам;
- Лайв-валидация форм на клиенте с использованием JS

## Технологии: 
`React`, `HTML5`, `CSS3`, `JavaScript (ES6+)`, `Form Validation`, `Fetch API`, `async/await`, `JSON`, `Webpack`, `Babel`, `NPM`, `Git`, `HTTPS/SSL`, `JWT`, `БЭМ`, `ООП`

**Фронтенд**

`React:` Построение пользовательского интерфейса с использованием компонентного подхода, управление `состоянием` приложения, использование `хуков` для логики компонентов, маршрутизация с помощью `React Router` для организации навигации.

`HTML5`: Структура веб-страницы, использование семантических тегов для обеспечения доступности и SEO-оптимизации.

`CSS3`: Адаптивная и кроссбраузерная верстка с использованием медиазапросов, стилизация элементов, включая `Flexbox` и `Grid` для создания адаптивных макетов, анимации и переходы для улучшения визуального взаимодействия.

`JavaScript (ES6+)`: Динамическое взаимодействие на стороне клиента, использование современных возможностей языка для обработки событий, асинхронных операций и манипуляций с DOM.

**Валидация**

`HTML5 Form Validation`: Использование встроенных средств HTML5 для валидации форм на стороне клиента, улучшение пользовательского опыта.

`JavaScript`: Дополнительная клиентская валидация, включая асинхронную проверку данных и кастомные правила валидации.

**Взаимодействие с сервером**

`Fetch`: Отправка асинхронных HTTP-запросов к серверу для работы с `REST API`, обработка ответов и ошибок.

`async/await`: Упрощение работы с асинхронным кодом, повышение читаемости и удобства отладки.

`JSON`: Работа с форматом передачи данных, сериализация и десериализация.

**Сборка и разработка**

`Webpack`: Настройка процесса сборки, включая минификацию, объединение и транспиляцию кода.

`Babel`: Транспиляция JavaScript-кода для обеспечения совместимости с более старыми браузерами.

`NPM`: Управление зависимостями проекта, автоматизация задач разработки и сборки.

`Git`: Отслеживание изменений в коде, ветвление и слияние, работа с удаленными репозиториями.

`HTTPS/SSL`: Использование защищенного соединения для обмена данными между клиентом и сервером.

`JWT`: Авторизация с помощью JWT

`БЭМ`: Организация CSS-кода и файловой структуры проекта для повышения читаемости и упрощения масштабирования кода.

`ООП`: Применение классов для организации кода, повышения его модульности и переиспользования.

## Результаты и выводы

Выполнение проекта позволило мне освоить полный цикл разработки интерактивных веб-приложений, начиная от верстки и заканчивая работой с сервером и сборкой проекта. 

## Установка и запуск
1. Клонировать репозиторий: 
```bash
git clone https://github.com/iammacheta/react-mesto-auth.git
```
2. Установить зависимости: `npm install`
3. Запустить проект в режиме разработки командой: `npm run dev`. Для сборки проекта используйте: `npm run build`.