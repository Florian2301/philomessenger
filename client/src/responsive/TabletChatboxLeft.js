import React from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Tabs}  from 'react-bootstrap'
import History from '../main/history/History'
import Userchats from '../main/history/Userchats'
import Chat from '../main/chat/Chat'
import { setKey } from '../redux/actions/user'
import './Responsive.css'


export function TabletChatboxLeft(props) {

  function handleSelect(key) {
    props.setKey(key)
  } 

  return (
    <div id="responsive-border-tablet-left">
    <Container fluid id="responsive-container-tablet">
      <Tabs activeKey={props.user.key} id="uncontrolled" style={{borderBottom: 0}} onSelect={handleSelect}>
        
        <Tab eventKey="history" title="History">
          <div className="table-border-color">
            <History/>
          </div>
        </Tab>
        
        <Tab eventKey="userchats" title="Userchats">
          <div className="table-border-color">
            <Userchats />
          </div>
        </Tab>
        
        <Tab eventKey="chat" title="Chat">
            <Chat />
        </Tab>

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

let mapDispatchToProps = {
  setKey: setKey
}

let ContainerTabletL = connect(mapStateToProps, mapDispatchToProps)(TabletChatboxLeft)

export default ContainerTabletL
