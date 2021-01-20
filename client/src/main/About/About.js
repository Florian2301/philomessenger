import React from 'react'
import './About.css'
import Panel from '../../elements/Panel'


export default function About (props) {
    return (
      <Panel title="Demo-Version 1.4.6" id="about">
        <div className="about">
        
            <br></br>
        
            <p>This is a demoversion for a free online chat editor for writing texts/dialogues in form of a chat and same time a platform to publish those texts. I always wanted to write down my own philosophical ideas, 
                but couldn't find the right way to bring them on paper. Finally in 2019 I thought about writing in form of dialogues to express my thoughts. 
                So I decided to create my own online chat editor.
            </p>

            <br></br>

            <p>At the beginning of 2020 I started to teach myself programming to become a web developer. This MERN stack single page application 
                is my first project I have launched. I am using this one as a part of my job applications.</p>
            
            <br></br>

            <p>Its a MERN stack app, means I use MongoDB as my database, express as middleware, React as framework library and node.js as runtime environment for javascript. 
              Additionally I use Redux for state management, firebase for authentification, react-bootstrap for styling some parts (e.g. for forms) and react hooks.</p>
            
            <br></br>
                
            <a id="git" href="https://github.com/Florian2301/philomessenger">See code on Github</a>
            <p id="about-update">Last update: 2021-01-20</p>
            
            <br></br>

            <p>Feel free to try it out with the given testuser credentials at the login.</p>
            <p>I do not follow any commercial purposes with this app.</p>

                
            <br></br>
            
        </div>
      </Panel>       
    )
}
