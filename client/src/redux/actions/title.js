import axios from 'axios'

// publish title with chatnumber, title and date (admin)
export const saveTitle = (userId, user, chatnumber, title, date, tags, description) => dispatch => {
    axios
      .post('/api/title', {userId, user, chatnumber, title, date, tags, description})
      .then(res => dispatch({
        type: 'GET_TITLE', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  }
  
// get all titles (admin)
export const getAllTitle = () => dispatch => {
  axios
    .get('/api/title')
    .then(res => dispatch({
      type: 'GET_ADMIN_TITLE', payload: res.data
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// get one title by chatnumber (admin)
export const getTitleByChatnumber = (chatnumber) => dispatch => {
  axios
    .get('/api/title/', {params: {chatnumber: chatnumber}})
    .then(res => dispatch({
      type: 'GET_TITLE', payload: res.data
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// get one title by id (admin)
export const getTitle = (id) => dispatch => {
  axios
    .get(`/api/title/${id}`, {params: {_id: id}})
    .then(res => dispatch({
      type: 'GET_TITLE', payload: res.data
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// delete one title by id (admin)
export const deleteTitle = (id) => dispatch => {
  axios
    .delete(`/api/title/${id}`)
    .then(res =>
      dispatch({
        type: 'DELETE_ADMIN_TITLE', id
      })
    )
    .catch(function (error) {
      console.log(error);
    })
}

// update date of one title by id/chatnumber (admin)
export const updateTitle = (id, chatnumber, title, date, tags, description) => dispatch => {
  axios
    .patch(`/api/title/${id}`, {chatnumber, title, date, tags, description})
    .then(res =>
      dispatch({ type: 'GET_TITLE', payload: res.data })
    )
    .catch(function (error) {
      console.log(error.message);
    })
}

// --------------------------- UserTitle ---------------------------------------------------

// publish title with chatnumber, title and date (user)
export const saveUserTitle = (userId, user, chatnumber, title, date, tags, description) => dispatch => {
  axios
    .post('/api/usertitle', {userId, user, chatnumber, title, date, tags, description})
    .then(res => dispatch({
      type: 'GET_TITLE', payload: res.data
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// get all titles (user)
export const getAllUserTitle = () => dispatch => {
  axios
    .get('/api/usertitle')
    .then(res => dispatch({
      type: 'GET_USER_TITLE', payload: res.data
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// get all titles by userid (user)
export const getAllUserTitleById = (userId) => dispatch => {
  axios
    .get('/api/usertitle')
    .then(res => dispatch({
      type: 'GET_SELECTED_TITLE', payload: res.data, userId
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// get one title by chatnumber (user)
export const getUserTitleByChatnumber = (chatnumber, userId) => dispatch => {
  axios
    .get('/api/usertitle/', {params: {chatnumber: chatnumber}})
    .then(res => dispatch({
      type: 'GET_TITLE', payload: res.data, userId
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// get one title (user)
export const getUserTitle = (id) => dispatch => {
  axios
    .get(`/api/usertitle/${id}`, {params: {_id: id}})
    .then(res => dispatch({
      type: 'GET_TITLE', payload: res.data
    }))
    .catch(function (error) {
      console.log(error);
    })
}

// delete one title by id (user)
export const deleteUserTitle = (id) => dispatch => {
  axios
    .delete(`/api/usertitle/${id}`)
    .then(res =>
      dispatch({
        type: 'DELETE_USER_TITLE', id
      }))
    .catch(function (error) {
      console.log(error);
    })
}

// update date of one title by id/chatnumber (user)
export const updateUserTitle = (id, chatnumber, title, date, tags, description) => dispatch => {
  axios
    .patch(`/api/usertitle/${id}`, {chatnumber, title, date, tags, description})
    .then(res =>
      dispatch({ type: 'GET_TITLE', payload: res.data 
    }))
    .catch(function (error) {
      console.log(error.message);
    })
}
