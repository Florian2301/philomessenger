import axios from 'axios'

// clears chat window
export function clearDisplay() {
  return {type: "CLEAR_DISPLAY"}
}

// changes state for welcome message
export function welcome() {
  return { type: 'WELCOME'}
}

// changes state for update message
export function cancel() {
  return { type: 'CANCEL'}
}

// sets back user.state at logout
export function logout() {
  return { type: 'LOGOUT'}
}

// changes eventkey for mobile navigation
export function setKey(key) {
  return { type: 'SET_KEY', key}
}

// add user to database
export const addUserToDB = (userName, userEmail) => dispatch => {
  axios
    .post('/api/users', {userName, userEmail})
    .then(res => dispatch({
      type: 'ADD_USER', payload: res.data
    }))
    .catch(function (error) {
      console.log(error)
    })
  }

// get 1 user by username or all users
export const getUser = (username) => dispatch => {
  if(username) {
  axios
    .get('/api/users/', {params: {username: username}})
    .then(res => dispatch({
      type: 'GET_USER', payload: res.data[0]
    })) 
    .catch(function (error) {
      console.log(error);
    })
  } else {
    axios
    .get('/api/users/')
    .then(res => dispatch({
      type: 'GET_ALL_USERS', payload: res.data
    })) 
    .catch(function (error) {
      console.log(error);
    })
  }
}

// update Profile
export const updateUserDB = (id, username, userId, email, chats) => dispatch => {
  axios
    .patch(`/api/users/${id}`, {username, userId, email, chats})
    .then(res => 
      dispatch({ type: 'UPDATE_USER' })
    )
    .catch(function (error) {
      console.log(error.message);
    })
}

// update User Modus (Desktop, Tablet, Mobile)
export const updateUserModus = (id, modus) => dispatch => {
  axios
    .patch(`/api/users/${id}`, {modus})
    .then(res => 
      dispatch({ type: 'UPDATE_USER' })
    )
    .catch(function (error) {
      console.log(error.message);
    })
}

// delete one user
export const deleteUserDB = (id) => dispatch => {
  axios
    .delete(`/api/users/${id}`)
    .then(res =>
      dispatch({
        type: 'DELETE_USER'
      })
    )
    .catch(function (error) {
      console.log(error);
    })
}
