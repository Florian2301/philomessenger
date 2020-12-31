import React from 'react'
import { connect } from 'react-redux'
import Panel from '../elements/Panel'
import { setKey } from '../redux/actions/user'

export function MobileStart(props) {

    function handleKey(key) {
        props.setKey(key)
    } 
    
    return (
        <Panel title='Introduction to "The Messenger" ' id="start-panel">            
            <p className="start-para">On this website you can write dialogues in form of a chat and publish them. The structure of this app is as follows:</p>
            
            <p className="start-para"><span className="menu" onClick={() => handleKey("history")}> History </span></p>
            <p className="start-para"><span className="menu" onClick={() => handleKey("userchats")}> Userchats </span></p>
            <p className="start-para"><span className="menu" onClick={() => handleKey("chat")}> Chat </span></p>
            <p className="start-para"><span className="menu" onClick={() => handleKey("login")}> Login / Profile</span></p>
            <p className="start-para"><span className="menu" onClick={() => handleKey("drafts")}> Drafts </span></p>
            <p className="start-para"><span className="menu" onClick={() => handleKey("publish")}> Publish </span></p>
            <p className="start-para"><span className="menu" onClick={() => handleKey("about")}> About </span></p>

            <br></br>

            <p className="start-para">If you click on - <span className="menu" onClick={() => handleKey("history")}> History </span> 
            - you can see some example dialogues i quoted from the great Plato, to see how a chat will look like. 
             In this section i will post my own chats</p>
            
            <br></br>
            
            <p className="start-para">On - <span className="menu" onClick={() => handleKey("userchats")}>Userchats</span> - you can find posts from users 
            (at the moment you find there also a quote of Plato).</p>
            
            <br></br>

            <p className="start-para">On - <span className="menu" onClick={() => handleKey("chat")}>Chat</span> - the saved chats will be displayed, 
            here you will also write your own chats.</p>
            
            <br></br>
            
            <p className="start-para">If you like to try this text editor you can go to - <span className="menu" onClick={() => handleKey("login")}> Login </span> -. 
            There you can either just click "login" and try the testuser account (stored data will be deleted after logout) or create your own profile by signing up</p>
            
            <br></br>
            
            <p className="start-para">if you are logged in you can start writing a chat (either as testuser or as your own profile). Just go to -  
            <span className="menu" onClick={() => handleKey("drafts")}> Drafts </span> -, set up at least one name and write your first lines. 
            Afterwards you can add more details to your draft like a title and description and save it to your account.</p>
            
            <br></br>
            
            <p className="start-para">Once you are ready to publish your chat you go to - <span className="menu" onClick={() => handleKey("publish")}> Publish </span> -, 
            there you can edit/add more detailed informations to your chat and publish them, so everyone can read what you have written 
            (must be logged in to publish your texts, see above for login).</p>
            
            <br></br>
            
            <p className="start-para">Finally, on the last page, - <span className="menu" onClick={() => handleKey("about")}> About </span> 
            -, you will find a short explanation about why i created this app, get more technical informations about it and see the code behind (on github).</p>

            <br></br>

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
  
  let MobileStartConnected = connect(mapStateToProps, mapDispatchToProps)(MobileStart)
  
  export default MobileStartConnected