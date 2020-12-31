import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useMediaQuery } from 'react-responsive'
import store from './store'
import { Provider } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Header from './header/Header'
import FlexMain from './main/FlexMain'
import TabletChatboxLeft from './responsive/TabletChatboxLeft'
import TabletChatboxRight from './responsive/TabletChatboxRight'
import MobileChatbox from './responsive/MobileChatbox'
import './App.css'


/**
 * breakpoints for different size of screens
 * @param {*} param0 
 */
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1256 })
  return isDesktop ? children : null
}

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1255 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}


/**
 * order of components for different screens
 */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Desktop>
            <Header />
            <FlexMain />
          </Desktop>

          <Tablet >
              <Container id="flexTablet">
                <TabletChatboxLeft/>
                <TabletChatboxRight />
              </Container>
          </Tablet>
          
          <Mobile>
              <MobileChatbox/>
          </Mobile>

        </div>
      </Provider>
    )
  }
}

export default App
