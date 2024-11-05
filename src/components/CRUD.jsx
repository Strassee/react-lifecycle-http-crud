import React, { useEffect, useState } from 'react';
import Messages from './Messages';


function Crud() {
  const url = 'http://localhost:7070/notes';
  const[updated,setUpdated]=useState(false);
  const[message,setMessage]=useState({
    id: 0,
    content: ''
  });
  const[messages,setMessages]=useState({});
  const[result,setResult]=useState('');

  const handleState = (e) => {
    const {value} = e.target;
    setMessage((prevData) => ({...prevData, content: value}));
  }

  const handleDel = (e, iddel) => {
    fetch(`${url}/${iddel}`, { method: 'DELETE' })
    .then(() => setUpdated(new Date().getTime()))
    .then(() => setResult('Сообщение удалено'));
  }
  
  const loadData = () => {
    fetch(url)
    .then(response => response.json())
    .then(json => setMessages(json))
  }

  const sendData = () => {
    if (message.content !== '') {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(message)
      })
      .then(() => setMessage((prevData) => ({...prevData, content: ''})))
      .then(() => setUpdated(() => new Date().getTime()))
      .then(() => setResult('Сообщение отправлено'));
    } else {
      setResult('Введите сообщение');
    }
  }

  const refreshClick = () => {
    setResult('');
    setUpdated(() => new Date().getTime());
  }

  useEffect(() => loadData, []);

  useEffect(() => {
    loadData();
  }, [updated]);

  const sendClick = (e) => {
    e.preventDefault();
    sendData();
  }
  
  return (
    <div className="">
      <div className='form'>
        <form className="formtext" onSubmit={sendClick}>
          <div className="input__box">
            <label className='labelInput' htmlFor="story">Введите сообщение</label>
            <textarea className='textarea' value={message.content} id="story" name="story" rows="5" cols="33" onInput={handleState}></textarea>
          </div>
          <button className='button but__refresh' type="button" onClick={refreshClick}>Refresh</button>
          <button className='button but__send' type="submit">Send</button>
          <span className='result'>{result}</span>
        </form>

      </div>
      <div className='data'>
        {Object.keys(messages).length !== 0? <Messages messages={messages} handleDel={handleDel} /> : ''}
      </div>
    </div>
  )
}

export default Crud;


