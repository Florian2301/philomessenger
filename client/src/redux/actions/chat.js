import axios from 'axios'

// save as chat (admin)
export const saveChat = (userId, user, chatnumber, title, date, tags, description, buttons, messages) => dispatch => {
  axios
    .post('/api/chats', {userId, user, chatnumber, title, date, tags, description, buttons, messages})
    .then(res => dispatch({
      type: 'GET_CHAT', payload: res.data
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// get all chats of admin
export const getAllChats = () => dispatch => {
  axios
    .get('/api/chats/')
    .then(res => dispatch({
      type: 'GET_ADMIN_CHATS', payload: res.data
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// get one chat by chatnumber (admin)
export const getChat = (chatnumber) => dispatch => {
  axios
    .get('/api/chats/', {params: {chatnumber: chatnumber}})
    .then(res => dispatch({
      type: 'GET_CHAT', payload: res.data
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// get one chat by id (admin)
export const getChatById = (chatId) => dispatch => {
  axios
    .get('/api/chats/', {params: {chatId: chatId}})
    .then(res => dispatch({
      type: 'GET_CHAT', payload: res.data[0] //wird ein Array mit Objekt wiedergegeben, daher Angabe Index, um nur das Objekt zu erhalten
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// update chat details (admin)
export const updateChatDetails = (id, chatnumber, title, date, tags, description) => dispatch => {
  axios
    .patch(`/api/chats/${id}`, {chatnumber, title, date, tags, description})
    .then(res =>
      dispatch({
        type: 'GET_CHAT', payload: res.data
      }))
    .catch(function (error) {
      console.log(error.message);
    })
}

// update one message (admin)
export const updateChat = (id, messagenumber, text) => dispatch => {
  axios
    .put(`/api/chats/${id}`, {messagenumber, text})
    .then(res =>
      dispatch({
        type: 'GET_CHAT', payload: res.data
      }))
    .catch(function (error) {
      console.log(error.message);
    })
}

// delete one chat by id (admin)
export const deleteChat = (chatId) => dispatch => {
  axios
    .delete(`/api/chats/${chatId}`)
    .then(res =>
      dispatch({
        type: 'DELETE_ADMIN_CHAT', chatId
      }))
    .catch(function (error) {
      console.log(error);
    })
}


// --------------- Userchats ----------------------------------------

// save chat (user)
export const saveUserChat = (userId, user, chatnumber, title, date, tags, description, buttons, messages) => dispatch => {
  axios
    .post('/api/userchats', {userId, user, chatnumber, title, date, tags, description, buttons, messages})
    .then(res => dispatch({
      type: 'GET_CHAT', payload: res.data
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// get all chats of users (Userchat)
export const getAllUserChats = () => dispatch => {
  axios
    .get('/api/userchats/')
    .then(res => dispatch({
      type: 'GET_USER_CHATS', payload: res.data
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// get all chats by userid (Publish - chatlist)
export const getAllUserChatsById = (userId) => dispatch => {
  axios
    .get('/api/userchats/')
    .then(res => dispatch({
      type: 'GET_SELECTED_CHATS', payload: res.data, userId
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// show one chat of user by chatnumber (Userchats)
export const getOneUserChat = (chatnumber, userId) => dispatch => {
  axios
    .get('/api/userchats/', {params: {chatnumber: chatnumber, userId: userId}})
    .then(res => dispatch({
      type: 'GET_CHAT', payload: res.data
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// show one chat of user by id (Publish - chatlist)
export const getOneUserChatById = (chatId) => dispatch => {
  axios
    .get('/api/userchats/', {params: {chatId: chatId}})
    .then(res => dispatch({
      type: 'GET_CHAT', payload: res.data[0] //wird ein Array mit Objekt wiedergegeben, daher Angabe Index, um nur das Objekt zu erhalten
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// update details of chat (user)
export const updateUserChat = (id, chatnumber, title, date, tags, description) => dispatch => {
  axios
    .patch(`/api/userchats/${id}`, {chatnumber, title, date, tags, description})
    .then(res =>
      dispatch({ type: 'GET_CHAT', payload: res.data 
    }))
    .catch(function (error) {
      console.log(error.message);
    })
}

// update one message of chat (user)
export const updateUserMessage = (id, messagenumber, text) => dispatch => {
  axios
    .put(`/api/userchats/${id}`, {messagenumber, text})
    .then(res =>
      dispatch({
        type: 'GET_CHAT', payload: res.data
      }))
    .catch(function (error) {
      console.log(error.message);
    })
}

// delete one chat by id (user)
export const deleteUserChat = (chatId) => dispatch => {
  axios
    .delete(`/api/userchats/${chatId}`)
    .then(res =>
      dispatch({
        type: 'DELETE_USER_CHAT', chatId
      }))
    .catch(function (error) {
      console.log(error);
    })
}
