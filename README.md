![EdaDaromBanner](https://i.imgur.com/btuVjar.png)

## Introduction
**Еда даром** - это приложение, позволяющее людям делиться друг с другом излишками еды.  
Работает на платформе VK mini Apps, что позволяет использовать его из основного приложения социальной сети ВКонтакте без необходимости скачивать на устройство.

## Demo
Демонстрационное приложение: https://vk.com/app7515285_53369046

<p align="center">
  <img width="auto" height="380" src="https://i.imgur.com/DYG1MFM.png">
</p>


## Built with

- [Django](https://www.djangoproject.com/) - свободный фреймворк для веб-приложений на языке Python
- [DRF](https://www.django-rest-framework.org/) -  библиотека, которая работает со стандартными моделями Django для создания гибкого и мощного API 
- [React](https://github.com/facebook/react) - JavaScript-библиотека для создания пользовательских интерфейсов
- [Redux](https://redux.js.org/) - менеджер состояний, часто используемым с React.
- [VKUI](https://vkcom.github.io/vkui-styleguide/) - это набор React-компонентов, с помощью которых можно создавать интерфейсы

## Installation
- Open a command line window and go to the project's directory.
- `pip install -r requirements.txt`
- `python manage.py makemigrations`
- `python manage.py migrate`
- `python manage.py runserver`
- Open another command line window.
- `cd frontend && npm install`
- `npm start`
- Open and another command line window.
- `vk-tunnel --insecure=1 --http-protocol=https --ws-protocol=wss --host=localhost --port=10888`
- Optional: `ngrok http 8000` or use vk-tunnel instead, change your ip address in `utils/axios.js`


## Todo
- [X] Авторизация
- [ ] Создание нового объявления
- [ ] Объявления возле тебя
- [ ] много..

[@CreativeBoys](https://vk.com/app7515285_53369046 "@CreativeBoys")
