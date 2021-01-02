import React, { useRef, useState } from 'react'
import { Form, Alert, Col, Row } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import Panel from '../../elements/Panel'
import Button from '../../elements/Button'
import './Publish.css'
import { connect } from 'react-redux'
import { saveTitle, updateTitle, saveUserTitle, updateUserTitle } from '../../redux/actions/title'
import { getChatById, getOneUserChatById, saveChat, updateChatDetails, getAllChats, saveUserChat, getAllUserChatsById, updateUserChat } from '../../redux/actions/chat'
import { clearDisplay } from '../../redux/actions/user'



export function Publish(props) {
    const numberRef = useRef()
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
            const titleId = props.title.titleId
            const chatId = props.chat.chatId
            const userId = props.user.userId
            const user = props.user.username
            const chatnumber = parseInt(numberRef.current.value) 
            const title = titleRef.current.value
            const date = dateRef.current.value
            const tagsValue = tagsRef.current.value
            const tags = tagsValue.split(",")
            const description = descriptionRef.current.value
            const buttons = props.chat.buttons
            const messages = props.chat.messages

            if(!chatnumber) {return setError('Please insert a chatnumber')}
            if(!title) {return setError('Please insert a title')}
            if(!date) {return setError('Please insert a date')}
            
            if(!update) {
                if(admin) {
                    setSpinner(true)
                    props.saveTitle(userId, user, chatnumber, title, date, tags, description)
                    props.saveChat(userId, user, chatnumber, title, date, tags, description, buttons, messages)
                    setTimeout(() => {
                        props.getAllChats()
                        setSpinner(false)
                    }, 500)
                } else {
                    setSpinner(true)
                    props.saveUserTitle(userId, user, chatnumber, title, date, tags, description)
                    props.saveUserChat(userId, user, chatnumber, title, date, tags, description, buttons, messages)
                    setTimeout(() => {
                        props.getAllUserChatsById(userId)
                        setSpinner(false)
                    }, 500)
                }
            } else {
                if(admin) {
                    setSpinner(true)
                    props.updateTitle(titleId, chatnumber, title, date, tags, description)
                    props.updateChatDetails(chatId, chatnumber, title, date, tags, description)
                    setTimeout(() => {
                        props.getChatById(chatId)
                        setSpinner(false)
                    }, 500)
                } else {
                    setSpinner(true)
                    props.updateUserTitle(titleId, chatnumber, title, date, tags, description)
                    props.updateUserChat(chatId, chatnumber, title, date, tags, description)
                    setTimeout(() => {
                        props.getOneUserChatById(chatId)
                        setSpinner(false)
                    }, 500)
                }
            }
            setUpdate(false)
            setReset(false)
            setError("")
            e.target.reset()
        } else {
            props.clearDisplay()
            setUpdate(false)
            setReset(false)
            setError("")
            e.target.reset()
        }
    }

    
    return (
        <Panel id="publish-chat-panel" title="Publish your chat">
            <div className="text-center mb-4">
                {error && <Alert variant="danger">{error}</Alert>}
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group id="publish-chat" as={Row}>
                    <Form.Label id="publish-number">Chat-No:*</Form.Label>
                    <Col>
                        <Form.Control id="publish-input-number" type="text" ref={numberRef} autoFocus placeholder="0-99" defaultValue={props.chat.chatnumber}/>
                    </Col>
                </Form.Group>
                <Form.Group id="publish-chat" as={Row}>
                    <Form.Label id="publish-title">Title:*</Form.Label>
                    <Col>
                        <Form.Control id="publish-input-title" type="text" ref={titleRef} placeholder="Insert a title" defaultValue={props.chat.title}/>
                    </Col>
                </Form.Group>
               <Form.Group id="publish-chat" as={Row}>
                    <Form.Label id="publish-date">Date:*</Form.Label>
                    <Col>
                        <Form.Control id="publish-input-date" type="text" ref={dateRef} placeholder="YYYY-MM-DD" defaultValue={props.chat.date}/>
                    </Col>
                </Form.Group>
                <Form.Group id="publish-chat" as={Row}>
                    <Form.Label id="publish-tags">Tags: </Form.Label>
                     <Col>
                        <Form.Control id="publish-input-tags" type="text" ref={tagsRef} placeholder="E.g. philosophy, theory of mind etc." defaultValue={props.chat.tags}/>
                     </Col>
                </Form.Group>

                <Form.Group id="publish-chat" as={Row}>
                    <Form.Label id="publish-description">Description:</Form.Label>
                     <Col>
                        <Form.Control id="publish-input-description" type="text" as="textarea" ref={descriptionRef} placeholder="Give a brief summary or description of your chat" defaultValue={props.chat.description}/>
                     </Col>
                </Form.Group>
                <div id="message-publish-actions">
                    {spinner? <Spinner animation="border" role="status" ></Spinner> : null}
                </div>
                <div className="publish-actions">
                    <Button button={true} label="Publish chat" id="publish-btn" type="submit"></Button>
                    <Button button={true} label="Update chat" id="publish-btn" type="submit" handleClick={() => setUpdate(true)}></Button>
                    <Button button={true} label="Clear" id="publish-btn-reset" type="submit" handleClick={() => setReset(true)}></Button>
                </div>    
            </Form>
        </Panel>
    )
}


const mapStateToProps = state => ({
    title: state.title,
    chat: state.chat,
    user: state.user
})

const mapActionsToProps = {
    clearDisplay: clearDisplay,
    saveTitle: saveTitle,
    updateTitle: updateTitle,
    saveChat: saveChat,
    updateChatDetails: updateChatDetails,
    getAllChats: getAllChats,
    saveUserChat: saveUserChat,
    getAllUserChatsById: getAllUserChatsById,
    updateUserChat: updateUserChat,
    getChatById: getChatById,
    getOneUserChatById: getOneUserChatById,
    saveUserTitle: saveUserTitle,
    updateUserTitle: updateUserTitle
}

export default connect(mapStateToProps, mapActionsToProps)(Publish)
