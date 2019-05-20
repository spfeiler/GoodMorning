const initialState = {
    isAuthenticated: false,
    uid:0,
    first_name: ''
  }

  const reducer = (state = initialState, action) => {

    switch(action.type) {
      case 'ON_AUTHENTICATED':
        return {
          ...state, // spread operator
          isAuthenticated: action.token != null ? true : false,
          uid: action.id,
          first_name: action.first_name
        }
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false
        }

    }

    return state
  }

  export default reducer
