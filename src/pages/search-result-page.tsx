import { useSearchParams } from "react-router";

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");

  if (!searchTerm) {
    return null;
  }

  return (
    <p>
      You searched for <i>{searchTerm}</i>
    </p>
  );
};

export default SearchResults;
