import React from 'react'
import Panel from '../../elements/Panel'
import './Sitemap.css'

export function Start() {    
    return (
        <Panel title="The structure of this app is as follows" id="start-panel-chat">            
            
            <br></br>
            <h2 className="start-para-tablet">History</h2>
            <p className="start-para">If you go to<span className="start-para-tablet">"History"</span>
            you can see some example dialogues i quoted from the great Plato, to see how a chat will look like. 
             In this section i will post my own chats</p>
            
            <br></br>
            <h2 className="start-para-tablet">Userchats</h2>
            <p className="start-para">On<span className="start-para-tablet">"Userchats"</span>you can find posts from users 
            (at the moment you find there also a quote of Plato).</p>
            
            <br></br>
            <h2 className="start-para-tablet">Chat</h2>
            <p className="start-para">On<span className="start-para-tablet">"Chat"</span>the saved chats will be displayed, 
            here you will also write your own chats.</p>
            
            <br></br>
            <h2 className="start-para-tablet">Login</h2>
            <p className="start-para">If you like to try this text editor you can go to<span className="start-para-tablet">"Login"</span>. 
            There you can either just click "login" and try the testuser account or create your own profile by signing up</p>
            
            <br></br>
            <h2 className="start-para-tablet">Drafts</h2>
            <p className="start-para">if you are logged in you can start writing a chat. Just go to
            <span className="start-para-tablet">"Drafts"</span>, set up at least one name and write your first lines. 
            Afterwards you can add more details to your draft like a title and description and save it to your account.</p>
            
            <br></br>
            <h2 className="start-para-tablet">Publish</h2>
            <p className="start-para">Once you are ready to publish your chat you go to<span className="start-para-tablet">"Publish"</span>, 
            there you can edit/add more detailed informations to your chat and publish them, so everyone can read what you have written 
            (must be logged in to publish your texts, see above for login).</p>
            
            <br></br>
            <h2 className="start-para-tablet">About</h2>
            <p className="start-para">Finally, on the last page,<span className="start-para-tablet">"About"</span>, 
            you will find a short explanation about why i created this app, get more technical informations about it and see the code behind (on github).</p>

            <br></br>

        </Panel>
    )
}

export default Start
