import { useEffect, useState } from "react";
import { useCreateItem, useItems } from "../hooks/use-items";

const DEBUG = true;

export const ItemsPage: React.FC = () => {
  const { items, isLoading, error: queryError } = useItems();
  const {
    mutate: createItem,
    isPending,
    isSuccess,
    error: mutationError,
  } = useCreateItem();
  const [inputItem, setInputItem] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createItem(inputItem);
  };

  useEffect(() => {
    if (isSuccess) {
      setInputItem("");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (DEBUG) {
      console.log("ItemsPage mounted or updated");
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Add item"
          name="item"
          value={inputItem}
          onChange={(e) => setInputItem(e.target.value)}
        />
        <button type="submit" disabled={isPending}>
          Save
        </button>
        {mutationError && <p>Error creating item: {mutationError.message}</p>}
      </form>
      {isLoading && <p>Loading...</p>}
      {queryError && <p>Error fetching items: {queryError.message}</p>}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
