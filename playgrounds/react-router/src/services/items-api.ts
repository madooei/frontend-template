const API_URL = "http://localhost:3000";

const getItems = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/items`);
  const items = await response.json();
  return items.map((item: { text: string }) => item.text);
};

const createItem = async (item: string): Promise<string> => {
  const response = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: item }),
  });
  return response.json();
};

export { getItems, createItem };
