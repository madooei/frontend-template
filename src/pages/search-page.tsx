import { useNavigate } from "react-router";
import { Button } from "@madooei/shadcn-all-in-one/button";
import { Input } from "@madooei/shadcn-all-in-one/input";
import { Label } from "@madooei/shadcn-all-in-one/label";
import SearchResults from "./search-result-page";

const SearchPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Search</h1>
      <p>This is a dummy search form!</p>
      <form
        className="mb-4 flex gap-2 max-w-md border rounded-md p-2"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const searchTerm = formData.get("search") as string;
          navigate(`/search?q=${searchTerm}`);
        }}
      >
        <Label htmlFor="search">Search</Label>
        <Input type="text" id="search" name="search" placeholder="Keyword" />
        <Button type="submit">Search</Button>
      </form>
      <SearchResults />
    </div>
  );
};

export default SearchPage;
