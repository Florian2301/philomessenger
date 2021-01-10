import React from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Tabs }  from 'react-bootstrap'
import Chat from '../main/chat/Chat'
import Authorization from '../authorization/Authorization'
import About from '../main/About/About'
import TabletSitemap from './TabletSitemap'
// CSS in App.css/FlexMain


export function TabletChatboxRight(props) {

  return (
    <Container fluid id="responsive-container-tablet">
      <Tabs defaultActiveKey={"sitemap"} id="uncontrolled" style={{borderBottom: 0}}>
          
          <Tab eventKey="sitemap" title="Sitemap">
            <TabletSitemap />
          </Tab>
          
          <Tab eventKey="chat" title="Chat">
            <Chat />
          </Tab>
          
          {props.user.loggedIn?
          <Tab eventKey="login" title="Logout">
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


// ------------- REDUX -----------------------------------------------

let mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

let mapDispatchToProps = {}

let ContainerTabletR = connect(mapStateToProps, mapDispatchToProps)(TabletChatboxRight)

export default ContainerTabletR

