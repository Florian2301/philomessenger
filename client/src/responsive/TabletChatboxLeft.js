import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Container from 'react-bootstrap/Container'
import History from '../main/history/History'
import Userchats from '../main/history/Userchats'
import Publish from '../main/publish/Publish'
import DraftList from '../main/publish/DraftList'
import ChatList from '../main/publish/ChatList'
import Name from '../main/drafts/Name'
import SaveDraft from '../main/drafts/SaveDraft'
import Drafts from '../main/drafts/Drafts'
import { getUser } from '../redux/actions/user'
// CSS in App.css/FlexMain

/**
 * new Component for screens like tablets
 * -> new component for styling
 */
class TabletChatboxRight extends Component {
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
        <Tabs defaultActiveKey={"history"} id="uncontrolled" style={{borderBottom: 0}}>
          <Tab eventKey="history" title="History">
              <History/>
          </Tab>
          <Tab eventKey="userchats" title="Userchats">
              <Userchats />
          </Tab>
          {this.state.loggedIn?
            <Tab eventKey="drafts" title="Drafts">
               <Name />
               <SaveDraft />
               <Drafts />
            </Tab>
          : null}
          {this.state.loggedIn?
            <Tab eventKey="publish" title="Publish">
                <Publish />
                <DraftList />
                <ChatList />
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
    users: state.User
  }
}

let mapDispatchToProps = {
  getUser: getUser,
}

let TabletChatboxR = connect(mapStateToProps, mapDispatchToProps)(TabletChatboxRight)

export default TabletChatboxR