import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Привет, как дела?', like: 10},
                {id: 2, message: 'Marat online', like: 15},
                {id: 3, message: 'Marat offline', like: 25},
                {id: 4, message: 'Marattt online', like: 35},
                {id: 5, message: 'Maratik online', like: 5}
            ],
            newPostText: 'Marat555'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dima'},
                {id: 2, name: 'Sveta'},
                {id: 3, name: 'Sasha'},
                {id: 4, name: 'Andrey'},
                {id: 5, name: 'Victor'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'Hello'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'Hi'},
                {id: 5, message: 'Bye'}
            ],
        },
    },
    sidebar: {
        friends: [
            {id: 1, name: 'Dima'},
            {id: 2, name: 'Sveta'},
            {id: 3, name: 'Sasha'},
        ]
    },
    _callSubscriber() {
        console.log('Marat55555')
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer // наблюдатель за объектом( паттерн )
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state)
    }
}

export default store
window.store = store
