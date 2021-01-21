import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import Panel from '../elements/Panel'
import { CSSTransition, TransitionGroup } from 'react-transition-group' //CSS in Chat.css
import { v4 as uuidv4 } from 'uuid'
import './Responsive.css'


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
        <Panel title="Your guide of this app" id="start-panel-chat">
            <div className="tablet-menu-points-top">
                <div className="menu-panel">
                    <h2 className="start-para-tablet">History</h2>
                    <p className="menu-link" onClick={() => toggleDetails("history")} aria-controls="example-collapse-text" aria-expanded={history}>{!history? "more..." : "less..."}</p>
                </div>
                <TransitionGroup>
                    <CSSTransition key={uuidv4()} timeout={1000} classNames="transition-sitemap">
                        <Collapse in={history}>
                            <div className="menu-details" id="example-collapse-text">
                                <p className="para-tablet">Under <span className="start-para-inline">"History"</span> you will find an introduction about how to use this
                                chat editor. In this section i will also post my own chats in the future</p>
                                <p className="para-tablet">If you click on the title of a chat it will be displayed in <span className="start-para-inline">"Chat"</span>.</p>
                                <p className="para-tablet">After you clicked the title, the "date" will change to a download link where you can download the chat as a PDF document.</p>
                            </div>
                        </Collapse>
                    </CSSTransition>
                </TransitionGroup>
            </div>

            <div className="tablet-menu-points">
                <div className="menu-panel">
                    <h2 className="start-para-tablet">Userchats</h2>
                    <p className="menu-link" onClick={() => toggleDetails("userchats")} aria-controls="example-collapse-text" aria-expanded={userchats}>{!userchats? "more..." : "less..."}</p>
                </div>
                <TransitionGroup>
                    <CSSTransition key={uuidv4()} timeout={1000} classNames="transition-sitemap">
                        <Collapse in={userchats}>
                            <div className="menu-details" id="example-collapse-text">
                                <p className="para-tablet-last">Under <span className="start-para-inline">"Userchats"</span> you can publish your own chats after registration. 
                                At the moment you can see example dialogues i quoted from the great Plato, to see how your chat could look like.</p>
                            </div>
                        </Collapse>
                    </CSSTransition>
                </TransitionGroup>
            </div>

            <div className="tablet-menu-points">
                <div className="menu-panel">
                    <h2 className="start-para-tablet">Chat</h2>
                    <p className="menu-link" onClick={() => toggleDetails("chat")} aria-controls="example-collapse-text" aria-expanded={chat}>{!chat? "more..." : "less..."}</p>
                </div>
                <TransitionGroup>
                    <CSSTransition key={uuidv4()} timeout={1000} classNames="transition-sitemap">
                        <Collapse in={chat}>
                            <div className="menu-details" id="example-collapse-text">
                                <p className="para-tablet-last">On <span className="start-para-inline">"Chat"</span> the published chats will be displayed. When you are logged in, you will 
                                write your chats in this section as well.</p>
                            </div>
                        </Collapse>
                    </CSSTransition>
                </TransitionGroup>
            </div>
            
            <div className="tablet-menu-points">
                <div className="menu-panel">
                    <h2 className="start-para-tablet">Login/Logout</h2>
                    <p className="menu-link" onClick={() => toggleDetails("login")} aria-controls="example-collapse-text" aria-expanded={login}>{!login? "more..." : "less..."}</p>
                </div>
                <TransitionGroup>
                    <CSSTransition key={uuidv4()} timeout={1000} classNames="transition-sitemap">
                        <Collapse in={login}>
                            <div className="menu-details" id="example-collapse-text">
                                <p className="para-tablet">If you like to have a look "inside" the chat editor, to see how to use it, you can go to <span className="start-para-inline">"Login"</span> and 
                                log in with the given testuser credentials. Feel free to write, edit and publish a chat for testing purposes.</p>
                            </div>
                        </Collapse>
                    </CSSTransition>
                </TransitionGroup>
            </div>
            
            <div className="tablet-menu-points">
                <div className="menu-panel">
                    <h2 className="start-para-tablet">Drafts</h2>
                    <p className="menu-link" onClick={() => toggleDetails("drafts")} aria-controls="example-collapse-text" aria-expanded={drafts}>{!drafts? "more..." : "less..."}</p>
                </div>
                <TransitionGroup>
                    <CSSTransition key={uuidv4()} timeout={1000} classNames="transition-sitemap">
                        <Collapse in={drafts}>
                            <div className="menu-details" id="example-collapse-text">
                                <p className="para-tablet">if you log in you can start writing a chat in the <span className="start-para-inline">"Drafts"</span> section.</p>
                                <p className="para-tablet">First add names (your participants), set a title and click "new chat". Afterwards you can start writing your own chat.</p>
                                <p className="para-tablet">While you are writing you should click "save" from time to time, so your text won't get lost. Same when you edit the draft of your chat.</p>
                            </div>
                        </Collapse>
                    </CSSTransition>
                </TransitionGroup>
            </div>
            
            <div className="tablet-menu-points">
                <div className="menu-panel">
                    <h2 className="start-para-tablet">Publish</h2>
                    <p className="menu-link" onClick={() => toggleDetails("publish")} aria-controls="example-collapse-text" aria-expanded={publish}>{!publish? "more..." : "less..."}</p>
                </div>
                <TransitionGroup>
                    <CSSTransition key={uuidv4()} timeout={1000} classNames="transition-sitemap">
                        <Collapse in={publish}>
                            <div className="menu-details" id="example-collapse-text">
                                <p className="para-tablet">Once you are ready to publish your chat you go to <span className="start-para-inline">"Publish"</span> and 
                                set a "chatnumber" and a "date", then click on "publish chat", it will be displayed in <span className="start-para-inline">"Userchats"</span>.</p>
                            </div>
                        </Collapse>
                    </CSSTransition>
                </TransitionGroup>
            </div>

            <div className="tablet-menu-points-end">
                <div className="menu-panel">    
                    <h2 className="start-para-tablet">About</h2>
                    <p className="menu-link" onClick={() => toggleDetails("about")} aria-controls="example-collapse-text" aria-expanded={about}>{!about? "more..." : "less..."}</p>
                </div>
                <TransitionGroup>
                    <CSSTransition key={uuidv4()} timeout={1000} classNames="transition-sitemap">
                        <Collapse in={about}>
                            <div className="menu-details" id="example-collapse-text">
                                <p className="para-tablet-last">On <span className="start-para-inline">"About"</span> you will find a short explanation
                                about why i created this app, get more technical informations about it and find a link to my github repository to see the code.</p>
                            </div>
                        </Collapse>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        </Panel>
    )
}

export default TabletSitemap
