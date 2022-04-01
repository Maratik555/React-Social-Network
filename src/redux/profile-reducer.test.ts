import profileReducer, {addPostAction, deletePost, Nullable} from './profile-reducer'
import {ProfileType} from '../API/api'

let state = {
    posts: [],
    profile: null as Nullable<ProfileType>,
    status: ''
}


it('length of posts be', () => {
    let action = addPostAction('Maratik_555')
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(5)
    expect(newState.posts[4].message).toBe('Maratik_555')
})

it('length of messages should', () => {
    let action = deletePost(100)
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(4)
})