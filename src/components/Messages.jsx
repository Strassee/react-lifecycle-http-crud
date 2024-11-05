import Message from './Message';

function Messages({messages, handleDel}) {

  let result = messages.map((message) => (
    <Message message={message} handleDel={handleDel} key={message.id}/>
  ));

  return (
    <div className="data_block">
      {result}
    </div>
  )
}
export default Messages;
