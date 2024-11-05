import React from 'react';

class Message extends React.Component {
  constructor ({message, handleDel}) {
    super();
    this.id = message.id;
    this.content = message.content;
    this.handleDel = handleDel;
  }

  render() {
    
    return (
      <div className='message'>
        <button className="btn_close" onClick={(e) => this.handleDel(e, this.id)}>&#10007;</button>
        <span className=''>{this.content}</span>
      </div>
    );
  } 
}


export default Message;
