import axios from 'axios'

// save as chat
export const saveChat = (userId, user, chatnumber, title, date, tags, description, buttons, messages, admin) => dispatch => {
  if(admin) {
    axios
      .post('/api/chats', {userId, user, chatnumber, title, date, tags, description, buttons, messages})
      .then(res => dispatch({
        type: 'GET_CHAT', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  } else { 
    axios
      .post('/api/userchats', {userId, user, chatnumber, title, date, tags, description, buttons, messages})
      .then(res => dispatch({
        type: 'GET_CHAT', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  }
}

// get all chats
export const getAllChats = (admin) => dispatch => {
  if(admin) {
    axios
      .get('/api/chats/')
      .then(res => dispatch({
        type: 'GET_ADMIN_CHATS', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  } else {
    axios
      .get('/api/userchats/')
      .then(res => dispatch({
        type: 'GET_USER_CHATS', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  }
}


// get all userchats by userid (Publish - chatlist)
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


// show one chat of user by chatnumber
export const getChat = (chatnumber, userId, admin) => dispatch => {
  if (admin) {
    axios
      .get('/api/chats/', {params: {chatnumber: chatnumber}})
      .then(res => dispatch({
        type: 'GET_CHAT', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  } else {
    axios
      .get('/api/userchats/', {params: {chatnumber: chatnumber, userId: userId}})
      .then(res => dispatch({
        type: 'GET_CHAT', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  }
}


// get one chat by id
export const getChatById = (chatId, admin) => dispatch => {
  if(admin) {
    axios
      .get('/api/chats/', {params: {chatId: chatId}})
      .then(res => dispatch({
        type: 'GET_CHAT', payload: res.data[0] //wird ein Array mit Objekt wiedergegeben, daher Angabe Index, um nur das Objekt zu erhalten
      }))
      .catch(function (error) {
        console.log(error);
      })
  } else {
    axios
      .get('/api/userchats/', {params: {chatId: chatId}})
      .then(res => dispatch({
        type: 'GET_CHAT', payload: res.data[0] //wird ein Array mit Objekt wiedergegeben, daher Angabe Index, um nur das Objekt zu erhalten
      }))
      .catch(function (error) {
        console.log(error);
      })
  }
}

// update chat details
export const updateChatDetails = (id, chatnumber, title, date, tags, description, admin) => dispatch => {
  if(admin) {
    axios
      .patch(`/api/chats/${id}`, {chatnumber, title, date, tags, description})
      .then(res =>
        dispatch({
          type: 'GET_CHAT', payload: res.data
        }))
      .catch(function (error) {
        console.log(error.message);
      })
  } else {
    axios
      .patch(`/api/userchats/${id}`, {chatnumber, title, date, tags, description})
      .then(res =>
        dispatch({ type: 'GET_CHAT', payload: res.data 
      }))
      .catch(function (error) {
        console.log(error.message);
      })
  }
}

// update one message
export const updateChat = (id, messagenumber, text, admin) => dispatch => {
  if (admin) {
    axios
      .put(`/api/chats/${id}`, {messagenumber, text})
      .then(res =>
        dispatch({
          type: 'GET_CHAT', payload: res.data
        }))
      .catch(function (error) {
        console.log(error.message);
      })
  } else {
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
}

// delete one chat by id
export const deleteChat = (id, admin) => dispatch => {
  if(admin) {
  axios
    .delete(`/api/chats/${id}`)
    .then(res =>
      dispatch({
        type: 'DELETE_ADMIN_CHAT', id
      }))
    .catch(function (error) {
      console.log(error);
    })
  } else {
    axios
      .delete(`/api/userchats/${id}`, {id: id})
      .then(res =>
        dispatch({
          type: 'DELETE_USER_CHAT', id
        }))
      .catch(function (error) {
        console.log(error);
      })
  }
}
