import React from 'react'

/**
 * textarea for writing the message in chat
 */
export default function Textarea (props) {
      return (
        <div >
          <p id="writer">{props.writer}</p>
        <textarea 
          className="textarea-chat"
          placeholder={props.placeholder}
          onChange={props.onChange}
          autoFocus
          onKeyDown={props.onKeyDown}
        ></textarea>
        </div>
      )
}
