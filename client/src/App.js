import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'
import { Provider } from 'react-redux'
import { Container } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import Header from './header/Header'
import FlexMain from './main/FlexMain'
import TabletChatboxLeft from './responsive/TabletChatboxLeft'
import TabletChatboxRight from './responsive/TabletChatboxRight'
import MobileChatbox from './responsive/MobileChatbox'
import './App.css'
import SelectView from './header/SelectView'


export default function App() {
  const [ bigScreen, setBigScreen ] = useState(1200)
  const [ mediumScreen, setMediumScreen ] = useState(768)

  const viewAuto = () => {
    setBigScreen(1200)
    setMediumScreen(768)
  }

  const viewDesktop = () => {
    setBigScreen(980)
    setMediumScreen(768)
  }

  const viewTablet = () => {
    setBigScreen(3000)
    setMediumScreen(768)
  }

  const viewMobile = () => {
    setBigScreen(3000)
    setMediumScreen(2991)
  }  

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: bigScreen })
    return isDesktop ? children : null
  }


  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: mediumScreen, maxWidth: bigScreen-1 })
    return isTablet ? children : null
  }

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: mediumScreen-1 })
    return isMobile ? children : null
  }

// ------------------------------------- RETURN ------------------------------------------------
  
    return (
      <Provider store={store}>
        <div>
          <Desktop>
            <Header auto={viewAuto} desktop={viewDesktop} tablet={viewTablet} mobile={viewMobile} id="viewdesktop"/>
            <FlexMain />
          </Desktop>

          <Tablet >
              <SelectView auto={viewAuto} desktop={viewDesktop} tablet={viewTablet} mobile={viewMobile} id="viewtablet"/>
              <Container id="flexTablet">
                <TabletChatboxLeft/>
                <TabletChatboxRight />
              </Container>
          </Tablet>
          
          <Mobile>
            <Container id="flexMobile">
              <MobileChatbox auto={viewAuto} desktop={viewDesktop} tablet={viewTablet} mobile={viewMobile} id="viewmobile"/>
            </Container>
          </Mobile>
        </div>
        </Provider>
    )
  
}
