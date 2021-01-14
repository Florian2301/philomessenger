import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import Panel from '../elements/Panel'

export function TabletSitemap() {   
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

    
// -------------------------- RETURN -------------------------------------------------------------

    return (
        <Panel title="The structure of this app is as follows" id="start-panel-chat">
            <div>
                <div className="menu-panel">    
                    <h2 className="start-para-tablet">About</h2>
                    <p className="menu-link" onClick={() => toggleDetails("about")} aria-controls="example-collapse-text" aria-expanded={about}>{!about? "more..." : "less..."}</p>
                </div>
                <Collapse in={about}>
                    <div className="menu-details" id="example-collapse-text">
                        <p className="start-para">On <span className="start-para-tablet"> "About" </span>  
                           you will find a short explanation about why i created this app, get more technical informations about it and see the code behind (on github).</p>
                    </div>
                </Collapse>
            </div>
            
            <div>
                <div className="menu-panel">
                    <h2 className="start-para-tablet">History</h2>
                    <p className="menu-link" onClick={() => toggleDetails("history")} aria-controls="example-collapse-text" aria-expanded={history}>{!history? "more..." : "less..."}</p>
                </div>
                <Collapse in={history}>
                    <div className="menu-details" id="example-collapse-text">
                        <p className="start-para">If you go to<span className="start-para-tablet">"History"</span>
                        you can see some example dialogues i quoted from the great Plato, to see how a chat will look like. 
                        In this section i will post my own chats</p>
                    </div>
                </Collapse>
            </div>

            <div>
                <div className="menu-panel">
                    <h2 className="start-para-tablet">Userchats</h2>
                    <p className="menu-link" onClick={() => toggleDetails("userchats")} aria-controls="example-collapse-text" aria-expanded={userchats}>{!userchats? "more..." : "less..."}</p>
                </div>
                <Collapse in={userchats}>
                    <div className="menu-details" id="example-collapse-text">
                        <p className="start-para">On<span className="start-para-tablet">"Userchats"</span>you can find posts from users 
                        (at the moment you find there also a quote of Plato).</p>
                    </div>
                </Collapse>
            </div>

            <div>
                <div className="menu-panel">
                    <h2 className="start-para-tablet">Chat</h2>
                    <p className="menu-link" onClick={() => toggleDetails("chat")} aria-controls="example-collapse-text" aria-expanded={chat}>{!chat? "more..." : "less..."}</p>
                </div>
                <Collapse in={chat}>
                    <div className="menu-details" id="example-collapse-text">
                        <p className="start-para">On<span className="start-para-tablet">"Chat"</span>the saved chats will be displayed, 
                        here you will also write your own chats.</p>
                    </div>
                </Collapse>
            </div>
            
            <div>
                <div className="menu-panel">
                    <h2 className="start-para-tablet">Login</h2>
                    <p className="menu-link" onClick={() => toggleDetails("login")} aria-controls="example-collapse-text" aria-expanded={login}>{!login? "more..." : "less..."}</p>
                </div>
                <Collapse in={login}>
                    <div className="menu-details" id="example-collapse-text">
                        <p className="start-para">If you like to try this text editor you can go to<span className="start-para-tablet">"Login"</span>. 
                        There you can either just click "login" and try the testuser account or create your own profile by signing up</p>
                    </div>
                </Collapse>
            </div>
            
            <div>
                <div className="menu-panel">
                    <h2 className="start-para-tablet">Drafts</h2>
                    <p className="menu-link" onClick={() => toggleDetails("drafts")} aria-controls="example-collapse-text" aria-expanded={drafts}>{!drafts? "more..." : "less..."}</p>
                </div>
                <Collapse in={drafts}>
                    <div className="menu-details" id="example-collapse-text">
                        <p className="start-para">if you are logged in you can start writing a chat. Just go to
                        <span className="start-para-tablet">"Drafts"</span>, set up at least one name and write your first lines. 
                        Afterwards you can add more details to your draft like a title and description and save it to your account.</p>
                    </div>
                </Collapse>
            </div>
            
            <div>
                <div className="menu-panel">
                    <h2 className="start-para-tablet">Publish</h2>
                    <p className="menu-link" onClick={() => toggleDetails("publish")} aria-controls="example-collapse-text" aria-expanded={publish}>{!publish? "more..." : "less..."}</p>
                </div>
                <Collapse in={publish}>
                    <div className="menu-details" id="example-collapse-text">
                        <p className="start-para">Once you are ready to publish your chat you go to<span className="start-para-tablet">"Publish"</span>, 
                        there you can edit/add more detailed informations to your chat and publish them, so everyone can read what you have written 
                        (must be logged in to publish your texts, see above for login).</p>
                    </div>
                </Collapse>
            </div>
 
        </Panel>
    )
}

export default TabletSitemap
