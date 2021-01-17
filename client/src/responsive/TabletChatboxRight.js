import React  from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Tabs}  from 'react-bootstrap'
import Authorization from '../authorization/Authorization'
import Publish from '../main/publish/Publish'
import DraftList from '../main/publish/DraftList'
import ChatList from '../main/publish/ChatList'
import AddName from '../main/drafts/AddName'
import SaveDraft from '../main/drafts/SaveDraft'
import Drafts from '../main/drafts/Drafts'
import TabletSitemap from './TabletSitemap'
import About from '../main/About/About'
// CSS in App.css/FlexMain


export function TabletChatboxRight(props) {

  return (
    <div id="responsive-border-tablet-right">
    <Container fluid id="responsive-container-tablet">
      <Tabs defaultActiveKey={"sitemap"} id="uncontrolled" style={{borderBottom: 0}}>

          {props.user.loggedIn?
          <Tab eventKey="drafts" title="Drafts">
             <AddName />
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
    
        <Tab eventKey="sitemap" title="Sitemap">
            <TabletSitemap />
        </Tab>
    
        <Tab eventKey="about" title="About">
          <About />
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
          
      </Tabs>
    </Container>
    </div>
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

