import React from 'react'
import { connect } from 'react-redux'
import './Title.css'


export function Title (props) {
  return (
     <div>
       <div id="title-header">
         <h2 id="chat-title">
          	<span id="span-number">
             <strong>No.: </strong>
            </span>
            <span id="span-props-number">
            {props.chat.chatEditmode? props.chat.chatnumber : null}
            </span>
            <span id="span-title">
             <strong>Title: </strong>
            </span>
            <span id="span-props-title">
            {props.draft.draftEditmode? props.draft.title : null}
            {props.chat.chatEditmode? props.chat.title : null}
            </span>
            <span id="span-date">
             <strong>Date: </strong>
            </span>
            <span id="span-props-date">
            {props.draft.draftEditmode? props.draft.date : null}
            {props.chat.chatEditmode? props.chat.date : null}
            </span>

         </h2>
       </div>
     </div>
  )
  
}

// ------------- REDUX -----------------------------------------------

let mapStateToProps = (state) => {
  return {
    draft: state.draft,
    chat: state.chat,
  }
}

let mapDispatchToProps = {}

let TitleContainer = connect(mapStateToProps, mapDispatchToProps)(Title)

export default TitleContainer
