import React, { useRef, useState } from 'react'
import { Form, Alert, Col, Row } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';
import Panel from '../../elements/Panel'
import Button from '../../elements/Button'
import './SaveDraft.css'
import { connect } from 'react-redux'
import { startChat, removeName, saveDraft, saveUserDraft, getDrafts, getUserDrafts, updateDraft, updateUserDraft } from '../../redux/actions/draft'
import { clearDisplay } from '../../redux/actions/user'



export function SaveDraft(props) {
    const titleRef = useRef()
    const dateRef = useRef()
    const tagsRef = useRef()
    const descriptionRef = useRef()
    const [error, setError] = useState('')
    const [update, setUpdate] = useState(false)
    const [reset, setReset] = useState(false) 
    const [message, setMessage] = useState("")
    
    
    function handleSubmit(e) {
        e.preventDefault()

        if (!reset) {
            const admin = props.user.admin
            const draftId = props.draft.draftId
            const userId = props.user.userId
            const user = props.user.username
            const title = titleRef.current.value
            const date = dateRef.current.value
            const tagsValue = tagsRef.current.value
            let tags = tagsValue.split(",")
            const description = descriptionRef.current.value
            const buttons = props.draft.buttons
            const messages = props.draft.messages

            if(!title) {return setError('Please insert a title')}
            if(!buttons) {return setError('Please add at least one name')}

            if(!update) {           // if draft will be updated
                if(admin) {
                    setMessage("save draft...")
                    props.saveDraft(userId, user, title, date, tags, description, buttons, messages)
                    setTimeout(() => {
                        props.getDrafts()
                    }, 500)
                    setTimeout(() => {
                        setMessage("")
                    }, 2000)
                } else {
                    setMessage("save draft...")
                    props.saveUserDraft(userId, user, title, date, tags, description, buttons, messages)
                    setTimeout(() => {
                        props.getUserDrafts(userId)
                    }, 500)
                    setTimeout(() => {
                        setMessage("")
                    }, 2000)
                }
            } else {                // else create a new draft
                if(admin) {
                    setMessage("update draft...")
                    props.updateDraft(draftId, title, date, tags, description, buttons, messages)
                    setTimeout(() => {
                        props.getDrafts()
                    }, 500)
                    setTimeout(() => {
                        setMessage("")
                    }, 2000)
                } else {
                    setMessage("update draft...")
                    props.updateUserDraft(draftId, title, date, tags, description, buttons, messages)
                    setTimeout(() => {
                        props.getUserDrafts(userId)
                    }, 500)
                    setTimeout(() => {
                        setMessage("")
                    }, 2000)
                }
            }
            setUpdate(false)
            setReset(false)
            setError("")
            e.target.reset()
        } else {                    // clear button
            props.clearDisplay()
            setUpdate(false)
            setReset(false)
            setError("")
            e.target.reset()
        }
    }

    function removeName(name) {
        props.removeName(name)
    }

    
    return (
        <Panel id="saveDraft" title="Save your chat as draft">
            <div className="text-center mb-4">
                {error && <Alert variant="danger">{error}</Alert>}
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group id="save-draft" as={Row}>
                    <Form.Label id="save-title">Title:*</Form.Label>
                    <Col>
                        <Form.Control id="save-input-title" type="name" ref={titleRef} autoFocus placeholder="Choose a title for your chat" defaultValue={props.draft.title}/>
                    </Col>
                </Form.Group>
                {props.draft.buttons.map((button) => {
                    return (
                    <Form.Group id="save-draft" as={Row} key={uuidv4()}>
                        <Form.Label id="save-name">Name:*</Form.Label>
                        <Col>
                            <Form.Control id="save-input-name" type="name" defaultValue={button.name}/>
                        </Col>
                        <p id="remove-name-link" onClick={() => removeName(button)}>remove</p>
                    </Form.Group>
                    )
                })}
                <Form.Group id="save-draft" as={Row}>
                    <Form.Label id="save-date">Date:</Form.Label>
                    <Col>
                        <Form.Control id="save-input-date" type="text" ref={dateRef} placeholder="YYYY-MM-DD" defaultValue={props.draft.date}/>
                    </Col>
                </Form.Group>
                <Form.Group id="save-draft" as={Row}>
                    <Form.Label id="save-tags">Tags: </Form.Label>
                     <Col>
                        <Form.Control id="save-input-tags" type="text" ref={tagsRef} placeholder="E.g. philosophy, theory of mind etc." defaultValue={props.draft.tags}/>
                     </Col>
                </Form.Group>

                <Form.Group id="save-draft" as={Row}>
                    <Form.Label id="save-description">Description:</Form.Label>
                     <Col>
                        <Form.Control id="save-input-description" type="text" as="textarea" ref={descriptionRef} placeholder="Give a brief summary or description of your chat" defaultValue={props.draft.description}/>
                     </Col>
                </Form.Group>
                <div id="message-actions">
                    {message? message : null}
                </div>
                <div className="save-actions">
                    <Button button={true} label="Save as new draft" id="save-btn" type="submit"></Button>
                    <Button button={true} label="Update draft" id="save-btn" type="submit" handleClick={() => setUpdate(true)}></Button>
                    <Button button={true} label="Clear" id="save-btn-reset" type="submit" handleClick={() => setReset(true)}></Button>
                </div>    

            </Form>

        </Panel>
    )
}


const mapStateToProps = state => ({
    draft: state.draft,
    user: state.user
})

const mapActionsToProps = {
    saveDraft: saveDraft,
    saveUserDraft: saveUserDraft,
    startChat: startChat,
    removeName: removeName,
    clearDisplay: clearDisplay,
    getDrafts: getDrafts,
    getUserDrafts: getUserDrafts,
    updateDraft: updateDraft,
    updateUserDraft: updateUserDraft
}

export default connect(mapStateToProps, mapActionsToProps)(SaveDraft)
