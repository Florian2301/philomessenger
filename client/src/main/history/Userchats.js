import React, { Component } from 'react'
import './Userchats.css'
import { connect } from 'react-redux'
import PDF from '../../elements/PDF'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { v4 as uuidv4 } from 'uuid';
import { clearDisplay, setKey } from '../../redux/actions/user'
import { getAllUserChats, getOneUserChat } from '../../redux/actions/chat'
import { getAllUserTitle, getUserTitle } from '../../redux/actions/title'
import Popover from './Popover'


class Userchats extends Component {
  
  componentDidMount = () => {
    this.props.getAllUserTitle()
  }

  displayChat = (id, chatnumber, userId) => {
    this.props.clearDisplay()
    this.props.getUserTitle(id)
    this.props.getOneUserChat(chatnumber, userId)
    this.props.setKey("chat")             // for navigation of mobile version
  }

  //--------------------- render -----------------------------------------------------------
  render() {
    const { userTitle } = this.props.title
    return (
     
        <div className="table-userchats">
          <div className="data-columns-userchats">
              <div className="thead-userchats-1">
                User
              </div>
              <div className="thead-userchats-2">
                No.
              </div>
              <div className="thead-userchats-3">
                Title
              </div>
              <div className="thead-userchats-4">
                Date
              </div>
          </div>
          {userTitle? userTitle.map(({_id, userId, user, chatnumber, title, date, tags, description}) => {
                return (
                  <div key={uuidv4()} className="data-rows-userchats">
                    <div className="userchats-column-1">{user}</div>
                    <div className="userchats-column-2">{chatnumber}</div>
                    <div className="userchats-column-3" onClick={() => this.displayChat(_id, chatnumber, userId)}>
                      <Popover title={title} tags={tags} description={description}/>
                      </div>
                    <div className="userchats-column-4">
                      {chatnumber === this.props.chat.chatnumber && userId === this.props.chat.userId? 
                        <PDFDownloadLink
                          document={
                            <PDF title={title} data={this.props.chat.messages} />
                          }
                          fileName={title + '.pdf'}
                          className="link-download-userchat"
                         >
                         download
                        </PDFDownloadLink>
                      : date }
                    </div>     
                  </div>
            )}): this.props.getAllUserChats()}
        </div>
     
    )
  }
}

// ------------------------ redux -----------------------------------------------------------------

let mapStateToProps = (state) => {
  return {
    chat: state.chat,
    title: state.title
  }
}

let mapDispatchToProps = {
  clearDisplay: clearDisplay,
  getAllUserChats: getAllUserChats,
  getOneUserChat: getOneUserChat,
  getAllUserTitle: getAllUserTitle,
  getUserTitle: getUserTitle,
  setKey: setKey
}

let UserchatsTable = connect(mapStateToProps, mapDispatchToProps)(Userchats)

export default UserchatsTable
