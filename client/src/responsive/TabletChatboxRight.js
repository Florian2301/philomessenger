import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Container from 'react-bootstrap/Container'
import Chat from '../main/chat/Chat'
import { getUser } from '../redux/actions/user'
import Authorization from '../authorization/Authorization'
import About from '../main/About/About'
import TabletStart from './TabletStart'
// CSS in App.css/FlexMain

/**
 * new Component for screens like tablets
 * -> new component for styling
 */
class TabletChatboxLeft extends Component {
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


  render() {
    return (
      <Container fluid id="responsive-container">
        <Tabs defaultActiveKey={"start"} id="uncontrolled" style={{borderBottom: 0}}>
            <Tab eventKey="start" title="Start">
              <TabletStart />
            </Tab>
            <Tab eventKey="chat" title="Chat">
              <Chat />
            </Tab>
            {this.state.loggedIn?
            <Tab eventKey="login" title="Profile">
                <Authorization />
            </Tab>
          :  
            <Tab eventKey="login" title="Login">
                 <Authorization />
            </Tab>
          }
            <Tab eventKey="about" title="About">
              <About />
          </Tab>
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
  getUser: getUser
}

let TabletChatboxL = connect(mapStateToProps, mapDispatchToProps)(TabletChatboxLeft)

export default TabletChatboxL