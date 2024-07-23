import { createContext, useState, useEffect, useContext } from "react";
// import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	// const { authUser } = useAuthContext();
    const user = JSON.parse(localStorage.getItem('user'));
    const [authUser, setAuthuser] = useState(user);
        // setAuthuser(user);
        // console.log(Authuser, "dvreeeeeeeeeg");
       
	useEffect(() => {
		if (authUser) {
			const socket = io(`${process.env.REACT_APP_SITE_URL}`, {
				query: {
					userId: authUser._id,
				},
			});
			setSocket(socket);
			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
                // console.log(users, "usersssssssssssss");
			});
			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};

