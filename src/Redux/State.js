import profileReducer from "./profile-reducer";
import dilogsReduser from "./dialogs-reducer";

let store = {
    _callSubscriber() {

    },
    _state: {
        profilePage: {
            sharedData: [
                {homeLink: 'sergio', id: 1, name: 'Sergio', avatar: <img src='https://yt3.ggpht.com/a/AATXAJxetozsFIxpK6XvnUDpCVKIYn7hxLiM2DVFWixqPA=s900-c-k-c0xffffffff-no-rj-mo' />},
                {homeLink: 'alex', id: 2, name: 'Alex', avatar: <img src='https://avatars.yandex.net/get-music-user-playlist/51766/595160370.1000.25677/m1000x1000?1589812186474&webp=false' />},
                {homeLink: 'nasty', id: 3, name: 'Nasty', avatar: <img src='https://4.bp.blogspot.com/-aau51YHhLqI/UDFgnKjncGI/AAAAAAAAAH8/8WKFByNzopI/s1600/INFINITO+DESPRECIO.png' />},
                {homeLink: 'mike', id: 4, name: 'Mike', avatar: <img src='https://ezhbaev.ru/faces/img/large/surprised-rage-clean-l.png' />},
                {homeLink: 'svetachka', id: 5, name: 'Svetachka', avatar: <img src='https://forum.exbo.ru/assets/files/2019-11-10/1573417254-129155-14d.png' />},
                {homeLink: 'losha', id: 6, name: 'Losha', avatar: <img src='https://i03.fotocdn.net/s102/9d0b74786a63f5d0/user_l/222810920.jpg' />},
            ],
            postsData: [
                {id: 1, message: 'Привет, классные мемы', likes: 3},
                {id: 2, message: 'Твои мемы дают силы жить!', likes: 69}
            ],
            newTextPost: ''
        },
        dialogsPage: {
            sharedData: [
                {homeLink: 'sergio', id: 1, name: 'Sergio', avatar: <img src='https://yt3.ggpht.com/a/AATXAJxetozsFIxpK6XvnUDpCVKIYn7hxLiM2DVFWixqPA=s900-c-k-c0xffffffff-no-rj-mo' />},
                {homeLink: 'alex', id: 2, name: 'Alex', avatar: <img src='https://avatars.yandex.net/get-music-user-playlist/51766/595160370.1000.25677/m1000x1000?1589812186474&webp=false' />},
                {homeLink: 'nasty', id: 3, name: 'Nasty', avatar: <img src='https://4.bp.blogspot.com/-aau51YHhLqI/UDFgnKjncGI/AAAAAAAAAH8/8WKFByNzopI/s1600/INFINITO+DESPRECIO.png' />},
                {homeLink: 'mike', id: 4, name: 'Mike', avatar: <img src='https://ezhbaev.ru/faces/img/large/surprised-rage-clean-l.png' />},
                {homeLink: 'svetachka', id: 5, name: 'Svetachka', avatar: <img src='https://forum.exbo.ru/assets/files/2019-11-10/1573417254-129155-14d.png' />},
                {homeLink: 'losha', id: 6, name: 'Losha', avatar: <img src='https://i03.fotocdn.net/s102/9d0b74786a63f5d0/user_l/222810920.jpg' />},
            ],
            messageData: [
                {id: 1, textMessage: 'Hi'},
                {id: 2, textMessage: 'KEK'},
                {id: 3, textMessage: 'LOL'},
            ],
            newMessageText: '',
        },
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dilogsReduser(this._state.dialogsPage, action)

        this._callSubscriber(this._state)
    }
}

export default store