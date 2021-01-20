import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import './AddName.css'
import { Form, Col, Row, Collapse } from 'react-bootstrap'
import Panel from '../../elements/Panel'
import { startChat } from '../../redux/actions/draft'
import { CSSTransition, TransitionGroup } from 'react-transition-group' //CSS in Chat.css
import { v4 as uuidv4 } from 'uuid'


export function AddName(props) {
    const nameRef = useRef()
    const [addName, setAddName] = useState('')
    const [info, setInfo] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()

        let names = props.draft.philosopher
        let newName = nameRef.current.value
        if(newName) {names.push({id: newName, name: newName})}  // if a new name is entered, push it to existing names
    
        props.startChat(names)                                  // send name to component "Drafts", not saved in database yet
        nameRef.current.value = ""

        setAddName(newName)                                     // short messages, name is added
        setTimeout(() => {
            setAddName("")
        }, 1000)
    }

 // -------------------- RETURN ----------------------------------------------------
    
    return (
        <Panel id="start" title="Add participants to your chat">
            <p className="info-link" onClick={() => setInfo(!info)} aria-controls="example-collapse-text" aria-expanded={info}>{!info? "click for more..." : "less info..."}</p>
            
            <TransitionGroup>
                <CSSTransition key={uuidv4()} timeout={100} classNames="transition-message">
                    <Collapse in={info}>
                        <div className="info-details" id="example-collapse-text">
                            <p className="info">1. Add participants to your chat</p>
                            <p className="info">2. Set a title for your chat</p>
                            <p className="info">3. Click "new chat" to start writing</p>
                            <p className="info">4. Click "save" or "save changes" when you finished writing</p>
                        </div>
                    </Collapse>
                </CSSTransition>
            </TransitionGroup>
            
            <Form onSubmit={handleSubmit}>
                <Form.Group id="startname" as={Row}>
                    <Form.Label id="start-name">Name:*</Form.Label>
                    <Col>
                        <Form.Control id="start-input" type="name" ref={nameRef} placeholder="Add participants"/>
                    </Col>
                    {addName && <p id="addname">{addName} added...</p>}
                </Form.Group>
            </Form>
        </Panel>
    )
}

// --------------------- REDUX -------------------------------------------------

const mapStateToProps = state => ({
    draft: state.draft,
})

const mapActionsToProps = {
    startChat: startChat
}

export default connect(mapStateToProps, mapActionsToProps)(AddName)

