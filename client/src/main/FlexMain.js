import React, { Component } from 'react'
import './FlexMain.css'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Container from 'react-bootstrap/Container'
import Chat from './chat/Chat'
import History from './history/History'
import Title from './chat/Title'
import Userchats from './history/Userchats'
import Name from './drafts/Name'
import SaveDraft from './drafts/SaveDraft'
import Drafts from './drafts/Drafts'
import Publish from './publish/Publish'
import DraftList from './publish/DraftList'
import ChatList from './publish/ChatList'
import Authorization from '../authorization/Authorization'
import About from './About/About'
import Start from './chat/Start'
import { getUser } from '../redux/actions/user'

class FlexMain extends Component {
        constructor(props) {
          super(props)
        
          this.state = {
              loggedIn: false,
              currentuser: ''
          }  
      }

  // get user-status to display/hide navigation
  currentUser = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if(user.emailVerified) {
          this.setState({loggedIn: true, currentuser: user.displayName})
          this.props.getUser(user.displayName)
        } else {
          this.setState({loggedIn: false})
        }
    } else {
        this.setState({loggedIn: false})
    }
  })


  // -------------- render() -----------------------------------------------
  render() {
    return (
      <section className="flexContainer-main">
        <div className="flexItem-main" id="item-1">
          <Container fluid>
            <Tabs defaultActiveKey="history" id="uncontrolled" style={{borderBottom: 0}}>
              <Tab eventKey="history" title="History">
                 <History />
              </Tab>
              <Tab eventKey="userchats" title="Userchats">
                <Userchats />
              </Tab>
            </Tabs>
          </Container>
        </div>

        <div className="flexItem-main" id="item-2">
         <Title />
         <Chat />
        </div>

        <div className="flexItem-main" id="item-3">
          <Container fluid>
            <Tabs defaultActiveKey="start" id="uncontrolled" style={{borderBottom: 0}}>

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
              {this.state.loggedIn? 
              <Tab eventKey="login" title="Profile">
                  <Authorization />
              </Tab>
              :   
              <Tab eventKey="login" title="Login">
                  <Authorization />
              </Tab>
              }
              <Tab eventKey="start" title="Info">
                <Start />
              </Tab>
              <Tab eventKey="about" title="About">
                <About />
              </Tab>
            </Tabs>
          </Container>
        </div>
      </section>
    )
  }
}

// --------------------------------- Redux -----------------------------------------

let mapStateToProps = (state) => {
  return {
    users: state.Users
  }
}

let mapDispatchToProps = {
  getUser: getUser
}

let FlexMainConnected = connect(mapStateToProps, mapDispatchToProps)(FlexMain)

export default FlexMainConnected
