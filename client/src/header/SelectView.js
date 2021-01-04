import React from 'react'
import './SelectView.css'
import { Form, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { changeModus } from '../redux/actions/user'


export function SelectView(props) {
    
    function handleChange(e) {
        const modus = e.currentTarget.id
        props.changeModus(modus)
        if(modus === "auto") {props.auto()}
        if(modus === "desktop") {props.desktop()} 
        if(modus === "tablet") {props.tablet()} 
        if(modus === "mobile") {props.mobile()} 
    }
    

    return (
        <Form as={Row} id={props.id}>
            <div id="size">
                <Form.Check type="radio" id="auto" name="modi" label="Auto" onChange={(e) => handleChange(e)} checked={props.user.modus === "auto"? true : false} />
            </div>
            <div id="size">
                <Form.Check type="radio" id="desktop" name="modi" label="Desktop" onChange={(e) => handleChange(e)} checked={props.user.modus === "desktop"? true : false} />
            </div>
            <div id="size">
                <Form.Check type="radio" id="tablet" name="modi" label="Tablet" onChange={(e) => handleChange(e)} checked={props.user.modus === "tablet"? true : false} />
            </div>
            <div id="size">
                <Form.Check type="radio" id="mobile" name="modi" label="Mobile" onChange={(e) => handleChange(e)} checked={props.user.modus === "mobile"? true : false} />
            </div>
      </Form>
    )
}

// ------------------------------------ REDUX ---------------------------------------------

const mapStateToProps = state => ({
    user: state.user,
  })
  
  const mapActionsToProps = {
    changeModus: changeModus
  }
  
  export default connect(mapStateToProps, mapActionsToProps)(SelectView)