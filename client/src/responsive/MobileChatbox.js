import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Container from 'react-bootstrap/Container'
import History from '../main/history/History'
import Chat from '../main/chat/Chat'
import Userchats from '../main/history/Userchats'
import Publish from '../main/publish/Publish'
import DraftList from '../main/publish/DraftList'
import ChatList from '../main/publish/ChatList'
import Name from '../main/drafts/Name'
import SaveDraft from '../main/drafts/SaveDraft'
import Drafts from '../main/drafts/Drafts'
import Authorization from '../authorization/Authorization'
import About from '../main/About/About'
import { getUser, setKey } from '../redux/actions/user'
import MobileStart from './MobileStart'
// CSS in App.css/FlexMain

// mobile version
class MobileChatbox extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
        loggedIn: false,
        currentuser: ''
    }  
}


currentUser = firebase.auth().onAuthStateChanged((user) => {
if (user) {
  this.setState({loggedIn: true, currentuser: user.displayName})
  this.props.getUser(user.displayName)
} else {
  this.setState({loggedIn: false})
}
})

handleSelect = (key) => {
  this.props.setKey(key)
} 

  render() {
    return (
      <Container id="responsive-container"  >

        <Tabs  id="uncontrolled" style={{borderBottom: 0}} activeKey={this.props.user.key} onSelect={this.handleSelect}>
        <Tab eventKey="start" title="Menu">
            <MobileStart />
          </Tab>
          {this.props.user.key === "chat"?
          <Tab eventKey="chat" title="Chat">
            <Chat />
          </Tab>
           : null }
          {(this.props.user.key === "publish") && this.state.loggedIn?
            <Tab eventKey="publish" title="Publish">
                <Publish />
                <DraftList />
                <ChatList />
            </Tab>
          : null}
          {(this.props.user.key === "publish") && !this.state.loggedIn?
            <Tab eventKey="publish" title="Publish">
              <p className="mobile-notlogged">- you must be logged in to see the content -</p>
            </Tab> 
          : null}
          {(this.props.user.key === "drafts") && this.state.loggedIn?
            <Tab eventKey="drafts" title="Drafts">
                <Name />
                <SaveDraft />
                <Drafts />
            </Tab>
          : null}
          {(this.props.user.key === "drafts") && !this.state.loggedIn?
            <Tab eventKey="drafts" title="Drafts">
              <p className="mobile-notlogged">- you must be logged in to see the content -</p>
            </Tab> 
          : null}
          {this.props.user.key === "history"?
          <Tab eventKey="history" title="History">
              <History/>
          </Tab>
          : null}
          {this.props.user.key === "userchats"?
          <Tab eventKey="userchats" title="Userchats">
              <Userchats />
          </Tab>
          : null }
          {this.props.user.key === "login"?   
          this.state.loggedIn?
            <Tab eventKey="login" title="Profile">
                <Authorization />
            </Tab>
          :  
             <Tab eventKey="login" title="Login">
                 <Authorization />
            </Tab>
          : null}
          {this.props.user.key === "about"?
          <Tab eventKey="about" title="About">
              <About />
          </Tab>
          : null}
        </Tabs>
      </Container>
    )
  }
}

// ---------------------- Redux ---------------------------------------

let mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

let mapDispatchToProps = {
  getUser: getUser,
  setKey: setKey
}

let MobileChatboxConnected = connect(mapStateToProps, mapDispatchToProps)(MobileChatbox)

export default MobileChatboxConnected

/* Menu für mobile Version - eventuell für später

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

<DropdownButton id="dropdown" title="Menu">
  <Dropdown.Item onClick={()=>this.handleSelect("history")}>History</Dropdown.Item>
  <Dropdown.Item onClick={()=>this.handleSelect("userchats")}>Userchats</Dropdown.Item>
  <Dropdown.Item onClick={()=>this.handleSelect("chat")}>Chat</Dropdown.Item>
  {this.state.loggedIn? <Dropdown.Item onClick={()=>this.handleSelect("drafts")}>Drafts</Dropdown.Item> : null}
  {this.state.loggedIn? <Dropdown.Item onClick={()=>this.handleSelect("publish")}>Publish</Dropdown.Item> : null}
  <Dropdown.Item onClick={()=>this.handleSelect("login")}>{loggedin}</Dropdown.Item>
  <Dropdown.Item onClick={()=>this.handleSelect("about")}>About</Dropdown.Item>
</DropdownButton>

*/
