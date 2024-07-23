import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { useState, useEffect } from 'react';
import { Conversations } from '../components/Conversations';
import { TiMessages } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { socketreducer, useronlinereducer } from '../../features/slice/socketSlice';
import './message.css';
import io from 'socket.io-client';


import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBTypography,
} from "mdb-react-ui-kit";
import { Messagebox } from '../components/Messagebox';
import { useDispatch } from 'react-redux';
// import { useSocketContext } from '../../context/SocketContext';
import { useSocketContext } from '../../context/SocketContext';

const Message = () => {
    const dispatch = useDispatch();
    const selectedchat = useSelector((state) => state.messageslice.selectedConversation);
    // const socketconn = useSelector((state) => state.socketSlice.Socketconnect);
    const onlineUser = useSelector((state) => state.socketSlice.OnlineUsers);
    // console.log(onlineUser,"onlineusess");
    // console.log(socketconn,"socketconn");

    // const { onlineUsers } = useSocketContext();
    // console.log(onlineUsers);

    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const user = JSON.parse(localStorage.getItem("user")) || null;
    const [authUser, setAuthUser] = useState(user);


    // Set up the Socket.IO connection and event listeners
    useEffect(() => {
        console.log(authUser);
        if (authUser) {
            const socket = io(`${process.env.REACT_APP_SITE_URL}`, {
                query: { userId: authUser._id },
            });

            setSocket(socket);
            dispatch(socketreducer(socket));

            // Listen for 'getOnlineUsers' event from the server
            socket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users);
                  dispatch(useronlinereducer(users));

                console.log(users , "userrrrrrrrrrrrrrr");
            });
            // Cleanup function to close the socket connection when component unmounts
            return () => {
                socket.close();
            };
        } else if (socket) {
            // Close existing socket connection if authUser is null
            socket.close();
            setSocket(null);
        }
    }, [authUser]);
    

    return (
        <>
            <Sidebar />
            <main id="main" className="main">

                <Header />

                <div className="pagetitle">
                    <nav>
                        <ol className="breadcrumb">
                            <Link to='/admin/Dashboard' className="breadcrumb-item">Home</Link>
                            <li className="breadcrumb-item active">Messages</li>
                        </ol>
                    </nav>
                </div>
                <div  >
                    <div className="content-wrapper">
                        <div className="container">
                            <div className="row clearfix">
                                <div className="col-lg-12">
                                    <MDBCard id="chat3" style={{ borderRadius: "15px" }}>
                                        <MDBCardBody>
                                            <MDBRow>
                                                <MDBCol md="6" lg="5" xl="5" className="mb-4 mb-md-0 p-0">
                                                    <div className="p-3">
                                                        <div style={{ overflowY: 'scroll', position: "relative", height: "500px" }}
                                                        >
                                                            <MDBTypography listUnStyled className="mb-0">
                                                                {/* section 1 */}
                                                                <Conversations />

                                                            </MDBTypography>
                                                        </div>
                                                    </div>
                                                </MDBCol>
                                                <MDBCol md="6" lg="7" xl="7" className='p-0'  >
                                                    {/* section 2 */}
                                                    {!selectedchat ? (
                                                        <NoChatSelected />
                                                    ) :
                                                        (
                                                            <Messagebox />

                                                        )}
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBCardBody>
                                    </MDBCard>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />


        </>
    )
}

export default Message

const NoChatSelected = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <div className='d-flex align-items-center justify-content-center w-100 h-100'>
            <div className='p-4 text-center text-secondary font-weight-semibold d-flex flex-column align-items-center gap-2'>
                <p className='h4 mb-1'>Welcome   ❄  {user.name} 👋  </p>
                <p className='h5 mb-3'>Select a chat to start messaging </p>
                <TiMessages className='display-3 text-center' />
            </div>
        </div>
    );
};


// 🌟