import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import { useSocketContext } from '../../context/SocketContext';
import useListenMessages from '../../hooks/useListenMessages';
import useSendMessage from '../../hooks/useSendMessage';
import { useRef } from 'react';
export const Messagebox = () => {
  const { sendMessage } = useSendMessage();
  const { messages } = useListenMessages();
  console.log(messages);

  const [message, setMessage] = useState("");
  const userdata = useSelector((state) => state.messageslice.selectedConversation);
  const [Authuser, setAuthuser] = useState('');

  // const { onlineUsers } = useSocketContext();
  const onlineUsers = useSelector((state) => state.socketSlice.OnlineUsers);

  const lastMessageRef = useRef();
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollTop = lastMessageRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async () => {
    await sendMessage(message);
    setMessage('');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setAuthuser(user);
  }, []);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    const timeString = date.toLocaleTimeString('en-US', options);
    const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${timeString} | ${dateString}`;
  };

  return (
    <>
      <div className="">
        <Container>
          <Row className="w-100">
            <Col>
              <div className="d-flex align-items-center">
                <img
                  src={userdata.url}
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%", borderRadius: '20%' }}
                />
                <div>
                  <span className="fs-5 ps-3 fw-bold">{userdata.name}</span>
                  <div className=" ps-3 ">   {(onlineUsers && onlineUsers.includes(userdata._id)) ? 'online' : 'offline'}</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div
        style={{ height: '400px', overflowY: 'scroll', position: "relative", height: "400px" }}
        ref={lastMessageRef}
        className="pt-3 pe-4 ps-2 "
      >

        {
          messages && messages.length > 0 ? (
            messages.map((chatItem) => {
              if (chatItem.receiverId !== Authuser._id) {
                return (
                  <div key={chatItem.id} className="d-flex flex-row justify-content-end">
                  <div>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      {chatItem.message}
                    </p>
                    <p className="small me-3 mb-3 rounded-3 text-muted">
                      {formatDateTime(chatItem.createdAt)}
                    </p>
                  </div>
                  <img
                    src={Authuser.url}
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%", borderRadius: '50%' }}
                  />
                </div>
                );
              } else if (chatItem.senderId === userdata._id) {
              // } else if (chatItem.receiverId === userdata._id) {
                return (
                  <div key={chatItem.id} className="d-flex flex-row justify-content-start">
                 
                  <img
                    src={userdata.url}
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%", borderRadius: '50%' }}
                  />
                  <div>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      {chatItem.message}
                    </p>
                    <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                      {formatDateTime(chatItem.createdAt)}
                    </p>
                  </div>
                </div>
                );
              } else {
                return null; 
              }
            })
          ) : (
            ""
          )}

          
        {/* {
          messages && messages.length > 0 ? (
            messages.map((chatItem) => (
              chatItem.receiverId != Authuser._id ? 
              
              (
                <div key={chatItem.id} className="d-flex flex-row justify-content-end">
                  <div>
                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                      {chatItem.message}
                    </p>
                    <p className="small me-3 mb-3 rounded-3 text-muted">
                      {formatDateTime(chatItem.createdAt)}
                    </p>
                  </div>
                  <img
                    src={Authuser.url}
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%", borderRadius: '50%' }}
                  />
                </div>
              ) : (
             
                <div key={chatItem.id} className="d-flex flex-row justify-content-start">
                  "jjjjjjjjjjjjjjjjjjjj"
                  <img
                    src={userdata.url}
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%", borderRadius: '50%' }}
                  />
                  <div>
                    <p
                      className="small p-2 ms-3 mb-1 rounded-3"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      {chatItem.message}
                    </p>
                    <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                      {formatDateTime(chatItem.createdAt)}
                    </p>
                  </div>
                </div>
              )
            ))
          ) : (
            "send messages to start the conversation"
          )
        } */}
      </div>

      <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
        <img
          src={Authuser.url}
          alt="avatar 3"
          style={{ width: "40px", height: "100%", margin: '10px', borderRadius: '20%' }}
        />
        <input
          type="text"
          className="form-control form-control-lg"
          id="exampleFormControlInput2"
          placeholder="Type message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <SendIcon type='submit'
          onClick={handleSubmit}
          className="ripple"
          style={{ width: "30px", height: "100%", margin: '10px' }} />

      </div>


    </>
  )
}
