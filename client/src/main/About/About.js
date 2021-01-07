import React from 'react'
import './About.css'
import Panel from '../../elements/Panel'


export default function About (props) {
    return (
      <Panel title="Demo-Version 1.4.0" id="about">
        <div className="about">
                <br></br>
            <p>At the beginning of 2020 I started to teach myself programming to become a web developer. This MERN stack single page application 
                is my first project I have launched and it represents my current knowledge of web developing. I am using this one as a part of my job applications.</p>
            
            <br></br>
                
            <a id="git" href="https://github.com/Florian2301/philomessenger">See code on Github</a>
            <p id="about-update">Last update: 2021-01-07</p>
            
            <br></br>

            <p>Feel free to try it out with the given testuser credentials at the login (stored data will be deleted after logout).</p>
            <p>The design is hold simple to focus on writing and reading texts. I do not follow any commercial purposes with this app.</p>

            <br></br>
            
            <p>Its a demoversion for a free online text editor for writing texts/dialogues in form of a chat. I always wanted to write down my own philosophical ideas, 
                but couldn't find the right way to bring them on paper. Finally in 2019 I thought about writing in form of dialogues to express my thoughts. 
                So I decided to create my own online text editor. At first I only wanted to use this editor on my own, but during the processing of learning more about web developing 
                I decided to open up this app to anyone else who like to write diaologues in the same style.
            </p>
                
            <br></br>
            
        </div>
            <br></br>
      </Panel>       
    )
}
