import { useLoaderData, Form, useActionData } from "react-router";
import { createItem, getItems } from "../services/items-api";
import { useEffect } from "react";

const DEBUG = true;

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  if (DEBUG) {
    console.log("Action called  with formData:", formData);
  }
  const item = formData.get("item") as string;
  await createItem(item);
  return { status: "success" }; // You must return something from the action
}

export async function loader() {
  if (DEBUG) {
    console.log("Loader called");
  }
  const items = await getItems();
  return { items };
}

export const ItemsPage: React.FC = () => {
  const { items } = useLoaderData<{ items: string[] }>();
  const data = useActionData();

  useEffect(() => {
    if (DEBUG) {
      console.log("ItemsPage loaded with items:", items);
    }
  }, [items]);

  useEffect(() => {
    if (DEBUG) {
      console.log("ItemsPage action data:", data);
    }
  }, [data]);

  useEffect(() => {
    if (DEBUG) {
      console.log("ItemsPage component mounted");
    }
    return () => {
      if (DEBUG) {
        console.log("ItemsPage component unmounted");
      }
    };
  }, []);

  return (
    <div>
      <Form method="post">
        <input placeholder="Add item" name="item" type="text" />
        <button type="submit">Save</button>
      </Form>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export const Component = ItemsPage;
