import { DecoratedLink } from "@/components/decorated-link";

const InboxPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Inbox</h1>
      <ul className="list-disc pl-5">
        <li>
          <DecoratedLink to="/messages/1">View message 1</DecoratedLink>
        </li>
        <li>
          <DecoratedLink to="/messages/2">View message 2</DecoratedLink>
        </li>
        <li>
          <DecoratedLink to="/messages/3">View message 3</DecoratedLink>
        </li>
      </ul>
    </div>
  );
};

export default InboxPage;
