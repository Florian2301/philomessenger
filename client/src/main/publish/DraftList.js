import React, { useState } from 'react'
import { connect } from 'react-redux'
import './DraftList.css'
import Button from '../../elements/Button'
import Panel from '../../elements/Panel'
import { v4 as uuidv4 } from 'uuid'
import { Spinner } from 'react-bootstrap'
import { getDrafts, getOneDraft, deleteDraft, prepareUploadDraft } from '../../redux/actions/draft'
import {  clearDisplay, setKey } from '../../redux/actions/user'



export function DraftList (props) {
    const [spinner, setSpinner] = useState(false)
    
    function showAllDrafts() {
      setSpinner(true)
      const admin = props.user.admin
      const userId = props.user.userId
      props.getDrafts(userId, admin)
      setTimeout(() => {
        setSpinner(false)
      }, 500)           
    }

    // show one draft
    function showDraft(id) {
      setSpinner(true)
      props.clearDisplay()
      props.setKey("chat")  // for navigation of mobile version
      const admin = props.user.admin
      props.getOneDraft(id, admin)
      setTimeout(() => {
        setSpinner(false)
      }, 500)           
    }

    // prepare draft for upload as draft, draft will be loaded in props.chat
    function prepareDraft(id) {
      setSpinner(true)
      props.clearDisplay()
      const admin = props.user.admin
      props.prepareUploadDraft(id, admin)
      setTimeout(() => {
        setSpinner(false)
      }, 500)      
  }

    function deleteDraft(id) {
      const admin = props.user.admin
      const userId = props.user.userId
      props.deleteDraft(id, admin)
      setTimeout(() => {
        props.getDrafts(userId, admin)
      }, 500)
    }

  
// -------------------- return --------------------------------------------------
    
    return (
      <Panel title="Prepare drafts to publish" id="panel-drafts">
        <section className="flexContainer-draftlist-publish">
        <Button
              className="publish-draft"
              id="draft"
              label="Show drafts"
              handleClick={showAllDrafts}
        ></Button>
        <div id="spinner-draftlist">
          {!spinner? null : <Spinner animation="border" role="status" ></Spinner>}
        </div>
        </section>
        <div className="publish-table-drafts" >
            {!props.user.admin? props.draft.userDrafts.map(({_id, title}) => {
              return (
                <div key={uuidv4()} className="publish-data-rows-drafts">
                  <div className="publish-drafts-column-1" onClick={() => showDraft(_id)}>{title}</div>
                  <div className="publish-drafts-column-2" onClick={() => prepareDraft(_id)}>Prepare for upload</div> 
                  <div className="publish-drafts-column-3" onClick={() => deleteDraft(_id)}>delete</div>    
                </div>
              )})
              :
              props.draft.adminDrafts.map(({_id, title}) => {
                return (
                  <div key={uuidv4()} className="publish-data-rows-drafts">
                    <div className="publish-drafts-column-1" onClick={() => showDraft(_id)}>{title}</div>
                    <div className="publish-drafts-column-2" onClick={() => prepareDraft(_id)}>Prepare for upload</div>
                    <div className="publish-drafts-column-3" onClick={() => deleteDraft(_id)}>delete</div>    
                  </div>
                )})
              }
        </div>
    </Panel>       
    )
    
}

//------------------------- redux -------------------------------------------

let mapStateToProps = (state) => {
    return {
      draft: state.draft,
      user: state.user,
      chat: state.chat,
    }
  }
  
  let mapDispatchToProps = {
    getDrafts: getDrafts,
    getOneDraft: getOneDraft,
    prepareUploadDraft: prepareUploadDraft,
    deleteDraft: deleteDraft,
    clearDisplay: clearDisplay,
    setKey: setKey
  }
  
  let PublishDrafts = connect(mapStateToProps, mapDispatchToProps)(DraftList)
  
  export default PublishDrafts
