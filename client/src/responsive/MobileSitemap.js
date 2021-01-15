import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Collapse } from 'react-bootstrap'
import Panel from '../elements/Panel'
import { setKey } from '../redux/actions/user'


export function MobileSitemap(props) {
  const [about, setAbout] = useState(false)
  const [history, setHistory] = useState(false)
  const [userchats, setUserchats] = useState(false)
  const [chat, setChat] = useState(false)
  const [login, setLogin] = useState(false)
  const [drafts, setDrafts] = useState(false)
  const [publish, setPublish] = useState(false)

  function toggleDetails(key) {
    setAbout(false)
    setHistory(false)
    setUserchats(false)
    setChat(false)
    setLogin(false)
    setDrafts(false)
    setPublish(false)
    if(key === "about") setAbout(!about)
    if(key === "history") setHistory(!history)
    if(key === "userchats") setUserchats(!userchats)
    if(key === "chat") setChat(!chat)
    if(key === "login") setLogin(!login)
    if(key === "drafts") setDrafts(!drafts)
    if(key === "publish") setPublish(!publish)
  }

  function handleKey(key) {
      props.setKey(key)
  }
  
  //------------------------- RETURN --------------------------------------------------------------------------
    
    return (
        <Panel title="Your guide of this app" id="start-panel">            
            <p className="start-para-mobile" id="menu-advice-mobile">- recommended view is on a laptop/desktop screen -</p>
            
            <div>
              <div className="menu-panel">
                <p className="start-para-mobile"><span className="menu" onClick={() => handleKey("history")}> History </span></p>
                <p className="menu-link" onClick={() => toggleDetails("history")} aria-controls="example-collapse-text" aria-expanded={history}>{!history? "more..." : "less..."}</p>
              </div>
              <Collapse in={history}>
                <div className="menu-details" id="example-collapse-text">
                  <p className="start-para-details">Under <span className="menu-inside" onClick={() => handleKey("history")}>"History" </span>
                  you will find an introduction about how to use this text editor. In this section i will also post my own chats in the future.</p>
                  <p className="start-para-details">After you clicked the title, the "date" will change to a download link where you can download the chat as a PDF document.</p>
                </div>
              </Collapse>
            </div>
            
            <div>
              <div className="menu-panel">
                <p className="start-para-mobile"><span className="menu" onClick={() => handleKey("userchats")}> Userchats </span></p>
                <p className="menu-link" onClick={() => toggleDetails("userchats")} aria-controls="example-collapse-text" aria-expanded={userchats}>{!userchats? "more..." : "less..."}</p>
              </div>
              <Collapse in={userchats}>
                <div className="menu-details" id="example-collapse-text">
                  <p className="start-para-details">Under <span className="menu-inside" onClick={() => handleKey("userchats")}>"Userchats" </span> you can publish your own chats after registration. 
                  At the moment you can see example dialogues i quoted from the great Plato, to see how your chat could look like.</p>
                </div>
              </Collapse>
            </div>
            
            <div>
              <div className="menu-panel">
                <p className="start-para-mobile"><span className="menu" onClick={() => handleKey("chat")}> Chat </span></p>
                <p className="menu-link" onClick={() => toggleDetails("chat")} aria-controls="example-collapse-text" aria-expanded={chat}>{!chat? "more..." : "less..."}</p>
              </div>
              <Collapse in={chat}>
                <div className="menu-details" id="example-collapse-text">
                  <p className="start-para-details">On <span className="menu-inside" onClick={() => handleKey("chat")}>"Chat" </span> the published chats will be displayed. When you are logged in, you will 
                  write your chats in this section as well.</p>
                </div>
              </Collapse>
            </div>

            <div>
              <div className="menu-panel">
                <p className="start-para-mobile"><span className="menu" onClick={() => handleKey("login")}> Login/Logout</span></p>
                <p className="menu-link" onClick={() => toggleDetails("login")} aria-controls="example-collapse-text" aria-expanded={login}>{!login? "more..." : "less..."}</p>
              </div>
              <Collapse in={login}>
                <div className="menu-details" id="example-collapse-text">
                  <p className="start-para-details">If you like to have a look "inside" the text editor, to see how to use it, you can go to <span className="menu-inside" onClick={() => handleKey("login")}>"Login" </span> and 
                  log in with the given testuser credentials. Feel free to write, edit and publish a chat for testing purposes.</p>
                </div>
              </Collapse>
            </div>

            <div>
              <div className="menu-panel">
            <p className="start-para-mobile"><span className="menu" onClick={() => handleKey("drafts")}> Drafts </span></p>
            <p className="menu-link" onClick={() => toggleDetails("drafts")} aria-controls="example-collapse-text" aria-expanded={drafts}>{!drafts? "more..." : "less..."}</p>
              </div>
              <Collapse in={drafts}>
                <div className="menu-details" id="example-collapse-text">
                  <p className="start-para-details">if you log in you can start writing a chat in the <span className="menu-inside" onClick={() => handleKey("drafts")}> "Drafts" </span> section.</p>
                  <p className="start-para-details">First add names (your participants), set a title and click "New chat". Afterwards you can start writing your own chat.</p>
                  <p className="start-para-details">While you are writung you should click "save" from time to time, so your text won't get lost. Same when you edit the draft of your chat.</p>
                </div>
              </Collapse>
            </div>

            <div>
              <div className="menu-panel">
                <p className="start-para-mobile"><span className="menu" onClick={() => handleKey("publish")}> Publish </span></p>
                <p className="menu-link" onClick={() => toggleDetails("publish")} aria-controls="example-collapse-text" aria-expanded={publish}>{!publish? "more..." : "less..."}</p>
              </div>
              <Collapse in={publish}>
                <div className="menu-details" id="example-collapse-text">
                  <p className="start-para-details">Once you are ready to publish your chat you go to <span className="menu-inside" onClick={() => handleKey("publish")}>"Publish" </span> and 
                  set a "chatnumber" and a "date", then click on "Publish chat".</p>
                  <p className="start-para-details">You can also change the "chatnumber" "title", "date", "tags" and "description" of a published chat when you click on "Save changes" after you you made your changes.</p>
                </div>
              </Collapse>
            </div>

            <div>
              <div className="menu-panel">
                <p className="start-para-mobile"><span className="menu" onClick={() => handleKey("about")}> About </span></p>
                <p className="menu-link" onClick={() => toggleDetails("about")} aria-controls="example-collapse-text" aria-expanded={about}>{!about? "more..." : "less..."}</p>
              </div>
              <Collapse in={about}>
                <div className="menu-details" id="example-collapse-text">
                <p className="start-para-details">On <span className="menu-inside" onClick={() => handleKey("about")}>"About" </span> you will find a short explanation  
                about why i created this app, get more technical informations about it and find a link to my github repository to see the code.</p>
                </div>
              </Collapse>
            </div>
        </Panel>
    )
}

// ---------------------- Redux ---------------------------------------

let mapStateToProps = (state) => {
    return {
      user: state.user
    }
  }
  
  let mapDispatchToProps = {
    setKey: setKey
  }
  
  let MobileSitemapConnected = connect(mapStateToProps, mapDispatchToProps)(MobileSitemap)
  
  export default MobileSitemapConnected
