import React from 'react'
import { connect } from 'react-redux'
import './FlexMain.css'
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


export function FlexMain(props) {

  return (
    <section className="flexContainer-main">
      <div className="flexItem-main" id="item-1">
        <Container fluid>
          <Tabs defaultActiveKey="history" id="uncontrolled" style={{borderBottom: 0}}>
            
            <Tab eventKey="history" title="History">
              <div className="table-border-color">
                <History />
              </div>
            </Tab>
            
            <Tab eventKey="userchats" title="Userchats">
              <div className="table-border-color">
                <Userchats />
              </div>
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
            
            {props.user.loggedIn?
              <Tab eventKey="drafts" title="Drafts">
                <Name />
                <SaveDraft />
                <Drafts />
              </Tab>
            : null}
            
            {props.user.loggedIn?
              <Tab eventKey="publish" title="Publish">
                <Publish />
                <DraftList />
                <ChatList />
              </Tab>
            : null}
            
            {props.user.loggedIn? 
              <Tab eventKey="login" title="Logout">
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

// ------------- REDUX -----------------------------------------------

let mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

let mapDispatchToProps = {}

let FlexContainer = connect(mapStateToProps, mapDispatchToProps)(FlexMain)

export default FlexContainer


