import React, { useState } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Container, Tab, Tabs }  from 'react-bootstrap'
import History from '../main/history/History'
import Userchats from '../main/history/Userchats'
import Publish from '../main/publish/Publish'
import DraftList from '../main/publish/DraftList'
import ChatList from '../main/publish/ChatList'
import Name from '../main/drafts/Name'
import SaveDraft from '../main/drafts/SaveDraft'
import Drafts from '../main/drafts/Drafts'
// CSS in App.css/FlexMain


export function TabletChatboxLeft() {
  const [login, setLogin] = useState(false)

  // get user-status to display/hide navigation
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if(user.emailVerified) {
          setLogin(true)
        } else {
          setLogin(false)
        }
    } else {
      setLogin(false)
    }
  })
  
  //zweifache Prüfung, ob user eingeloggt ist
  if(props.user.loggedIn) {
    setLogin(true)
  }
  else {
    setLogin(false)
  }
  
  
 // ------------------------- RETURN --------------------------------------------------

  return (
    <Container fluid id="responsive-container-tablet">
      <Tabs defaultActiveKey={"history"} id="uncontrolled" style={{borderBottom: 0}}>
        
        <Tab eventKey="history" title="History">
            <History/>
        </Tab>
        
        <Tab eventKey="userchats" title="Userchats">
            <Userchats />
        </Tab>
        
        {login?
          <Tab eventKey="drafts" title="Drafts">
             <Name />
             <SaveDraft />
             <Drafts />
          </Tab>
        : null}
        
        {login?
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


// ------------- REDUX -----------------------------------------------

let mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

let mapDispatchToProps = {}

let ContainerTabletL = connect(mapStateToProps, mapDispatchToProps)(TabletChatboxLeft)

export default ContainerTabletL

