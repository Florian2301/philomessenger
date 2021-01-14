import React, { useRef, useState } from 'react'
import { Form, Alert, Col, Row } from 'react-bootstrap'
import { useAuth } from './AuthContext'
import { Link, useHistory } from 'react-router-dom'
import Panel from '../elements/Panel'
import Button from '../elements/Button'
import { connect } from 'react-redux'
import { deleteUserDB, updateUserDB, cancel, getUser } from '../redux/actions/user'


export function UpdateProfile(props) {
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updateEmail, updatePassword, deleteUser, updateUsername } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    
    // check if username or useremail already exist in database
    let checkName
    let checkMail

    function inputName(e) {
        checkName = e.target.value
        return checkName
    }

    function inputMail(e) {
        checkMail = e.target.value
        return checkMail
    }

    // submit data to update profile in firebase + database
    function handleSubmit(e) {
        e.preventDefault()
        
        let inputUsername = usernameRef.current.value
        props.user.allUsers.map(({username}) => {               // get username from all users in database
            if(username === checkName) {                        // check if username already exists
                inputUsername = false
                return inputUsername
            }
            return inputUsername
        })
        if (!inputUsername && inputUsername !== '') { 
            return setError(checkName + ' does already exist') 
        }

        let inputEmail = emailRef.current.value
        props.user.allUsers.map(({email}) => {                  // get useremail from all users in database
            if(email === checkMail) {                           // check if useremail already exists
                inputEmail = false
                return inputEmail
            }
            return inputEmail
        })
        if (!inputEmail && inputEmail !== '') { 
            return setError(checkMail + ' does already exist') 
        }

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {   // check if passwords match
            return setError('Passwords do not match')
        }

        if(!error) {                                                            // check if error is set by check username/email
            const {userId} = props.user                                         // get current user-id from database
            const promises = []
            setLoading(true)
            setError('')

            if (inputUsername && (inputUsername !== currentUser.displayName)) {
                props.updateUserDB(userId, inputUsername, currentUser.email)              // currentUser.email from Firebase
                promises.push(updateUsername(inputUsername))
            }
            if (inputEmail && (inputEmail !== currentUser.email)) {
                props.updateUserDB(userId, currentUser.displayName, inputEmail)           // currentUser.displayName from Firebase
                promises.push(updateEmail(inputEmail))
            }
            if (passwordRef.current.value && (passwordRef.current.value !== currentUser.password)) { // currentUser.password from Firebase
                promises.push(updatePassword(passwordRef.current.value))
            }

            if(currentUser.email !== "philomessenger@gmail.com") {                        // checl if "testuser" is trying to update profile
                Promise.all(promises).then(() => {
                    history.push('/')
                }).catch(() => {
                    setError('Failed to update account')
                }).finally(() => {
                    setLoading(false)
                })
            } else {
                setError('Its not allowed to update this profile')
            }
        } else {
            return
        } 
    }

    function deleteProfile() {
        if(currentUser.email !== "philomessenger@gmail.com") {
        deleteUser(currentUser)                                                         // delete user from firebase
        const currentUserId = props.user.userId                                         // get current user-id from database
        props.deleteUserDB(currentUserId)                                               // delete user from database
        history.push('/login')
        } else {
            setError('Its not allowed to delete this profile')
        }
    }

    function cancel() {
        props.cancel()  // makes sure, alerts are turned off
    }

// --------------------------- RETURN ----------------------------------------------------------------------
    
    return (
        <Panel id="auth" title="Update your profile">
            <div className="text-center mb-4">
                {error && <Alert className="auth-alert" variant="danger">{error}</Alert>}
            </div>
            
            <Form onSubmit={handleSubmit}>
                <Form.Group id="username" as={Row}>
                    <Form.Label id="auth-username">Username:</Form.Label>
                    <Col>
                        <Form.Control id="auth-input" type="text" ref={usernameRef} autoFocus onChange={inputName} placeholder="New username"/>
                    </Col>
                </Form.Group>
                
                <Form.Group id="email" as={Row}>
                    <Form.Label id="auth-email">Email:</Form.Label>
                    <Col>
                        <Form.Control id="auth-input" type="email" ref={emailRef} onChange={inputMail} placeholder="New email address"/>
                    </Col>
                </Form.Group>
                
                <Form.Group id="password" as={Row}>
                    <Form.Label id="auth-password">Password:</Form.Label>
                    <Col>
                        <Form.Control id="auth-input" type="password" ref={passwordRef} placeholder="New password"/>
                    </Col>
                </Form.Group>
                
                <Form.Group id="password-confirm" as={Row}>
                    <Form.Label id="auth-password-confirm">Confirm:</Form.Label>
                    <Col>
                        <Form.Control id="auth-input" type="password" ref={passwordConfirmRef} placeholder="Confirm new password"/>
                    </Col>
                </Form.Group>
                
                <div className="auth-actions">
                    <Button disabled={loading} label="Update Profile" className="auth-btn" type="submit"></Button>
                    <Button disabled={loading} label="Delete Profile" className="auth-btn" handleClick={deleteProfile}></Button>
                </div>
                
                <div className="auth-actions" id="cancel">
                    <Link className="auth-link" id="auth-link" to="/" onClick={cancel}>Cancel</Link>
                </div>
            </Form>
        </Panel>
    )
}

// -------------------  Redux -----------------------------------------------------------------------------------------

const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = {
    updateUserDB: updateUserDB,
    deleteUserDB: deleteUserDB,
    cancel: cancel,
    getUser: getUser
}

export default connect(mapStateToProps, mapActionsToProps)(UpdateProfile)
