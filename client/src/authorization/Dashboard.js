import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from './AuthContext'
import { Link, useHistory } from 'react-router-dom'
import Panel from '../elements/Panel'
import Button from '../elements/Button'
import firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'
import { getUser, clearDisplay, logout } from '../redux/actions/user'


export function Dashboard(props) {
    const [error, setError] = useState('')
    const [welcome, setWelcome] = useState(true)
    const [updateProfile, setUpdateProfile] = useState(true)
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const update = "Your profile has been updated successfully"
    let welcomeMessage = ''
    
    // get all Users for further actions (when update Profile is clicked)
    function getUsers() {
        props.getUser()
    }

    // log out via firebase
    async function handleLogout() {
        setError('')
        try {
            await logout()
            history.push("/login")
        } catch {
            setError('Log out failed')
        }
        props.clearDisplay()
        props.logout()                                      // reset state.user
    }

    // get currentUser for welcome message
    var user = firebase.auth().currentUser;
    if (user) {
      welcomeMessage = "Welcome " + user.displayName + "!"
    } 

  
    // set welcome message and timout after 10 sec
    useEffect(() => {
        const timer = setTimeout(() => {
            setWelcome(false)
        }, 10000)
        return () => {
            clearTimeout(timer)
        }
    }, [])

    // set update message and timout after 10 sec
    useEffect(() => {
        const timer = setTimeout(() => {
            setUpdateProfile(false)
        }, 10000)
        return () => {
            clearTimeout(timer)
        }
    }, [])

// ----------------------------- RETURN ----------------------------------------------------------------------
    
    return (
        <Panel id="auth" title="Your profile">
            <div className="text-center mb-4">
                {error && <Alert variant="danger">{error}</Alert>}
                {welcome && props.user.welcome? <Alert variant="success">{welcomeMessage}</Alert> : null}
                {updateProfile && props.user.update? <Alert variant="success">{update}</Alert> : null}
            </div>
            
            <div className="auth-user">
                <strong id="auth-strong-username">User:</strong>{currentUser.displayName}
            </div>
            
            <div className="auth-user">
                <strong id="auth-strong-email">Email:</strong>{currentUser.email}
            </div>
            
            <div className="auth-actions" id="auth-actions-logout">
                <Button button={true} handleClick={handleLogout} className="auth-btn" label="Log out"></Button>
            </div>
            
            <div className="auth-actions" id="update-link">
                <Link to="/update-profile" className="auth-link" onClick={getUsers}>Update Profile</Link>
            </div>
        </Panel>
    )
}

// --------------------- Redux --------------------------------------------------------------

const mapStateToProps = state => ({
    user: state.user,
})

const mapActionsToProps = {
    getUser: getUser,
    clearDisplay: clearDisplay,
    logout: logout,
}

export default connect(mapStateToProps, mapActionsToProps)(Dashboard)

