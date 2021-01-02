let initialState = {
    chatId: "",
    userId: "",
    chatnumber: "",
    title: "",
    date: "",
    tags: [],
    description: "",
    buttons: [],
    messages: [],
    adminChats: [],
    userChats: [],
    userCollection: [],
    chatEditmode: false,
}


function chats(state = initialState, action) {
  switch (action.type) {
    case 'GET_CHAT':
      return {...state,
              chatId: action.payload._id,
              userId: action.payload.userId,
              user: action.payload.user,
              chatnumber: action.payload.chatnumber,
              title: action.payload.title,
              date: action.payload.date,
              tags: action.payload.tags,
              description: action.payload.description,
              buttons: action.payload.buttons,
              messages: action.payload.messages,
              chatEditmode: true
            }
    case 'GET_ADMIN_CHATS':
      return {...state, adminChats: action.payload}
    case 'GET_USER_CHATS':
      return {...state, userChats: action.payload}
    case 'GET_SELECTED_CHATS':
            let collection = []
            action.payload.map((chat) => {
              if(chat.userId === action.userId) {
                collection.push(chat)
              } return collection
            })
      return {...state, userCollection: collection}
    case 'CLEAR_DISPLAY':
      return {...state,
              chatId: "",
              userId: "",
              user: "",
              chatnumber: "",
              title: "",
              date: "",
              tags: [],
              description: "",
              buttons: [],
              messages: [], 
              chatEditmode: false }
    case "DELETE_USER_CHAT":
      return {...state, userChats: state.userChats.filter(chat => chat._id !== action.id)}
    case "DELETE_ADMIN_CHAT":
      return {...state, adminChats: state.adminChats.filter(chat => chat._id !== action.id)}
    default:
     return state
  }
}

export default chats
