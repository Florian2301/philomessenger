let initialState = {
  titleId: "",
  userId: "",
  chatnumber: "",
  title: "",
  date: "",
  tags: [],
  description: "",
  adminTitle: [],
  userTitle: [],
  userCollection: []
}

function title(state = initialState, action) {
  switch (action.type) {
    case "GET_TITLE":
      return {...state,
              titleId: action.payload._id,
              userId: action.payload.userId,
              chatnumber: action.payload.chatnumber,
              title: action.payload.title,
              date: action.payload.date,
              tags: action.payload.tags,
              description: action.payload.description}
    case "GET_ADMIN_TITLE":
        return {...state, adminTitle: action.payload}
    case "GET_USER_TITLE":
      return {...state, userTitle: action.payload}
    case 'GET_SELECTED_TITLE':
      let collection = []
      action.payload.map((title) => {
        if(title.userId === action.userId) {
          collection.push(title)
        } return collection
      })
      return {...state, userCollection: collection}
    case "CLEAR_DISPLAY":
      return {...state,
              titleId: "",
              userId: "",
              chatnumber: "",
              title: "",
              date: "",
              tags: [],
              description: ""}
    case "DELETE_USER_CHAT":
      return {...state, userTitle: state.userTitle.filter(title => title._id !== action.id)}
    case "DELETE_ADMIN_CHAT":
      return {...state, adminTitle: state.adminTitle.filter(title => title._id !== action.id)}
    default:
     return state
  }
}

export default title
