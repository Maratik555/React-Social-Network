const ADD = 'ADD'

let initialState = {
  friends: [
            {id: 1, name: 'Dima'},
            {id: 2, name: 'Sveta'},
            {id: 3, name: 'Sasha'},
            {id: 4, name: 'Mixa'},
            {id: 5, name: 'Marat'}
        ]
}

const friendsReducer = (state=initialState,action) => {
        switch (action.type) {
          case ADD:
            let body = action.add
            return {
              ...state,
              friends: [...state.friends, {id:6,name:body}]
            }

            default: return state
        }
}

export const actionFriends = () => ({
  type : 'ADD',
  add : 'Rich'
})


export default friendsReducer