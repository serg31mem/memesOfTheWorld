import profileReducer, {addPost, deletePost} from "./profile-reducer";

let state = {
    profileData: [
        {
            homeLink: 'sergio',
            id: 1,
            name: 'Sergio',
            avatar: <img
                src='https://yt3.ggpht.com/a/AATXAJxetozsFIxpK6XvnUDpCVKIYn7hxLiM2DVFWixqPA=s900-c-k-c0xffffffff-no-rj-mo'/>,
            status: 'Life coll',
            country: 'Russia',
            city: 'Samara'
        },
        {
            homeLink: 'alex',
            id: 2,
            name: 'Alex',
            avatar: <img
                src='https://avatars.yandex.net/get-music-user-playlist/51766/595160370.1000.25677/m1000x1000?1589812186474&webp=false'/>,
            status: '3D coll',
            country: 'Russia',
            city: 'Samara'
        },
        {
            homeLink: 'nasty',
            id: 3,
            name: 'Nasty',
            avatar: <img
                src='https://4.bp.blogspot.com/-aau51YHhLqI/UDFgnKjncGI/AAAAAAAAAH8/8WKFByNzopI/s1600/INFINITO+DESPRECIO.png'/>,
            status: 'Psychology coll',
            country: 'Russia',
            city: 'Samara'
        },
        {
            homeLink: 'mike',
            id: 4,
            name: 'Mike',
            avatar: <img src='https://ezhbaev.ru/faces/img/large/surprised-rage-clean-l.png'/>,
            status: 'Money coll',
            country: 'Russia',
            city: 'Samara'
        },
        {
            homeLink: 'svetachka',
            id: 5,
            name: 'Svetachka',
            avatar: <img src='https://forum.exbo.ru/assets/files/2019-11-10/1573417254-129155-14d.png'/>,
            status: 'Pussies coll',
            country: 'Russia',
            city: 'Samara'
        },
        {
            homeLink: 'losha',
            id: 6,
            name: 'Losha',
            avatar: <img src='https://i03.fotocdn.net/s102/9d0b74786a63f5d0/user_l/222810920.jpg'/>,
            status: 'Drugs coll',
            country: 'Russia',
            city: 'Samara'
        },
    ],
    postsData: [
        {id: 1, message: 'Привет, классные мемы', likes: 3},
        {id: 2, message: 'Твои мемы дают силы жить!', likes: 69}
    ]
}

test('add new post', () => {
    let action = addPost('здарова')
    let newState = profileReducer(state, action)

    expect(newState.postsData.length).toBe(3)
});

test('message of new post should be correct', () => {
    let action = addPost('здарова')
    let newState = profileReducer(state, action)

    expect(newState.postsData[2].message).toBe('здарова')
});

test('after deleting length of message should be decrement', () => {
    let action = deletePost(1)

    let newState = profileReducer(state, action)

    expect(newState.postsData.length).toBe(1)
});

test(`after deleting length shouldn't be decrement if id is incorrect`, () => {
    let action = deletePost(1000)

    let newState = profileReducer(state, action)

    expect(newState.postsData.length).toBe(2)
});