import { Link } from "react-router";

interface DecoratedLinkProps {
  children: React.ReactNode;
  to: string;
}

export const DecoratedLink: React.FC<DecoratedLinkProps> = ({
  children,
  to,
}) => {
  return (
    <Link
      to={to}
      className="underline underline-offset-4 decoration-primary/10 hover:decoration-primary/50"
    >
      {children}
    </Link>
  );
};
