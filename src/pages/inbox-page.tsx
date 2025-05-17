/*
   Use <Link> when the link doesn't need active styling:

   <Link to="/about">About</Link>
*/
import { Link } from "react-router";

const InboxPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Inbox</h1>
      <ul>
        <li>
          <Link to="/messages/1">View message 1</Link>
        </li>
        <li>
          <Link to="/messages/2">View message 2</Link>
        </li>
        <li>
          <Link to="/messages/3">View message 3</Link>
        </li>
      </ul>
    </div>
  );
};

export default InboxPage;
