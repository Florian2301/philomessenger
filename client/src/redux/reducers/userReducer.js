let initialState = {
    userId: [],  
    username: [],
    authId: [],
    modus: [], 
    email: [],
    date: [],
    allUsers: [],
    admin: false,
    loggedIn: false,
    welcome:false,
    signUp: false,
    update: false,
    delete: false,
    
}


function users(state = initialState, action) {
    switch (action.type) {
      case "ADD_USER":
        return {...state, username: action.payload.username, email: action.payload.email, signUp: true}
      case "GET_USER":
        return {...state, 
                userId: action.payload._id, 
                username: action.payload.username,
                authId: action.payload.authId,
                modus: action.payload.modus, 
                email: action.payload.email, 
                admin: action.payload.admin,
                date: action.payload.date,
                allUsers: action.payload,
                loggedIn: true,
                signUp: false}
      case "GET_ALL_USERS":
          return {...state, allUsers: action.payload}
      case "WELCOME": 
          return {...state, welcome: true}
      case "UPDATE_USER":
          return {...state, update: true, welcome: false}
      case "CANCEL":
          return {...state, update: false, welcome: false}
      case "LOGOUT":
          return {...state,
                    userId: [],  
                    username: [],
                    authId: [],
                    modus: [], 
                    email: [],
                    date: [],
                    allUsers: [],
                    admin: false,
                    loggedIn: false,
                    welcome:false,
                    signUp: false,
                    update: false,
                    delete: false,
                    }
      case "SET_KEY": 
          return {...state, key: action.key}
      case "DELETE_USER":
          return {...initialState, delete: true}
      default:
       return state
    }
  }
  
  export default users
