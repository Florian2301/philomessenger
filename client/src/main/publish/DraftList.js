import React from 'react'
import { connect } from 'react-redux'
import './DraftList.css'
import Button from '../../elements/Button'
import Panel from '../../elements/Panel'
import { v4 as uuidv4 } from 'uuid';
import { getDrafts, getOneDraft, deleteDraft, getUserDrafts, getOneUserDraft, deleteUserDraft, publishAdminDraft, publishUserDraft } from '../../redux/actions/draft'
import {  clearDisplay, setKey } from '../../redux/actions/user'



export function DraftList (props) {
    
    function showAllDrafts() {
      const admin = props.user.admin
      const id = props.user.userId
      props.getUserDrafts(id)
      admin? props.getDrafts() : props.getUserDrafts(id)
    }

    // show one draft
    function showDraft(id) {
        props.clearDisplay()
        const admin = props.user.admin
        admin? props.getOneDraft(id) : props.getOneUserDraft(id)
        props.setKey("chat")  // for navigation of mobile version
    }

    // prepare draft for upload as draft, draft will be loaded in props.chat
    function prepareDraft(id) {
      props.clearDisplay()
      const admin = props.user.admin
      admin? props.publishAdminDraft(id) : props.publishUserDraft(id)
  }

    function deleteDraft(id) {
      const admin = props.user.admin
      if (admin) {
          props.deleteDraft(id)
          setTimeout(() => {
            props.getDrafts()
          }, 500)
      } else {
        props.deleteUserDraft(id)
        setTimeout(() => {
          props.getUserDrafts(id)
        }, 500)
      } 
    }

  
// -------------------- return --------------------------------------------------
    
    return (
      <Panel title="Prepare drafts to publish" id="panel-drafts">
        <section className="flexContainer-draftlist-publish">
        <Button
              button="true"
              className="publish-draft"
              id="draft"
              label="Get drafts"
              handleClick={showAllDrafts}
          ></Button>
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
    deleteDraft: deleteDraft,
    clearDisplay: clearDisplay,
    getUserDrafts: getUserDrafts,
    getOneUserDraft: getOneUserDraft,
    deleteUserDraft: deleteUserDraft,
    publishUserDraft: publishUserDraft,
    publishAdminDraft: publishAdminDraft,
    setKey: setKey
  }
  
  let PublishDrafts = connect(mapStateToProps, mapDispatchToProps)(DraftList)
  
  export default PublishDrafts