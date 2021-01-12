import React, { useState } from 'react'
import { connect } from 'react-redux'
import './Drafts.css'
import Button from '../../elements/Button'
import Panel from '../../elements/Panel'
import { v4 as uuidv4 } from 'uuid'
import { Spinner } from 'react-bootstrap'
import PDF from '../../elements/PDF'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { getDrafts, getOneDraft, deleteDraft } from '../../redux/actions/draft'
import {  clearDisplay, setKey } from '../../redux/actions/user'



export function Drafts (props) {
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

    function showDraft(id) {
      setSpinner(true)
      props.clearDisplay()            // if draft will be displayed, window will be cleaned first
      props.setKey("chat")            // for mobile navigation
      const admin = props.user.admin
      props.getOneDraft(id, admin)
      setTimeout(() => {
        setSpinner(false)
      }, 500)           
    }

    function deleteDraft(id) {
      const admin = props.user.admin
      const userId = props.user.userId
      props.deleteDraft(id, admin)
      setTimeout(() => {          // get all drafts after one draft is deleted
        props.getDrafts(userId, admin)
      }, 500)
    }


// -------------------- return --------------------------------------------------
 
    return (
      <Panel title="Your saved drafts" id="panel-drafts">
        <section className="flexContainer-draftlist">
        <Button
              button="true"
              className="save-draft"
              id="draft"
              label="Show drafts"
              handleClick={showAllDrafts}
        ></Button>
        <div id="spinner-draft">
          {!spinner? null : <Spinner animation="border" role="status" ></Spinner>}
        </div>
        </section>
        
        <div className="table-drafts" >
            {!props.user.admin? props.draft.userDrafts.map(({_id, title, messages}) => {
              return (
                <div key={uuidv4()} className="data-rows-drafts">
                  <div className="drafts-column-1" onClick={() => showDraft(_id)}>{title}</div>
                  <div className="drafts-column-2" >
                      <PDFDownloadLink
                        document={
                          <PDF title={title} data={messages} />
                        }
                        fileName={title + '.pdf'}
                        className="link-download-draft"
                        id="link-download-draft"
                        >
                        {({ blob, url, loading, error }) =>
                          loading ? 'loading...' : 'download'
                        }
                      </PDFDownloadLink>
                    </div> 
                  <div className="drafts-column-3" onClick={() => deleteDraft(_id)}>delete</div>    
                </div>
              )})
              :
              props.draft.adminDrafts.map(({_id, title, messages}) => {
                return (
                  <div key={uuidv4()} className="data-rows-drafts">
                    <div className="drafts-column-1" onClick={() => showDraft(_id)}>{title}</div>
                    <div className="drafts-column-2" >
                        <PDFDownloadLink
                          document={
                            <PDF title={title} data={messages} />
                          }
                          fileName={title + '.pdf'}
                          className="link-download-draft"
                          id="link-download-draft"
                          >
                          {({ blob, url, loading, error }) =>
                          loading ? 'loading...' : 'download'
                          }
                        </PDFDownloadLink>
                      </div> 
                    <div className="drafts-column-3" onClick={() => deleteDraft(_id)}>delete</div>    
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
      user: state.user
    }
  }
  
  let mapDispatchToProps = {
    getDrafts: getDrafts,
    getOneDraft: getOneDraft,
    deleteDraft: deleteDraft,
    clearDisplay: clearDisplay,
    setKey: setKey
  }
  
  let ListOfNames = connect(mapStateToProps, mapDispatchToProps)(Drafts)
  
  export default ListOfNames
