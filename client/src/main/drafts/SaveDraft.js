import React, { useRef, useState } from 'react'
import { Form, Alert, Col, Row, Spinner } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';
import Panel from '../../elements/Panel'
import Button from '../../elements/Button'
import './SaveDraft.css'
import { connect } from 'react-redux'
import { startChat, removeName, saveDraft, getDrafts, updateDraft } from '../../redux/actions/draft'
import { clearDisplay } from '../../redux/actions/user'



export function SaveDraft(props) {
    const titleRef = useRef()
    const dateRef = useRef()
    const tagsRef = useRef()
    const descriptionRef = useRef()
    const [error, setError] = useState('')
    const [update, setUpdate] = useState(false)
    const [reset, setReset] = useState(false)
    const [spinner, setSpinner] = useState(false)

    
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
            const philosopher = props.draft.philosopher
            const messages = props.draft.messages

            if(!title) {return setError('Please insert a title')}
            if(!philosopher) {return setError('Please add at least one name')}

            if(!update) {           // if draft will be updated
                props.saveDraft(userId, user, title, date, tags, description, philosopher, messages, admin)
            } else {                // else create a new draft
                props.updateDraft(draftId, title, date, tags, description, philosopher, messages, admin)
            }
            setSpinner(true)
            setTimeout(() => {
                props.getDrafts(userId, admin)
                setSpinner(false)
            }, 500)
            
        } else {  // clear button
            props.clearDisplay()
        }
        setUpdate(false)
        setReset(false)
        setError("")
        e.target.reset()
    }

    function removeName(name) {
        props.removeName(name)
    }

// ----------------------------------- RETURN --------------------------------------------------------------------------

    return (
        <Panel id="saveDraft" title="Start a new chat">
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
                
                {props.draft.philosopher.map((phil) => {
                    return (
                    <Form.Group id="save-draft" as={Row} key={uuidv4()}>
                        <Form.Label id="save-name">Name:*</Form.Label>
                        <Col>
                            <Form.Control id="save-input-name" type="name" defaultValue={phil.name}/>
                        </Col>
                        <p id="remove-name-link" onClick={() => removeName(phil)}>remove</p>
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
                    {spinner? <Spinner animation="border" role="status" ></Spinner> : null}
                </div>
                
                <div className="save-actions">
                    <Button label="New chat" id="save-btn" type="submit"></Button>
                    <Button label="Save changes" id="save-btn" type="submit" handleClick={() => setUpdate(true)}></Button>
                    <Button label="Clear" id="save-btn-reset" type="submit" handleClick={() => setReset(true)}></Button>
                </div>    

            </Form>

        </Panel>
    )
}

//--------------------------------------- REDUX ------------------------------------------------------

const mapStateToProps = state => ({
    draft: state.draft,
    user: state.user
})

const mapActionsToProps = {
    clearDisplay: clearDisplay,
    saveDraft: saveDraft,
    startChat: startChat,
    removeName: removeName,
    getDrafts: getDrafts,
    updateDraft: updateDraft,
}

export default connect(mapStateToProps, mapActionsToProps)(SaveDraft)
