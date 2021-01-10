import React  from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Tabs}  from 'react-bootstrap'
import Authorization from '../authorization/Authorization'
import Publish from '../main/publish/Publish'
import DraftList from '../main/publish/DraftList'
import ChatList from '../main/publish/ChatList'
import Name from '../main/drafts/Name'
import SaveDraft from '../main/drafts/SaveDraft'
import Drafts from '../main/drafts/Drafts'
import TabletSitemap from './TabletSitemap'
// CSS in App.css/FlexMain


export function TabletChatboxRight(props) {

  return (
    <Container fluid id="responsive-container-tablet">
      <Tabs defaultActiveKey={"sitemap"} id="uncontrolled" style={{borderBottom: 0}}>
          
          <Tab eventKey="sitemap" title="Sitemap">
            <TabletSitemap />
          </Tab>

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

