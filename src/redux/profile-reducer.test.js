import profileReducer, {addPostAction, deletePost} from "./profile-reducer";

let state = {
  posts: [
    {id: 1, message: 'Привет, как дела?', like: 10},
    {id: 2, message: 'Marat online', like: 15},
    {id: 3, message: 'Marat offline', like: 25},
    {id: 4, message: 'Marattt online', like: 35}
  ]}


it('length of posts be', () => {
    let action = addPostAction('Maratik_555')
    let newState = profileReducer(state,action)

    expect(newState.posts.length).toBe(5)
    expect(newState.posts[4].message).toBe('Maratik_555')
})

it('length of messages should', () => {
    let action = deletePost(100)
    let newState = profileReducer(state,action)

    expect(newState.posts.length).toBe(4)
})