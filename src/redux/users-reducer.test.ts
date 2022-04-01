import usersReducer, {action, InitialState} from './users-reducer'

let state: InitialState

beforeEach(() => {
    state = {
        users: [{
            id: 0, name: 'John', followed: false,
            photos: {small:null,large:null}, status: 'status 0'
        },
            {
                id: 1, name: 'John1', followed: false,
                photos: {small:null,large:null}, status: 'status 1'
            },    {
                id: 2, name: 'John2', followed: true,
                photos: {small:null,large:null}, status: 'status 2'
            },    {
                id: 3, name: 'John3', followed: true,
                photos: {small:null,large:null}, status: 'status 3'
            }],
        totalItemCount: 0,
        currentPage: 1,
        isFetching: false,
        following: [],
        filter: {
            term: '',
            friend: null
        }
    }
})




test('followSuccess', () => {

   const newState = usersReducer(state,action.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unFollowSuccess', () => {

   const newState = usersReducer(state,action.unfollowSuccess(3))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})