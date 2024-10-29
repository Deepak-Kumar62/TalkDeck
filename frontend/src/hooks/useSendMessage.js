import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
  const [sending, setSending] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();

  const sendMessage = async (message) => {
    setSending(true);
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );

      const data = await res.json();
      if (data.error) throw new Error(error.message);
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSending(false);
    }
  };

  return { sending, sendMessage };
};

export default useSendMessage;
