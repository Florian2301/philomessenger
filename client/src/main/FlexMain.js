import React, { useState }  from 'react'
import './FlexMain.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import {Container, Tab, Tabs} from 'react-bootstrap'
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
import Sitemap from './About/Sitemap'


export default function FlexMain() {
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


  // ----------------------------- RETURN -------------------------------------------------------------------
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
          <Tabs defaultActiveKey={"login"} id="uncontrolled" style={{borderBottom: 0}}>
            
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
            
            {login? 
              <Tab eventKey="login" title="Profile">
                  <Authorization />
              </Tab>
            :   
              <Tab eventKey="login" title="Login">
                  <Authorization />
              </Tab>
            }
            
            <Tab eventKey="sitemap" title="Sitemap">
              <Sitemap />
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

