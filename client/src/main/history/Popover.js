import React from 'react'
import './Popover.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

export default function PopoverHistory(props) {
    const title = props.title
    const tags = props.tags
    const description = props.description

    const popover = (
        <Popover id="popover-basic">
          {tags? <Popover.Title id="popover-title">{tags}</Popover.Title> : null}
          {description? <Popover.Content id="popover-content">{description}</Popover.Content> : null}
        </Popover> 
      )
      
      const InfoPopover = () => (
        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={popover}>
          <p>{title}</p>
        </OverlayTrigger>
      )

    return (
        <div>
            <InfoPopover/>
        </div>
    )
}
