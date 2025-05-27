import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";

const MessagePage: React.FC = () => {
  const { messageId } = useParams();
  const [loading, setLoading] = useState(true);
  const data = useLoaderData();

  useEffect(() => {
    // simulate fetching a message from backend with a little delay
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [messageId]);

  if (loading) {
    return <div className="p-8">Loading..</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-xl mb-4">Message {messageId}</h2>
      <p>This is the message page.</p>
      <i>{data.message}</i>
    </div>
  );
};

export default MessagePage;
