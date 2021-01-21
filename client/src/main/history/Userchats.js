import React, { Component } from 'react'
import './Userchats.css'
import { connect } from 'react-redux'
import PDF from '../../elements/PDF'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { v4 as uuidv4 } from 'uuid';
import { clearDisplay, setKey } from '../../redux/actions/user'
import { getChat } from '../../redux/actions/chat'
import { getAllTitle, getTitle } from '../../redux/actions/title'
import Popover from './Popover'


class Userchats extends Component {
  
  componentDidMount = () => {
    const admin = false 
    this.props.getAllTitle(admin)
  }

  displayChat = (id, chatnumber, userId) => {
    const admin = false
    this.props.clearDisplay()
    this.props.getTitle(id, admin)
    this.props.getChat(chatnumber, userId, admin)
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
          {userTitle.map(({_id, userId, user, chatnumber, title, date, tags, description}) => {
                return (
                  <div key={uuidv4()} className="data-rows-userchats">
                    <div className="userchats-column-1">{user}</div>
                    <div className="userchats-column-2">{chatnumber}</div>
                    <div className="userchats-column-3" onClick={() => this.displayChat(_id, chatnumber, userId)}>
                    <Popover title={title} tags={tags} description={description}/>
                    </div>
                    <div className="userchats-column-4">
                      {chatnumber === this.props.chat.chatnumber && userId === this.props.chat.userId && !this.props.user.loggedIn? 
                        <PDFDownloadLink
                          document={
                            <PDF title={title} data={this.props.chat.messages} user={user} date={date}/>
                          }
                          fileName={chatnumber + ". " + title + '.pdf'}
                          className="link-download-userchat"
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
    chat: state.chat,
    title: state.title,
    user: state.user
  }
}

let mapDispatchToProps = {
  clearDisplay: clearDisplay,
  getChat: getChat,
  getAllTitle: getAllTitle,
  getTitle: getTitle,
  setKey: setKey
}

let UserchatsTable = connect(mapStateToProps, mapDispatchToProps)(Userchats)

export default UserchatsTable
