import React, { Component } from 'react'
import './Message.css'
import { connect } from 'react-redux'
import { updateChat, updateUserMessage } from '../../redux/actions/chat'
import { editDraft, editUserDraft, deleteDraftMessage, deleteUserDraftMessage } from '../../redux/actions/draft'


const KEY_ENTER = 13
const KEY_ESC = 27


class Message extends Component {
  constructor(props) {
    super(props)

    this.state = {
      textarea: false,          // display textarea for editing
      editmode: false,          // if user logged in, he can edit messages
      value: this.props.text    // from "chat"-component, loaded either from draft or chat
    }
  }

  toggleEditmode = () => {
    this.setState({ editmode: !this.state.editmode, textarea: !this.state.textarea  })
    if(this.state.editmode) {
      this.change()             // function save changes of message
    }
  }

  inputChange = (event) => {
    this.setState({ value: event.target.value })
  }

  inputKeyEvent = (event) => {
    if (event.keyCode === KEY_ENTER) {
      this.change()
    } else if (event.keyCode === KEY_ESC) {
      this.setState({ textarea: false, editmode: false, value: ""})
    }
  }

  // function save changes of message
  change  = () => {
    const number = this.props.number
    const chatId = this.props.chatid
    const admin = this.props.user.admin
    const userId = this.props.user.userId
    const userIdChat = this.props.chat.userId
    if (this.props.draft.draftEditmode) {         // check if draft
      admin? this.props.editDraft(chatId, number, this.state.value) : this.props.editUserDraft(chatId, number, this.state.value)
    }
    if (this.props.chat.chatEditmode) {           // check if chat
      if (admin) {
          this.props.updateChat(chatId, number, this.state.value) 
      } else {
          if(userId === userIdChat) {             // user can only edit his own chats
            this.props.updateUserMessage(chatId, number, this.state.value)
          }
      }
    }
  }

  deleteMessage = () => {
    const admin = this.props.user.admin
    const chatId = this.props.chatid
    const messageId = this.props.messageId
    let messages = this.props.draft.messages
    let messagesNoId = {}
    let newMessages = []
    let messagenumber = 1
    
    messages.map((message) => {
      if(message._id !== messageId) {                     // find the message to be deleted and filter out
        messagesNoId = {messagenumber: messagenumber++,   // set a new messagenumber to all messages
                        name: message.name,
                        text: message.text,
                        time: message.time,
                        color: message.color,
                        tags: message.tags}
        newMessages.push(messagesNoId)                    // array with all messages except deleted one 
      }
      return newMessages
    })
    admin? this.props.deleteDraftMessage(chatId, newMessages) : this.props.deleteUserDraftMessage(chatId, newMessages)
  }
  

//---------------- RENDER ------------------------------------------

  render() {
    return (
      <div className="message" id={this.props.color} >
        <div className="message-header">
          <p id="message-name">{this.props.name}:</p>
        
          {this.props.user.userId === this.props.userid? <p id="message-edit" onClick={this.toggleEditmode}>{!this.state.editmode ? 'edit' : 'save'}</p> : null}
          {(this.props.user.userId === this.props.userid) && this.props.draft.draftEditmode? <p id="message-edit" onClick={this.deleteMessage}>delete</p> : null}
        
          <p id="message-number"># {this.props.number}</p>
        </div>
        {this.state.textarea ? 
          <div>
            <textarea value={this.state.value} 
                      className="textarea-chat" 
                      onChange={this.inputChange}
                      onKeyDown={this.inputKeyEvent}
                      >
            </textarea>
          </div> 
        : 
          <div>
            <div className="message-text">{this.props.text}</div>
          </div>
        }
      </div>
    )
  }
}

//----------- REDUX ----------------------------------------------------

let mapStateToProps = (state) => {
  return {
    chat: state.chat,
    draft: state.draft,
    user: state.user,
  }
}

let mapDispatchToProps = {
  editDraft: editDraft,
  updateChat: updateChat,
  editUserDraft: editUserDraft,
  updateUserMessage: updateUserMessage,
  deleteDraftMessage: deleteDraftMessage,
  deleteUserDraftMessage: deleteUserDraftMessage
}

let EditContainer = connect(mapStateToProps, mapDispatchToProps)(Message)

export default EditContainer
