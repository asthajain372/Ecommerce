import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGetMessages from "./useGetMessages"; // Adjust the import path accordingly

const useSendMessage = () => {
    const { getMessages } = useGetMessages(); // Use getMessages from the custom hook
    const [loading, setLoading] = useState(false);
    const receiver = useSelector((state) => state.messageslice.selectedConversation);
    const receiverId = receiver?._id;

    const sendMessage = async (message) => {
        setLoading(true);
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            console.error('No token found');
            setLoading(false);
            return;
        }

        try {
          let response = await fetch(`${process.env.REACT_APP_SITE_URL}/send/${receiverId}`,
            {
              method: 'POST',
              headers: {
                'authorization': `${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message })
            }
          );

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            await getMessages(); // Refresh messages after sending
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
