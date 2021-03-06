import React from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Tabs}  from 'react-bootstrap'
import History from '../main/history/History'
import Chat from '../main/chat/Chat'
import Userchats from '../main/history/Userchats'
import Publish from '../main/publish/Publish'
import DraftList from '../main/publish/DraftList'
import ChatList from '../main/publish/ChatList'
import AddName from '../main/drafts/AddName'
import SaveDraft from '../main/drafts/SaveDraft'
import Drafts from '../main/drafts/Drafts'
import Authorization from '../authorization/Authorization'
import About from '../main/About/About'
import { getUser, setKey } from '../redux/actions/user'
import MobileSitemap from './MobileSitemap'
import SelectView from '../header/SelectView'
import firebase from 'firebase/app'
import 'firebase/auth'
import './Responsive.css'


// mobile version
export function MobileChatbox(props) {

  function handleSelect(key) {
    props.setKey(key)
  } 

  firebase.auth().onAuthStateChanged((user) => {
    if(user && !props.user.loggedIn) {
        props.getUser(user.displayName)
    }
})

  // ------------------------------ RETURN -----------------------------------------------------------------------------
  return (
    <div className="responsive-border-mobile">
    <Container id="responsive-container-mobile">
        
      <SelectView auto={props.auto} desktop={props.desktop} tablet={props.tablet} mobile={props.mobile} id={props.id}/>
      
      <Tabs id="uncontrolled" style={{borderBottom: 0}} activeKey={props.user.key} onSelect={handleSelect}>
        
        <Tab eventKey="sitemap" title="Menu">
          <MobileSitemap />
        </Tab>


        {!props.user.loggedIn?
          <Tab eventKey="about" title="About">
            <About />
            <br></br>
          </Tab>
        : props.user.key === "about"?
          <Tab eventKey="about" title="About">
            <About />
            <br></br>
          </Tab>
        : null}


        {!props.user.loggedIn?
          <Tab eventKey="history" title="History">
            <div className="table-border-color-mobile">
              <History/>
            </div>
          </Tab>
        : props.user.key === "history"?
          <Tab eventKey="history" title="History">
            <div className="table-border-color-mobile">
              <History/>
            </div>
          </Tab>
        : null}


        {!props.user.loggedIn?
          <Tab eventKey="userchats" title="Userchats">
            <div className="table-border-color-mobile">
              <Userchats />
            </div>
          </Tab>
        : props.user.key === "userchats"?
          <Tab eventKey="userchats" title="Userchats">
            <div className="table-border-color-mobile">
              <Userchats />
            </div>
          </Tab>
        : null}
        

        {props.user.key === "chat"?
          <Tab eventKey="chat" title="Chat">
            <Chat />
          </Tab>
        : props.user.loggedIn && (props.user.key !== "history") && (props.user.key !== "userchats") && (props.user.key !== "about") && (props.user.key !== "login")?
          <Tab eventKey="chat" title="Chat">
            <Chat />
          </Tab>
         : null }
        

        {(props.user.key === "drafts") && !props.user.loggedIn?
          <Tab eventKey="drafts" title="Drafts">
            <p className="mobile-notlogged">- you must be logged in to see the content -</p>
          </Tab>
        : props.user.loggedIn?
          <Tab eventKey="drafts" title="Drafts">
            <AddName />
            <SaveDraft />
            <Drafts />
          </Tab>
        : null}
        

        {(props.user.key === "publish") && !props.user.loggedIn?
          <Tab eventKey="publish" title="Publish">
            <p className="mobile-notlogged">- you must be logged in to see the content -</p>
          </Tab> 
        : props.user.loggedIn?
          <Tab eventKey="publish" title="Publish">
            <Publish />
            <DraftList />
            <ChatList />
          </Tab>
        : null}
        

        {props.user.key === "login"? 
          <Tab eventKey="login" title={props.user.loggedIn? "Logout" : "Login"}>
            <Authorization />
          </Tab>
        : props.user.loggedIn?
          <Tab eventKey="login" title={props.user.loggedIn? "Logout" : "Login"}>
            <Authorization />
          </Tab>
        : null}
        
      </Tabs>
    </Container>
    </div>
  )
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
