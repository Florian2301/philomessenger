import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import './Name.css'
import { Form, Col, Row } from 'react-bootstrap'
import Panel from '../../elements/Panel'
import { startChat } from '../../redux/actions/draft'


export function Name(props) {
    const nameRef = useRef()
    const [addName, setAddName] = useState('')

    function handleSubmit(e) {
        e.preventDefault()

        let names = props.draft.buttons
        let newName = nameRef.current.value
        if(newName) {names.push({id: newName, name: newName})}  // if a new name is entered, push it to existing names
    
        props.startChat(names)                                  // send name to component "Drafts", not saved in database yet
        nameRef.current.value = ""

        setAddName(newName)                                     // short messages, name is added
        setTimeout(() => {
            setAddName("")
        }, 1000)
    }

    
    return (
        <Panel id="start" title="Add names to your chat">
            <Form onSubmit={handleSubmit}>
                <Form.Group id="startname" as={Row}>
                    <Form.Label id="start-name">Name:*</Form.Label>
                    <Col>
                        <Form.Control id="start-input" type="name" ref={nameRef} placeholder="Add a name"/>
                    </Col>
                    {addName && <p id="addname">{addName} added...</p>}
                </Form.Group>
            </Form>
           
        </Panel>
    )
}


const mapStateToProps = state => ({
    draft: state.draft,
})

const mapActionsToProps = {
    startChat: startChat
}

export default connect(mapStateToProps, mapActionsToProps)(Name)

