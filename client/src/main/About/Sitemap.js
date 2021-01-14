import React from 'react'
import Panel from '../../elements/Panel'
import './Sitemap.css'

export function Start() {    
    return (
        <Panel title="The structure of this app is as follows" id="start-panel-chat">            
            
            <h2 className="start-para-desktop">History</h2>
            <p className="start-para">Under <span className="start-para-inline">"History"</span> you will find an introduction about how to use this
             text editor. In this section i will also post my own chats in the future</p>
            <p className="start-para">If you click on the title of a chat it will be displayed in <span className="start-para-inline">"Chat"</span>.</p>
            <p className="start-para">After you clicked the title, the "date" will change to a download link where you can download the chat as a PDF document.</p>
            <p className="start-para">If you only hover over the title additional informations about the chat will appear: Tags and a brief description of the chat.</p>
            
            <h2 className="start-para-desktop">Userchats</h2>
            <p className="start-para">Under <span className="start-para-inline">"Userchats"</span> you can publish your own chats after registration. 
            At the moment you can see example dialogues i quoted from the great Plato, to see how your chat could look like.</p>
            
            <h2 className="start-para-desktop">Chat</h2>
            <p className="start-para">On <span className="start-para-inline">"Chat"</span> the published chats will be displayed. When you are logged in, you will 
            write your chats in this section as well.</p>
            
            <h2 className="start-para-desktop">Login/Logout</h2>
            <p className="start-para">If you like to have a look "inside" the text editor, to see how to use it, you can go to <span className="start-para-inline">"Login"</span> and 
             log in with the given testuser credentials. Feel free to write, edit and publish a chat for testing purposes.</p>
            <p className="start-para">The authorization is at the moment not a safe "https" process, a safe way to log in with your private email address will available in the future. 
            This app is only for demonstration hosted at "heroku.com".</p>
            
            <h2 className="start-para-desktop">Drafts</h2>
            <p className="start-para">if you log in you can start writing a chat in the <span className="start-para-inline">"Drafts"</span> section.</p>
            <p className="start-para">First add names (your participants), set a title and click "New chat". Afterwards you can start writing your own chat.</p>
            <p className="start-para">If you like to edit the draft of your chat you can click "Save changes" when you are done editing, changes will be saved.</p>
            <p className="start-para">"Tags" and "Description" are the parts which will appear on the <span className="start-para-inline">"Userchats"</span> section when you published your chat.</p>
            
            <h2 className="start-para-desktop">Publish</h2>
            <p className="start-para">Once you are ready to publish your chat you go to <span className="start-para-inline">"Publish"</span>, 
            there you have to set a "chatnumber" and a "date", then click on "Publish chat", it will be displayed in <span className="start-para-inline">"Userchats"</span>.</p>
            <p className="start-para">You can also change the "chatnumber" "title", "date", "tags" and "description" of a published chat when you click on "Save changes" after you you made your changes.</p>
            
            <h2 className="start-para-desktop">About</h2>
            <p className="start-para">On <span className="start-para-inline">"About"</span> you will find a short explanation
            about why i created this app, get more technical informations about it and see the code behind (on github).</p>
            <br></br>

        </Panel>
    )
}

export default Start
