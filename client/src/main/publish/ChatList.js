import React, { useState } from 'react'
import { connect } from 'react-redux'
import './ChatList.css'
import Button from '../../elements/Button'
import Panel from '../../elements/Panel'
import { v4 as uuidv4 } from 'uuid'
import { Spinner } from 'react-bootstrap'
import { getAllChats, getAllUserChatsById, getChatById, deleteChat } from '../../redux/actions/chat'
import { saveDraft, getDrafts } from '../../redux/actions/draft'
import { getAllTitle, getAllUserTitleById, getTitle, deleteTitle } from '../../redux/actions/title'
import {  clearDisplay } from '../../redux/actions/user'



export function Chats (props) {
    const [draft, setDraft] = useState("")
    const [spinner, setSpinner] = useState(false)
    
    function getAllChats() {
      setSpinner(true)
      const admin = props.user.admin
      const id = props.user.userId
      admin? props.getAllChats(admin) : props.getAllUserChatsById(id)  // get all title and all chat for updating or saving as draft
      admin? props.getAllTitle(admin) : props.getAllUserTitleById(id)
      setTimeout(() => {
        setSpinner(false)
      }, 500)           
    }

    function getOneChat(id, chatnumber) {
      let titleId = ""
      const admin = props.user.admin
      props.getChatById(id, admin)                // get one chat
      if(admin) {                                 // get one title
        props.title.adminTitle.map((title) => {   // adminTitle has own state
          if(title.chatnumber === chatnumber) {
              titleId = title._id
          } return titleId
        })
        props.getTitle(titleId, admin)
      } else {
        props.title.userCollection.map((title) => { // usertitle has onw state
          if(title.chatnumber === chatnumber) {
            titleId = title._id
          } return titleId
        })
        props.getTitle(titleId, admin)
      }
      props.clearDisplay()
      setDraft(id)  // if chat is clicked, a link for saving as draft displays
      setSpinner(true)  
      setTimeout(() => {
        setSpinner(false)
      }, 500)                                              
    }

    // save chat as draft for further editing
    function saveAsDraft() {  
      setSpinner(true)                                        
      const admin = props.user.admin
      const userId = props.user.userId
      const user = props.user.username
      const title = props.chat.title
      const date = props.chat.date
      const tags = props.chat.tags
      const description = props.chat.description
      const philosopher = props.chat.philosopher
      const messages = props.chat.messages
      props.saveDraft(userId, user, title, date, tags, description, philosopher, messages, admin) 
      setTimeout(() => {
        props.getDrafts(userId, admin)
        setSpinner(false)
      }, 500)      
    }

    // delete one title + chat
    function deleteChat(id, userId, chatnumber) {
      const admin = props.user.admin
      let titleId = ""
      props.deleteChat(id, admin)
      if (admin) {              
          props.title.adminTitle.map((title) => {   // adminTitle has own state
            if(title.chatnumber === chatnumber) {
                titleId = title._id
            } return titleId
          })
          props.deleteTitle(titleId, admin)
          setTimeout(() => {
            props.getAllChats(admin)
          }, 500)
      } else {
        props.title.userCollection.map((title) => { // usertitle has onw state
          if(title.chatnumber === chatnumber) {
            titleId = title._id
          } return titleId
        })
        props.deleteTitle(titleId, admin)
        setTimeout(() => {
          props.getAllUserChatsById(userId)
        }, 500)
      }
    }


// -------------------- return --------------------------------------------------

    return (
      <Panel title="Your published chats" id="panel-drafts">
        <section className="flexContainer-chatlist-publish">
        <Button
              button="true"
              className="publish-chat"
              id="draft"
              label="Show chats"
              handleClick={getAllChats}
        ></Button>
        <div id="spinner-chatlist">
          {!spinner? null : <Spinner animation="border" role="status" ></Spinner>}
        </div>
        </section>
        <div className="publish-table-chats" >
            {!props.user.admin? props.chat.userCollection.map(({_id, userId, title, chatnumber}) => {
              return (
                <div key={uuidv4()} className="publish-data-rows-chats">
                  <div className="publish-chats-column-1" onClick={() => getOneChat(_id, chatnumber)}>{chatnumber + " " + title}</div>
                  <div className="publish-chats-column-2" onClick={() => saveAsDraft(_id)}>{draft === _id? "Save as draft" : null}</div> 
                  <div className="publish-chats-column-3" onClick={() => deleteChat(_id, userId, chatnumber)}>delete</div>    
                </div>
              )})
              :
              props.chat.adminChats.map(({_id, userId, title, chatnumber}) => {
                return (
                  <div key={uuidv4()} className="publish-data-rows-chats">
                    <div className="publish-chats-column-1" onClick={() => getOneChat(_id, chatnumber)}>{chatnumber + " " + title}</div>
                    <div className="publish-chats-column-2" onClick={() => saveAsDraft(_id)}>{draft === _id? "Save as draft" : null}</div>
                    <div className="publish-chats-column-3" onClick={() => deleteChat(_id, userId, chatnumber)}>delete</div>    
                  </div>
                )})
              }
        </div>
    </Panel>       
    )
    
}

//------------------------- redux -------------------------------------------

let mapStateToProps = (state) => {
    return {
      draft: state.draft,
      user: state.user,
      chat: state.chat,
      title: state.title
    }
  }
  
  let mapDispatchToProps = {
    clearDisplay: clearDisplay,
    getAllChats: getAllChats,
    getChatById: getChatById,
    getAllUserChatsById: getAllUserChatsById,
    deleteChat: deleteChat,
    saveDraft: saveDraft,
    getDrafts: getDrafts,
    getAllTitle: getAllTitle,
    getAllUserTitleById: getAllUserTitleById,
    getTitle: getTitle,
    deleteTitle: deleteTitle,
  }
  
  let ChatList = connect(mapStateToProps, mapDispatchToProps)(Chats)
  
  export default ChatList
