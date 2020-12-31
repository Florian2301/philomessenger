import React from 'react'

export default function Button (props) {
    if (props.button) {
      return (
        <button
          className={props.className}
          id={props.id}
          onClick={props.handleClick}
        >
          {props.label}
        </button>
      )
    } else {
      return null
    }
}

