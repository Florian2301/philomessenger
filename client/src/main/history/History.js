import React, { Component } from 'react'
import './History.css'
import { connect } from 'react-redux'
import PDF from '../../elements/PDF'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { v4 as uuidv4 } from 'uuid';
import { clearDisplay, setKey } from '../../redux/actions/user'
import { getChat } from '../../redux/actions/chat'
import { getAllTitle, getTitle } from '../../redux/actions/title'
import Popover from './Popover'


class History extends Component {
  
  componentDidMount = () => {
    const admin = true
    this.props.getAllTitle(admin)
  }

  displayChat = (id, chatnumber, userId) => {
    const admin = true
    this.props.clearDisplay()
    this.props.getTitle(id, admin)
    this.props.getChat(chatnumber, userId, admin)
    this.props.setKey("chat")       // for navigation of mobile version
  }


//--------------------- render -----------------------------------------------------------
  render() {
    const { adminTitle } = this.props.title
    return (
      <div className="table-history">
            <div className="data-columns-history">
              <div className="thead-history-1">
                No.
              </div>
              <div className="thead-history-2">
                Title
              </div>
              <div className="thead-history-3">
                Date
              </div>
            </div>           
            {adminTitle.map(({_id, userId, title, chatnumber, date, user, tags, description}) => {
                return (
                  <div key={uuidv4()} className="data-rows-history">
                    <div className="history-column-1">{chatnumber}</div>
                    <div className="history-column-2" onClick={() => this.displayChat(_id, chatnumber, userId)}>
                      <Popover title={title} tags={tags} description={description}/>
                    </div>
                    <div className="history-column-3" >
                      {chatnumber === this.props.chat.chatnumber && user === this.props.chat.user && !this.props.user.loggedIn? 
                        <PDFDownloadLink
                          document={
                            <PDF title={title} data={this.props.chat.messages} />
                          }
                          fileName={chatnumber + ". " + title + '.pdf'}
                          className="link-download-dbChat"
                         >
                         download
                        </PDFDownloadLink>
                    : date }
                    </div>
                  </div>
            )})}
      </div>
    )
  }
}


// ------------------------ redux -----------------------------------------------------------------

let mapStateToProps = (state) => {
  return {
    title: state.title,
    chat: state.chat,
    user: state.user
  }
}

let mapDispatchToProps = {
  clearDisplay: clearDisplay,
  getAllTitle: getAllTitle,
  getTitle: getTitle,
  getChat: getChat,
  setKey: setKey,
}

let HistoryDB = connect(mapStateToProps, mapDispatchToProps)(History)

export default HistoryDB
