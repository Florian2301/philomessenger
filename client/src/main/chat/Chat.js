import React, { Component } from 'react'
import Textarea from '../../elements/Textarea'
import Button from '../../elements/Button'
import Message from './Message'
import { connect } from 'react-redux'
import { updateDraft } from '../../redux/actions/draft'
import { clearDisplay, setKey } from '../../redux/actions/user'
import './Chat.css'
import { v4 as uuidv4 } from 'uuid'
import { Container, ListGroup } from 'react-bootstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const KEY_ENTER = 13
const KEY_ESC = 27

class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      number: 0,
      textarea: false
    }
  }

  writeMessage = (event) => {
    let name = event.target.id
    this.setState({
      textarea: true,                                               // textarea = true => textarea displays
      placeholder: 'Nachricht von ' + name,
      name: name,
      writer: name + ' schreibt...',
    })
  }

  inputChange = (event) => {
    this.setState({ value: event.target.value })
  }
  
  textareaKeyEvent = (event) => {
    if (event.keyCode === KEY_ENTER) {
      this.sendMessage(this.state.value, this.state.name)
    } else if (event.keyCode === KEY_ESC) {
      this.setState({ textarea: false, value: '', writer: '' })
    }
  }
  
  sendMessage = (message, name) => {
    this.setState({ textarea: false, writer: '' })
    if (!message) {                                                 // return if no message
      return
    } else {
      let number = this.props.draft.messages.length                 // check length for messagenumber
      number++                                    
      this.setState({
        number                                                      // new messagenumber for new message
      })
      let storeName = this.props.draft.philosopher                  // get names of draft
      let indexOfName
      storeName.map((phil) => {
        if (phil.name === name) {                                   // get name of button
          indexOfName = storeName.indexOf(phil)                     // find index of name (for color of message)
        }
        return indexOfName
      }) 
      let storeMessName = this.props.draft.messages                 
      storeMessName.push({                                          // push new message to saved messages
        messagenumber: number,
        name,
        text: message,
        color: indexOfName
      })
      this.saveMessageAndPhil()
    }
  }

  // save new messages and philosophers to draft
  saveMessageAndPhil = () => {
    const admin = this.props.user.admin
    const draftId = this.props.draft.draftId
    const title = this.props.draft.title
    const date = this.props.draft.date
    const tags = this.props.draft.tags
    const description = this.props.draft.description
    const philosopher = this.props.draft.philosopher
    const messages = this.props.draft.messages
    this.props.updateDraft(draftId, title, date, tags, description, philosopher, messages, admin) 
  }

  clear = () => {
    this.props.clearDisplay()
  }

  history = () => {
    this.props.setKey("history")
  }

  userchats = () => {
    this.props.setKey("userchats")
  }

  //---------- RENDER ----------------------------------------

  render() {
    // get data for display saved draft
    let messages = this.props.draft.messages 
    let chatId = this.props.draft.draftId
    let philosopher = this.props.draft.philosopher
    let chatnumber = ""
    let userId = this.props.draft.userId
    
    // get data for display saved chat
    if (this.props.chat.chatEditmode) {
      messages = this.props.chat.messages
      chatId = this.props.chat.chatId
      chatnumber = this.props.chat.chatnumber
      userId = this.props.chat.userId
      philosopher = []
    }

    return (
      <div>
        <div id="chat-border-color">
        <Container className="chatbox" id="chatbox">
          {!this.props.user.loggedIn?
            <ListGroup className="chatmessages">
              <TransitionGroup>
              {messages.map(({_id, color, name, messagenumber, text}) => {
                return (
                <CSSTransition key={uuidv4()} timeout={1} classNames="transition-message">
                  <ListGroup.Item className="listgroup-message">
                  <Message
                    color={'color-' + color}
                    key={uuidv4()}
                    number={messagenumber}
                    name={name}
                    text={text}
                    chatid={chatId}
                    chatnumber={chatnumber}
                    messageId={_id}
                    userid={userId}
                  />
                  </ListGroup.Item>
                </CSSTransition>
              )})
              }
               </TransitionGroup>
            </ListGroup>
          :
          <ul className="chatmessages">
            {messages.map(({_id, color, name, messagenumber, text}) => {
              return (
                <Message
                  edit={'color-' + color + '-edit'}
                  key={uuidv4()}
                  number={messagenumber}
                  name={name}
                  text={text}
                  chatid={chatId}
                  chatnumber={chatnumber}
                  messageId={_id}
                  userid={userId}
                />)})
            }
          </ul>
          }
          {this.state.textarea?
            <Textarea
            writer={this.state.writer}
            placeholder={this.state.placeholder}
            value={this.state.value}
            onChange={this.inputChange}
            onKeyDown={this.textareaKeyEvent}
            autofocus
            />
           : null }
        </Container>
        </div>
        
        <section className="flexContainer-chat">
          {this.props.chat.chatEditmode && window.innerWidth <= 767?
            <div id="link-back">
              <div>
                <p id="link-back-chat" onClick={this.history}>history</p>
              </div>

              <div>
                <p id="link-back-chat" onClick={this.userchats}>userchats</p>
              </div>
            </div>
          :
          <div className="addPhil">
            {philosopher.map((phil) => {
              return (
                <Button
                  className="button-chat-Phil"
                  key={uuidv4()}
                  id={phil.id}
                  label={phil.name}
                  phil={phil.name}
                  handleClick={this.writeMessage}
                />
              )
            })}
          </div>
          }

          <div>
            <p id="link-clear" onClick={this.clear}>clear</p>
          </div>
         
        </section>
      </div>
    )
  }
}

// ------------- REDUX ---------------------------------------

let mapStateToProps = (state) => {
  return {
    chat: state.chat,
    draft: state.draft,
    user: state.user
  }
}

let mapDispatchToProps = {
  clearDisplay: clearDisplay,
  updateDraft: updateDraft,
  setKey: setKey
}

let ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat)

export default ChatContainer
