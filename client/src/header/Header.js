import React from 'react'
import './Header.css'

/**
 * flex keeps it in center
 * -> span for colored underline
 */
export default function Header (props) {
  return (
    <section className="flexContainer-header" id="header">
      
      <div className="flexItem-header">
       
      </div>
      <div className="flexItem-header">
      <h1 id="h1-header"><span id="span-1">The Messen</span>g<span id="span-2">er</span></h1>
      </div>
      <div className="flexItem-header">
      </div>
    </section>
  )
}


