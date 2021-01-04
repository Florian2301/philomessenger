import React, { useState } from 'react'
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
// CSS in App.css/FlexMain


export default function TabletChatboxRight() {
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
