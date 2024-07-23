import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userreducer } from '../../features/slice/messageslice';
import { useSocketContext } from '../../context/SocketContext';
import {setSelectedConversation } from '../../features/slice/conversationSlice';
export const Conversations = () => {
  const dispatch = useDispatch();
   const selectedConversation = useSelector((state) => state.conversationSlice.selectedConversation);
  const [users, setusers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  // const { onlineUsers } = useSocketContext();
  // console.log(onlineUsers,"onlineUsers");
  const onlineUsers = useSelector((state) => state.socketSlice.OnlineUsers);
  // console.log(onlineUsers, "authUserauthUserauthUser");

  async function get_users() {

    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
      console.error('No token found');
      return;
    }
    const user_data = await fetch(`${process.env.REACT_APP_SITE_URL}/chatuser`, {
      method: "get",
      headers: {
        'authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    });

    const users = await user_data.json();
    setusers(users);
  }

  useEffect(() => {
    get_users();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user._id);
    dispatch(userreducer(user));
    dispatch(setSelectedConversation(user));
  };

  return (
    <>
      <div className=' px-2 flex flex-col overflow-auto'>
        {users.map((user) => {
          return (
            <div key={user._id}
              onClick={() => handleUserClick(user)}
              className={`border-bottom conversation-item ${selectedUser == user._id ? 'selected' : ''
                }`}
              style={{ cursor: 'pointer' }}
            >
              <li className="">
                <a style={{ textDecoration: 'none' }} href="#!" className="d-flex justify-content-between">
                  <div className="d-flex flex-row">
                    <div>
                      <img
                        src={user.url}
                        alt="avatar"
                        className="d-flex align-self-center me-3"
                        width="60"
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <span className="badge bg-success badge-dot"></span>
                    </div>
                    <div className="pt-1 d-flex flex-column align-items-start">
                      <p className="fw-bold mb-0">{user.name}</p>
                      <p className="small text-muted">
                      {(onlineUsers && onlineUsers.includes(user._id)) ? 'online' : 'offline'}
                      </p>
                    </div>
                  </div>
                  <div className="pt-1">
                    {/* <p className="small text-muted mb-1">Just now</p> */}
                    {/* <span className="badge bg-danger rounded-pill float-end">
                      0
                    </span> */}
                  </div>
                </a>
              </li>
            </div>
          );
        })}
      </div>

    </>
  )
}
