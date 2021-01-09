import React, { useState }  from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Container, Tab, Tabs }  from 'react-bootstrap'
import Chat from '../main/chat/Chat'
import Authorization from '../authorization/Authorization'
import About from '../main/About/About'
import TabletSitemap from './TabletSitemap'
// CSS in App.css/FlexMain


export default function TabletChatboxLeft() {
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
      <Tabs defaultActiveKey={"start"} id="uncontrolled" style={{borderBottom: 0}}>
          
          <Tab eventKey="sitemap" title="Sitemap">
            <TabletSitemap />
          </Tab>
          
          <Tab eventKey="chat" title="Chat">
            <Chat />
          </Tab>
          
          {login?
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


