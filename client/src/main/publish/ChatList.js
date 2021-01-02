import React, { useState } from 'react'
import { connect } from 'react-redux'
import './ChatList.css'
import Button from '../../elements/Button'
import Panel from '../../elements/Panel'
import { v4 as uuidv4 } from 'uuid';
import { getAllChats, getAllUserChats, getAllUserChatsById, getChatById, getOneUserChat, getOneUserChatById, deleteChat, deleteUserChat } from '../../redux/actions/chat'
import { saveDraft, saveUserDraft } from '../../redux/actions/draft'
import { getAllTitle, getAllUserTitleById, deleteTitle, deleteUserTitle } from '../../redux/actions/title'
import { clearDisplay } from '../../redux/actions/user'



export function Chats (props) {
    const [draft, setDraft] = useState("")
    
    function getAllChats() {
      const admin = props.user.admin
      const id = props.user.userId
      admin? props.getAllChats() : props.getAllUserChatsById(id)  // get all title and all chat for updating or saving as draft
      admin? props.getAllTitle() : props.getAllUserTitleById(id)
    }

    function getOneChat(id) {
        props.clearDisplay()
        const admin = props.user.admin
        admin? props.getChatById(id) : props.getOneUserChatById(id) // get one chat
        setDraft(id)  // if chat is clicked, a link for saving as draft displays                                                
    }

    // save chat as draft for further editing
    function saveAsDraft() {                                          
      const admin = props.user.admin
      const userId = props.user.userId
      const user = props.user.username
      const title = props.chat.title
      const date = props.chat.date
      const tags = props.chat.tags
      const description = props.chat.description
      const buttons = props.chat.buttons
      const messages = props.chat.messages
      admin? props.saveDraft(userId, user, title, date, tags, description, buttons, messages) 
        : props.saveUserDraft(userId, user, title, date, tags, description, buttons, messages)
    }

    // delete one title + chat
    function deleteChat(id, userId, chatnumber) {
      const admin = props.user.admin
      let titleId = ""
      if (admin) {
          props.deleteChat(id)
          props.title.adminTitle.map((title) => {
            if(title.chatnumber === chatnumber) {
                titleId = title._id
            } return titleId
          })
          props.deleteTitle(titleId)
          setTimeout(() => {
            props.getAllChats()
          }, 500)
      } else {
        props.deleteUserChat(id)
        props.title.userCollection.map((title) => {
          if(title.chatnumber === chatnumber) {
            titleId = title._id
          } return titleId
        })
        props.deleteUserTitle(titleId)
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
              label="Get chats"
              handleClick={getAllChats}
          ></Button>
        </section>
        <div className="publish-table-chats" >
            {!props.user.admin? props.chat.userCollection.map(({_id, title, chatnumber}) => {
              return (
                <div key={uuidv4()} className="publish-data-rows-chats">
                  <div className="publish-chats-column-1" onClick={() => getOneChat(_id)}>{chatnumber + " " + title}</div>
                  <div className="publish-chats-column-2" onClick={() => saveAsDraft(_id)}>{draft === _id? "Save as draft" : null}</div> 
                  <div className="publish-chats-column-3" onClick={deleteUserChat(_id, chatnumber)}>delete</div>    
                </div>
              )})
              :
              props.chat.adminChats.map(({_id, title, chatnumber}) => {
                return (
                  <div key={uuidv4()} className="publish-data-rows-chats">
                    <div className="publish-chats-column-1" onClick={() => getOneChat(_id)}>{chatnumber + " " + title}</div>
                    <div className="publish-chats-column-2" onClick={() => saveAsDraft(_id)}>{draft === _id? "Save as draft" : null}</div>
                    <div className="publish-chats-column-3" onClick={() => deleteChat(_id, chatnumber)}>delete</div>    
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
    getAllUserChats: getAllUserChats,
    getChatById: getChatById,
    getOneUserChat: getOneUserChat,
    deleteChat: deleteChat,
    deleteUserChat: deleteUserChat,
    saveDraft: saveDraft,
    saveUserDraft: saveUserDraft,
    getAllTitle: getAllTitle,
    deleteTitle: deleteTitle,
    getAllUserTitleById: getAllUserTitleById,
    deleteUserTitle: deleteUserTitle,
    getAllUserChatsById: getAllUserChatsById,
    getOneUserChatById: getOneUserChatById,
  }
  
  let ChatList = connect(mapStateToProps, mapDispatchToProps)(Chats)
  
  export default ChatList
