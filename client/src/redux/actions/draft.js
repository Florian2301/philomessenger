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
export const saveDraft = (userId, user, title, date, tags, description, philosopher, messages, admin) => dispatch => {
  if(admin) {
    axios
      .post('/api/drafts/', {userId, user, title, date, tags, description, philosopher, messages})
      .then(res => dispatch({
        type: 'GET_DRAFT', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  } else {
    axios
      .post('/api/userdrafts/', {userId, user, title, date, tags, description, philosopher, messages})
      .then(res => dispatch({
        type: 'GET_DRAFT', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  }
}

// get all drafts by userid
export const getDrafts = (id, admin) => dispatch => {
  if(admin) {
  axios
    .get('/api/drafts/')
    .then(res => dispatch({
      type: 'GET_ADMIN_DRAFTS', payload: res.data
    }))
    .catch(function (error) {
      console.log(error);
    })
  } else {
    axios
      .get('/api/userdrafts/')
      .then(res => dispatch({
        type: 'GET_USER_DRAFTS', payload: res.data, userId: id
      }))
      .catch(function (error) {
        console.log(error);
      })
  }
}


// get one draft
export const getOneDraft = (id, admin) => dispatch => {
  if(admin) {
    axios
      .get(`/api/drafts/${id}`, {params: {id: id}})
      .then(res => dispatch({
        type: 'GET_DRAFT', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  } else {
    axios
      .get(`/api/userdrafts/${id}`, {params: {_id: id}})
      .then(res => dispatch({
        type: 'GET_DRAFT', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  }
}

// publish draft as chat
export const prepareUploadDraft = (id, admin) => dispatch => {
  if(admin) {
    axios
      .get(`/api/drafts/${id}`, {params: {id: id}})
      .then(res => dispatch({
        type: 'GET_CHAT', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  } else {
    axios
      .get(`/api/userdrafts/${id}`, {params: {id: id}})
      .then(res => dispatch({
        type: 'GET_CHAT', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  }
}

// delete one draft by id
export const deleteDraft = (id, admin) => dispatch => {
  if(admin) {
    axios
      .delete(`/api/drafts/${id}`)
      .then(res =>
        dispatch({
          type: 'DELETE_ADMIN_DRAFT', id
        }))
      .catch(function (error) {
        console.log(error);
      })
  } else {
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
}

// delete one message by id
export const deleteDraftMessage = (id, messages, admin) => dispatch => {
  if(admin) {
    axios
      .put(`/api/drafts/${id}`, {messages: messages})
      .then(res =>
        dispatch({
          type: 'GET_DRAFT', payload: res.data
        }))
      .catch(function (error) {
        console.log(error);
      })
  } else {
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
}

// update one message
export const editDraft = (draftId, messagenumber, text, admin) => dispatch => {
  if(admin) {
    axios
      .put(`/api/drafts/${draftId}`, {messagenumber: messagenumber, text: text})
      .then(res =>
        dispatch({
          type: 'GET_DRAFT', payload: res.data
        }))
      .catch(function (error) {
        console.log(error.message);
      })
  } else {
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
}

// update details of one draft
export const updateDraft = (id, title, date, tags, description, philosopher, messages, admin) => dispatch => {
  if(admin) {
    axios
      .patch(`/api/drafts/${id}`, {title: title, date: date, tags: tags, description: description, philosopher: philosopher, messages: messages})
      .then(res =>
        dispatch({
          type: 'GET_DRAFT', payload: res.data
        }))
      .catch(function (error) {
        console.log(error.message);
      })
  } else {
    axios
      .patch(`/api/userdrafts/${id}`, {title: title, date: date, tags: tags, description: description, philosopher: philosopher, messages: messages})
      .then(res =>
        dispatch({
          type: 'GET_DRAFT', payload: res.data
        }))
      .catch(function (error) {
        console.log(error.message);
      })
  }
}
