import React from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Tabs}  from 'react-bootstrap'
import History from '../main/history/History'
import Userchats from '../main/history/Userchats'
import Chat from '../main/chat/Chat'
import About from '../main/About/About'
import { setKey } from '../redux/actions/user'
// CSS in App.css/FlexMain


export function TabletChatboxLeft(props) {

  function handleSelect(key) {
    props.setKey(key)
  } 

  return (
    <Container fluid id="responsive-container-tablet">
      <Tabs activeKey={props.user.key} id="uncontrolled" style={{borderBottom: 0}} onSelect={handleSelect}>
        
        <Tab eventKey="history" title="History">
            <History/>
        </Tab>
        
        <Tab eventKey="userchats" title="Userchats">
            <Userchats />
        </Tab>
        
        <Tab eventKey="chat" title="Chat">
            <Chat />
        </Tab>

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

let mapDispatchToProps = {
  setKey: setKey
}

let ContainerTabletL = connect(mapStateToProps, mapDispatchToProps)(TabletChatboxLeft)

export default ContainerTabletL
