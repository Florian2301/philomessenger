let initialState = {
  draftId: "",
  userId: "",
  user: "",
  title: "",
  date: "",
  tags: [],
  description: "",
  buttons: [],
  messages: [],
  adminDrafts: [],
  userDrafts: [],
  draftEditmode: false,
}

function drafts(state = initialState, action) {
  switch (action.type) {
    case "START_CHAT": 
      return {...state, buttons: action.names}
    case "REMOVE_NAME":
      return {...state, buttons: state.buttons.filter(button => button.name !== action.name.name)}
    case "GET_DRAFT":
      return {...state,
              draftId: action.payload._id,
              userId: action.payload.userId,
              user: action.payload.user,
              title: action.payload.title,
              date: action.payload.date,
              tags: action.payload.tags,
              description: action.payload.description, 
              buttons: action.payload.buttons, 
              messages: action.payload.messages,
              draftEditmode: true
            }
    case "GET_USER_DRAFTS":
            let drafts = []
            action.payload.map((draft) => {
              if(draft.userId === action.userId) {
                  drafts.push(draft)
              }
              return drafts
            })
      return {...state, userDrafts: drafts}
    case "GET_ADMIN_DRAFTS":
      return {...state, adminDrafts: action.payload}
    case "CLEAR_DISPLAY":
        return {...state, 
                draftId: "",
                userId: "",
                user: "",
                title: "",
                date: "",
                tags: [],
                description: "",
                buttons: [],
                messages: [],
                draftEditmode: false}
    case "DELETE_USER_DRAFT":
        return {...state, userDrafts: state.userDrafts.filter(draft => draft._id !== action.id)}
    case "DELETE_ADMIN_DRAFT":
      return {...state, adminDrafts: state.adminDrafts.filter(draft => draft._id !== action.id)}
    default:
     return state
  }
}

export default drafts
