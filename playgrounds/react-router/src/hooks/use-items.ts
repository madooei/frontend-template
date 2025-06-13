import { useEffect, useState } from "react";
import { createItem, getItems } from "../services/items-api";

export const useItems = () => {
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getItems();
      setItems(data);
    } catch (err) {
      setError("Failed to fetch items");
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveItem = async (item: string) => {
    try {
      await createItem(item);
      setItems((prevItems) => [...prevItems, item]);
    } catch (err) {
      setError("Failed to create item");
      console.error("Error creating item:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, loading, error, fetchItems, saveItem };
};