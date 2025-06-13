import { useEffect, useState } from "react";
import { useItems } from "../hooks/use-items";

export const ItemsPage: React.FC = () => {
  const { items, loading, error, saveItem } = useItems();
  const [inputItem, setInputItem] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await saveItem(inputItem);
    setInputItem("");
  };

  useEffect(() => {
    console.log("ItemsPage mounted");
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
        <button type="submit">Save</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
