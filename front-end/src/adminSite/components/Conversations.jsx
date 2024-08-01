import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userreducer } from '../../features/slice/messageslice';
import { useSocketContext } from '../../context/SocketContext';
import { setSelectedConversation } from '../../features/slice/conversationSlice';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
  MDBInputGroup,
  MDBScrollbar,
} from "mdb-react-ui-kit";
import SearchIcon from '@mui/icons-material/Search';
export const Conversations = () => {
  const dispatch = useDispatch();
  const selectedConversation = useSelector((state) => state.conversationSlice.selectedConversation);
  const [users, setusers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  // const { onlineUsers } = useSocketContext();
  // console.log(onlineUsers,"onlineUsers");
  const onlineUsers = useSelector((state) => state.socketSlice.OnlineUsers);
  // console.log(onlineUsers, "authUserauthUserauthUser");
  const [searchQuery, setSearchQuery] = useState('');


  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const usersToDisplay = searchQuery ? filteredUsers : users;


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


      <MDBCol md="6" lg="5" xl="5" className="mb-4 mb-md-0 p-0">
        <div className="p-3">

          <MDBInputGroup className="rounded mb-3 ">
            <input
              className="form-control rounded"
              placeholder="Search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
          </MDBInputGroup>

          <div style={{ overflowY: 'scroll', position: "relative", height: "470px" }}
          >
            <MDBTypography listUnStyled className="mb-0">
              {/* section 1 */}
              {/* <Conversations /> */}






              <div className=' px-2 flex flex-col overflow-auto'>




              {usersToDisplay.length > 0 ? (
        usersToDisplay.map((user) => (
          <div
            key={user._id}
            onClick={() => handleUserClick(user)}
            className={`border-bottom conversation-item ${selectedUser === user._id ? 'selected' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <li className="">
              <a
                style={{ textDecoration: 'none' }}
                href="#!"
                className="d-flex justify-content-between"
              >
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
                      {onlineUsers && onlineUsers.includes(user._id) ? 'online' : 'offline'}
                    </p>
                  </div>
                </div>
                <div className="pt-1"></div>
              </a>
            </li>
          </div>
        ))
      ) : (
        <p>No users found.</p> // Display a message if no users match the search criteria
      )}

                {/* {users.map((user) => {
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
                          </div>
                        </a>
                      </li>
                    </div>
                  );
                })} */}
              </div>


            </MDBTypography>
          </div>
        </div>
      </MDBCol>



    </>
  )
}
