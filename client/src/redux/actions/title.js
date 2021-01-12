import axios from 'axios'

// publish title with chatnumber, title and date
export const saveTitle = (userId, user, chatnumber, title, date, tags, description, admin) => dispatch => {
  if(admin) {
    axios
      .post('/api/title', {userId, user, chatnumber, title, date, tags, description})
      .then(res => dispatch({
        type: 'GET_TITLE', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  } else {
    axios
      .post('/api/usertitle', {userId, user, chatnumber, title, date, tags, description})
      .then(res => dispatch({
        type: 'GET_TITLE', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  }
}
  
// get all titles
export const getAllTitle = (admin) => dispatch => {
  if(admin) {
    axios
      .get('/api/title')
      .then(res => dispatch({
        type: 'GET_ADMIN_TITLE', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  } else {
    axios
      .get('/api/usertitle')
      .then(res => dispatch({
        type: 'GET_USER_TITLE', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  }
}


// get one title by id
export const getTitle = (id, admin) => dispatch => {
  if (admin) {
    axios
      .get(`/api/title/${id}`, {params: {_id: id}})
      .then(res => dispatch({
        type: 'GET_TITLE', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  } else {
    axios
      .get(`/api/usertitle/${id}`, {params: {_id: id}})
      .then(res => dispatch({
        type: 'GET_TITLE', payload: res.data
      }))
      .catch(function (error) {
        console.log(error);
      })
  }
}


// get all usertitles by userid (for publish-component)
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


// delete one title by id
export const deleteTitle = (id, admin) => dispatch => {
  if (admin) {
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
  } else {
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
}

// update date of one title by id/chatnumber
export const updateTitle = (id, chatnumber, title, date, tags, description, admin) => dispatch => {
  if (admin) {
    axios
      .patch(`/api/title/${id}`, {chatnumber, title, date, tags, description})
      .then(res =>
        dispatch({ type: 'GET_TITLE', payload: res.data })
      )
      .catch(function (error) {
        console.log(error.message);
      })
  } else {
    axios
      .patch(`/api/usertitle/${id}`, {chatnumber, title, date, tags, description})
      .then(res =>
        dispatch({ type: 'GET_TITLE', payload: res.data 
      }))
      .catch(function (error) {
        console.log(error.message);
      })
  }
}

