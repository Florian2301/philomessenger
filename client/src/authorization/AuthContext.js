import React, { useContext, useState, useEffect } from 'react'
import { auth } from './firebase'


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    
    function errorHandling(error) {
        console.log("error", error.message)
    }

    function signup(username, email, password) {
       return auth.createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    user = auth.currentUser            
                    user.updateProfile({
                        displayName: username
                    })
                    .then(console.log("user signed up"))
                    .catch((error) => errorHandling(error))
                    user.sendEmailVerification().then(() => auth.signOut())  
                })
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
                .then(console.log("user logged in"))
                .catch((error) => errorHandling(error))
     }

    function logout() {
       return auth.signOut()
                .then(console.log("user logged out"))
                .catch((error) => errorHandling(error))
    }

    function resetPassword(email) {
       return auth.sendPasswordResetEmail(email)
                .then(console.log("email sent"))
                .catch((error) => console.log("error", error.message))
    }

    function updateUsername(username) {
        let user = auth.currentUser
        return user.updateProfile({
                displayName: username
                })
                .then(console.log("username updated"))
                .catch((error) => errorHandling(error))
    }

    function updateEmail(email) {
        let user = auth.currentUser
        return user.updateEmail(email)
                .then(console.log("email updated"))
                .catch((error) => errorHandling(error))   
     }

     function updatePassword(password) {
        return currentUser.updatePassword(password)
                .then(console.log("password updated"))
                .catch((error) => errorHandling(error))
     }

     function deleteUser(currentUser) {
         return currentUser.delete()
                .then(console.log("user deleted"))
                .catch((error) => errorHandling(error))
     }

    useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])
    

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        deleteUser,
        updateUsername
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
