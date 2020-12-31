import axios from 'axios'

export function startChat(names) {
  return {type: "START_CHAT", names}
}

export function removeName(name) {
  return {type: "REMOVE_NAME", name}
}

export function addMessages(messages) {
  return { type: 'ADD_Messages', messages }
}

// save draft
export const saveDraft = (userId, user, title, date, tags, description, buttons, messages) => dispatch => {
    axios
      .post('/api/drafts/', {userId, user, title, date, tags, description, buttons, messages})
      .then(res => dispatch({
        type: 'GET_DRAFT', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  }

// get all drafts of admin
export const getDrafts = () => dispatch => {
  axios
    .get('/api/drafts/')
    .then(res => dispatch({
      type: 'GET_ADMIN_DRAFTS', payload: res.data
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// get one draft of admin
export const getOneDraft = (id) => dispatch => {
  axios
    .get(`/api/drafts/${id}`, {params: {id: id}})
    .then(res => dispatch({
      type: 'GET_DRAFT', payload: res.data
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// publish draft as chat (admin)
export const publishAdminDraft = (id) => dispatch => {
  axios
    .get(`/api/drafts/${id}`, {params: {id: id}})
    .then(res => dispatch({
      type: 'GET_CHAT', payload: res.data
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// delete one draft by id (admin)
export const deleteDraft = (id) => dispatch => {
  axios
    .delete(`/api/drafts/${id}`)
    .then(res =>
      dispatch({
        type: 'DELETE_ADMIN_DRAFT', id
      }))
    .catch(function (error) {
      console.log(error);
    })
}

// delete one message by id (admin)
export const deleteDraftMessage = (id, messages) => dispatch => {
  axios
    .put(`/api/drafts/${id}`, {messages: messages})
    .then(res =>
      dispatch({
        type: 'GET_DRAFT', payload: res.data
      }))
    .catch(function (error) {
      console.log(error);
    })
}

// update one message of admin
export const editDraft = (draftId, messagenumber, text) => dispatch => {
  axios
    .put(`/api/drafts/${draftId}`, {messagenumber: messagenumber, text: text})
    .then(res =>
      dispatch({
        type: 'GET_DRAFT', payload: res.data
      }))
    .catch(function (error) {
      console.log(error.message);
    })
}

// update details of one draft (admin)
export const updateDraft = (id, title, date, tags, description, buttons, messages) => dispatch => {
  axios
    .patch(`/api/drafts/${id}`, {title: title, date: date, tags: tags, description: description, buttons: buttons, messages: messages})
    .then(res =>
      dispatch({
        type: 'GET_DRAFT', payload: res.data
      }))
    .catch(function (error) {
      console.log(error.message);
    })
}
  
  
// --------- UserDrafts ----------------------------------------------------

// save draft (user)
export const saveUserDraft = (userId, user, title, date, tags, description, buttons, messages) => dispatch => {
  axios
    .post('/api/userdrafts/', {userId, user, title, date, tags, description, buttons, messages})
    .then(res => dispatch({
      type: 'GET_DRAFT', payload: res.data
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// get all drafts by userid (user)
export const getUserDrafts = (id) => dispatch => {
  axios
    .get('/api/userdrafts/')
    .then(res => dispatch({
      type: 'GET_USER_DRAFTS', payload: res.data, userId: id
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// get one draft by id (user)
export const getOneUserDraft = (id) => dispatch => {
  axios
    .get(`/api/userdrafts/${id}`, {params: {_id: id}})
    .then(res => dispatch({
      type: 'GET_DRAFT', payload: res.data
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// prepare draft for upload as chat (user)
export const publishUserDraft = (id) => dispatch => {
  axios
    .get(`/api/userdrafts/${id}`, {params: {id: id}})
    .then(res => dispatch({
      type: 'GET_CHAT', payload: res.data
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// delete one draft (user)
export const deleteUserDraft = (id) => dispatch => {
  axios
    .delete(`/api/userdrafts/${id}`)
    .then(res =>
      dispatch({
        type: 'DELETE_USER_DRAFT', id
      }))
    .catch(function (error) {
      console.log(error);
    })
}

// delete one message by id (user)
export const deleteUserDraftMessage = (id, messages) => dispatch => {
  axios
    .put(`/api/userdrafts/${id}`, {messages: messages})
    .then(res =>
      dispatch({
        type: 'GET_DRAFT', payload: res.data
      }))
    .catch(function (error) {
      console.log(error);
    })
}

// update message of draft (user)
export const editUserDraft = (draftId, messagenumber, text) => dispatch => {
  axios
    .put(`/api/userdrafts/${draftId}`, {messagenumber: messagenumber, text})
    .then(res =>
      dispatch({
        type: 'GET_DRAFT', payload: res.data
      }))
    .catch(function (error) {
      console.log(error.message);
    })
}

// update details of draft (user)
export const updateUserDraft = (id, title, date, tags, description, buttons, messages) => dispatch => {
  axios
    .patch(`/api/userdrafts/${id}`, {title: title, date: date, tags: tags, description: description, buttons: buttons, messages: messages})
    .then(res =>
      dispatch({
        type: 'GET_DRAFT', payload: res.data
      }))
    .catch(function (error) {
      console.log(error.message);
    })
}