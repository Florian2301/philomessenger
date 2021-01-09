import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Collapse } from 'react-bootstrap'
import Panel from '../elements/Panel'
import { setKey } from '../redux/actions/user'

export function MobileSitemap(props) {
  const [history, setHistory] = useState(false);
  const [userchats, setUserchats] = useState(false);
  const [chat, setChat] = useState(false);
  const [login, setLogin] = useState(false);
  const [drafts, setDrafts] = useState(false);
  const [publish, setPublish] = useState(false);
  const [about, setAbout] = useState(false);

    function handleKey(key) {
        props.setKey(key)
    } 
    
    return (
        <Panel title="The structure of this app is as follows" id="start-panel">            
            <p className="start-para" id="menu-advice">(recommended view is on a laptop/desktop screen)</p>

            <div>
              <div className="menu-panel">
            <p className="start-para"><span className="menu" onClick={() => handleKey("about")}> About </span></p>
            <p className="menu-link" onClick={() => setAbout(!about)} aria-controls="example-collapse-text" aria-expanded={about}>{!about? "more..." : "less..."}</p>
              </div>
              <Collapse in={about}>
                <div className="menu-details" id="example-collapse-text">
                <p className="start-para">Finally, on the last page <span className="menu-inside" onClick={() => handleKey("about")}>"About" </span>,  
                you will find a short explanation about why i created this app, get more technical informations about it and see the code behind (on github).</p>
                </div>
              </Collapse>
            </div>
            
            <div>
              <div className="menu-panel">
                <p className="start-para"><span className="menu" onClick={() => handleKey("history")}> History </span></p>
                <p className="menu-link" onClick={() => setHistory(!history)} aria-controls="example-collapse-text" aria-expanded={history}>{!history? "more..." : "less..."}</p>
              </div>
              <Collapse in={history}>
                <div className="menu-details" id="example-collapse-text">
                  <p className="start-para">If you click on <span className="menu-inside" onClick={() => handleKey("history")}>"History" </span>
                  you can see some example dialogues i quoted from the great Plato, to see how a chat will look like. 
                  In this section i will post my own chats</p>
                </div>
              </Collapse>
            </div>
            
            <div>
              <div className="menu-panel">
                <p className="start-para"><span className="menu" onClick={() => handleKey("userchats")}> Userchats </span></p>
                <p className="menu-link" onClick={() => setUserchats(!userchats)} aria-controls="example-collapse-text" aria-expanded={userchats}>{!userchats? "more..." : "less..."}</p>
              </div>
              <Collapse in={userchats}>
                <div className="menu-details" id="example-collapse-text">
                  <p className="start-para">On <span className="menu-inside" onClick={() => handleKey("userchats")}>"Userchats" </span> you can find posts from users 
                  (at the moment you find there also a quote of Plato).</p>
                </div>
              </Collapse>
            </div>
            
            <div>
              <div className="menu-panel">
            <p className="start-para"><span className="menu" onClick={() => handleKey("chat")}> Chat </span></p>
            <p className="menu-link" onClick={() => setChat(!chat)} aria-controls="example-collapse-text" aria-expanded={chat}>{!chat? "more..." : "less..."}</p>
              </div>
              <Collapse in={chat}>
                <div className="menu-details" id="example-collapse-text">
                <p className="start-para">On <span className="menu-inside" onClick={() => handleKey("chat")}>"Chat" </span> the saved chats will be displayed, 
            here you will also write your own chats.</p>
                </div>
              </Collapse>
            </div>

            <div>
              <div className="menu-panel">
            <p className="start-para"><span className="menu" onClick={() => handleKey("login")}> Login / Logout</span></p>
            <p className="menu-link" onClick={() => setLogin(!login)} aria-controls="example-collapse-text" aria-expanded={login}>{!login? "more..." : "less..."}</p>
              </div>
              <Collapse in={login}>
                <div className="menu-details" id="example-collapse-text">
                <p className="start-para">If you like to try this text editor you can go to <span className="menu-inside" onClick={() => handleKey("login")}>"Login" </span>. 
            There you can either just click "login" and try the testuser account (stored data will be deleted after logout) or create your own profile by signing up</p>
                </div>
              </Collapse>
            </div>

            <div>
              <div className="menu-panel">
            <p className="start-para"><span className="menu" onClick={() => handleKey("drafts")}> Drafts </span></p>
            <p className="menu-link" onClick={() => setDrafts(!drafts)} aria-controls="example-collapse-text" aria-expanded={drafts}>{!drafts? "more..." : "less..."}</p>
              </div>
              <Collapse in={drafts}>
                <div className="menu-details" id="example-collapse-text">
                <p className="start-para">if you are logged in you can start writing a chat (either as testuser or as your own profile). Just go to  
            <span className="menu-inside" onClick={() => handleKey("drafts")}> "Drafts" </span>, set up at least one name and write your first lines. 
            Afterwards you can add more details to your draft like a title and description and save it to your account.</p>
                </div>
              </Collapse>
            </div>

            <div>
              <div className="menu-panel">
            <p className="start-para"><span className="menu" onClick={() => handleKey("publish")}> Publish </span></p>
            <p className="menu-link" onClick={() => setPublish(!publish)} aria-controls="example-collapse-text" aria-expanded={publish}>{!publish? "more..." : "less..."}</p>
              </div>
              <Collapse in={publish}>
                <div className="menu-details" id="example-collapse-text">
                <p className="start-para">Once you are ready to publish your chat you go to <span className="menu-inside" onClick={() => handleKey("publish")}>"Publish" </span>, 
            there you can edit/add more detailed informations to your chat and publish them, so everyone can read what you have written 
            (must be logged in to publish your texts, see above for login).</p>
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
