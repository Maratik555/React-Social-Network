import {follow} from './users-reducer'
import {usersAPI} from '../API/api'

jest.mock('../API/users-api')
const userAPIMock = usersAPI


// userAPIMock.follow.mockReturnValue()

test('', () => {
    const thunk = follow(1)
    const dispatchMock = jest.fn()

    // @ts-ignore
    thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)

})