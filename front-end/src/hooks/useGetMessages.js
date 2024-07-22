import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages as setMessagesAction } from "../features/slice/conversationSlice";

const useGetMessages = () => {
    const dispatch = useDispatch();
    
    // Redux selectors
    const selectedConversation = useSelector((state) => state.conversationSlice.setMessages);
    const receiver = useSelector((state) => state.messageslice.selectedConversation);
    const receiverId = receiver?._id; // Safeguard in case receiver is undefined
    
    // Local state
    const [messages, setMessages] = useState(selectedConversation);
    const [loading, setLoading] = useState(false);

    // Function to fetch messages
    const getMessages = async () => {
        setLoading(true);

        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            console.error('No token found');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_SITE_URL}/getmessages/${receiverId}`, {
                method: 'GET',
                headers: {
                  'authorization': `${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);
            
            setMessages(data);
            dispatch(setMessagesAction(data));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (receiverId) {
            getMessages();
        }
    }, [receiverId]);

    return { messages, loading, getMessages };
};

export default useGetMessages;
