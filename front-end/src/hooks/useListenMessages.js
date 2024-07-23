import { useEffect, useState } from 'react';
import { useSocketContext } from '../context/SocketContext';
import { useSelector } from 'react-redux';
import notificationSound from '../assets/sounds/notification.mp3'


const useListenMessages = () => {

    // const { socket } = useSocketContext();
    const socket = useSelector((state) => state.socketSlice.Socketconnect);

    const selectedConversation = useSelector((state) => state.conversationSlice.messages);
    const [messages, setMessages] = useState(selectedConversation || []);

    useEffect(() => {
        // Handler for new messages
        const handleNewMessage = (newMessage) => {
            newMessage.shouldShake = true; // Custom property if needed
            const sound = new Audio(notificationSound);
			sound.play();
            setMessages(prevMessages => [...prevMessages, newMessage]); // Update state with new message
        };

        // Set up socket listener
        socket?.on('newMessage', handleNewMessage);

        // Cleanup socket listener on component unmount
        return () => {
            socket?.off('newMessage', handleNewMessage);
        };
    }, [socket]); // Only depend on socket

    useEffect(() => {
        setMessages(selectedConversation || []); // Sync state with Redux store
    }, [selectedConversation]);

    return { messages };
};

export default useListenMessages;
