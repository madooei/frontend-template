# Asynchronous JavaScript and XML (AJAX)

AJAX is a web development technique that enables web pages to update content dynamically without requiring a full page reload. This is done by exchanging data with a server in the background.

## HTML Forms and AJAX

Let's start by thinking of a very simple example of a page where we list some items and we want to be able to add new items to the list without reloading the page.

Before diving into the React specifics, let's understand how a standard HTML form works.

```tsx
<form>
  <input placeholder="Add item" name="item" />
  <button type="submit">Save</button>
</form>
```

By default, when you click a submit button inside a form, the browser will try to submit the form data to the server: it gathers all the data from the form's input fields, serializes it, and sends it to the server as a POST request.

The POST request is made to the current page's URL unless the form has a `action` attribute specifying a different URL.

```tsx
<form action="/submit" method="POST">
  <input placeholder="Add item" name="item" />
  <button type="submit">Save</button>
</form>
```

The server then processes this data and typically responds with a new page or a redirect. The browser also typically reloads the page after the form submission, which is the default behavior.

So, let's say we have a page that lists items and we also have a form above the list to add new items. When we submit the form, the browser will send a POST request to the server, which will then return a new page with the updated list of items.

This is the browser's native behavior and has been the standard for decades, long before single-page applications (SPAs) like those built with React became popular.

## AJAX Pattern in React

In a React application, you want to control the data flow and UI updates within the JavaScript of your application, without the browser's default full-page reloads. This creates a smoother, more interactive user experience.

```tsx
const AddItemForm: React.FC = () => {
  const [inputItem, setInputItem] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Here you would typically send the inputItem to your server via an AJAX request
    await createItem(inputItem); // Assume createItem is a function that sends the item to the server
    setInputItem(""); // Clear the input field after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Add item"
        name="item"
        value={inputItem}
        onChange={(e) => setInputItem(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
};
```

Notice we take over the form submission process as well as the input field's state:

- The `input` field is controlled by React state, which allows us to manage its value and respond to changes using `value` and `onChange` attributes.
- The `handleSubmit` function is called when the form is submitted. It prevents the default behavior of the form submission using `event.preventDefault()`, which stops the browser from reloading the page.

The `createItem` function would typically be an asynchronous function that sends the new item to the server using AJAX (e.g., with `fetch` or `axios`), and then updates the state of your application accordingly. Here is a simple example of how you might implement `createItem`:

```tsx
const createItem = async (item: string) => {
  try {
    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Item created:", data);
  } catch (error) {
    console.error("Error creating item:", error);
  }
};
```

> [!WARNING]
> We are not showing input validation or error handling in this example, but in a real application, you would want to handle these cases to ensure a good user experience.

When we submit the form and create a new item, we can also update the list of items in our React component state, which will automatically re-render the component with the new data.

```tsx
const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [inputItem, setInputItem] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createItem(inputItem);
    setInputItem("");
    // Either refetch items
    // await fetchItems(); // Refetch items from the server after creating a new item
    // or optimistically update the state
    setItems((prevItems) => [...prevItems, inputItem]); // Optimistically add the new item
  };

  const fetchItems = async () => {
    const data = await getItems(); // Assume getItems is a function that fetches items from the server
    setItems(data);
  };

  useEffect(() => {
    // Fetch initial items from the server when the component mounts
    fetchItems();
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
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
```

The `getItems` function would be similar to `createItem`, but it would use a GET request to fetch the list of items from the server.

```tsx
const getItems = async (): Promise<string[]> => {
  try {
    const response = await fetch("/api/items");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.items; // Assuming the server returns an object with an 'items' array
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};
```

Let's make note of the data flow in the `ItemsPage` component:

- The component fetches the initial list of items from the server when it mounts using `useEffect`.
- The `handleSubmit` function is called when the form is submitted, which prevents the default form submission behavior, creates a new item, and updates the state.
- The list of items is rendered using the `map` function, which iterates over the `items` state and displays each item in a list.

React automatically re-renders the component whenever the state changes, so when we add a new item, the list updates without needing to reload the page. This behavior persist even if we fetch the items from the server instead of optimistically updating the state.

> [!WARNING]
> Optimistic updates can improve user experience by making the application feel more responsive, but they require careful handling of potential errors, such as if the server request fails after the item has been added to the state.

## Custom Hooks for AJAX

We can create custom hooks to encapsulate the logic for fetching and creating items, making our components cleaner and more reusable.

```tsx
const useItems = () => {
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
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, loading, error, fetchItems, saveItem };
};
```

Notice we also added loading and error states to handle the asynchronous nature of fetching and creating items. This allows us to provide feedback to the user while the data is being loaded or if an error occurs.

> [!TIP]
> You can use a global state management solution to store the items instead of local `useState`, which can be useful if you need to access the items across multiple components.

Now the `ItemsPage` component can use this custom hook to manage items:

```tsx
const ItemsPage: React.FC = () => {
  const { items, loading, error, saveItem } = useItems();
  const [inputItem, setInputItem] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await saveItem(inputItem);
    setInputItem("");
  };

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
```

If we want to have separate pages for listing items and adding new items, we can create separate custom hooks for fetching and creating items. This way, if we only want to create items without listing them, we can do so without unnecessary data fetching (that would happen in the `useItems` hook through its useEffect on mount). However, in that case, you would need a global state management solution or a way to update the list of items in the parent component after creating a new item.

```tsx
export const useCreateItem = () => {
  const [error, setError] = useState<string | null>(null);

  const saveItem = async (item: string) => {
    try {
      await createItem(item);
      addItemToStore(item); // Assume addItemToStore is a function that updates the global store or local state
    } catch (err) {
      setError("Failed to create item");
    }
  };

  return { saveItem, error };
};

export const useTodos = () => {
  const { items } = useStore($items); // Assume $items is a global store for items
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getItems();
      v(data); // Assume setItemsInStore is a function that updates the global store or local state
    } catch (err) {
      setError("Failed to fetch items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, loading, error, fetchItems };
};
```

Here is how the store might look like:

```tsx
import { atom } from "nanostores";

export const $items = atom<string[]>([]);

export const addItemToStore = (item: string) => {
  $items.set([...$items.get(), item]);
};

export const setItemsInStore = (items: string[]) => {
  $items.set(items);
};
```

## React Query

React Query (now renamed to TanStack Query) is a library for managing server state in React applications. It essentially implements the AJAX pattern presented above but provides a more powerful and flexible way to handle data fetching, caching, synchronization, and background updates.

If you don't want to implement the AJAX pattern manually, you can use React Query to handle data fetching and state management for you.

In React Query, we have two main concepts: queries and mutations. Queries are used to fetch data, while mutations are used to create, update, or delete data.

Here's a simple example of how you might use React Query to fetch and create items:

```tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getItems, createItem } from "@/services/items-api"; // Assume these are your API functions

const ItemsPage: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: items, isLoading, error } = useQuery({
    queryKey: ["items"],
    queryFn: getItems
  });

  const mutation = useMutation({
    mutationFn: createItem
    onSuccess: () => {
      // Invalidate and refetch the items query after a successful mutation
      queryClient.invalidateQueries({ queryKey: ["items"] });
      // Update global store, clear form, etc.
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const item = formData.get("item") as string;
    mutation.mutate(item);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Add item" name="item" />
        <button type="submit">Save</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {items?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
```

The `useQuery` by default will automatically refetch the data when the component mounts. This is similar to how we used `useEffect` in `useItems` to fetch items when the component mounts. In fact, `useQuery` refetch the data when the window regains focus and when the network reconnects, too, unless you configure it otherwise.

```tsx
const query = useQuery({
  queryKey: ["items"],
  queryFn: getItems,
  // Defaults are true; change these to false if you want to disable refetching
  refetchOnWindowFocus: true,
  refetchOnMount: true,
  refetchOnReconnect: true,
});
```

You can also pass `staleTime` to control how long the data is considered fresh before it needs to be refetched. This can help reduce unnecessary network requests if the data doesn't change frequently. In a way, this can be seen as a global store for your server state, where React Query manages the cache and synchronization for you.

```tsx
const query = useQuery({
  queryKey: ["items"],
  queryFn: getItems,
  staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
});
```

The `queryKey` along with the `queryFn` is what makes `useQuery` reusable across different components and for different resources.

Let's look at the `useMutation` part.

```tsx
const mutation = useMutation({
  mutationFn: createItem
  onSuccess: () => {
    // Invalidate and refetch the items query after a successful mutation
    queryClient.invalidateQueries({ queryKey: ["items"] });
  },
});
```

The `useMutation` hook is used to perform a mutation (like creating an item). It takes a `mutationFn` that performs the actual mutation, and you can specify callbacks like `onSuccess` to handle what happens after the mutation is successful.

```tsx
const mutation = useMutation({
  mutationFn: createItem,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["items"] });
  },
});
```

In the case above, we invalidate the `items` query after a successful mutation, which will trigger a refetch of the items. This ensures that the UI is always up-to-date with the latest data from the server.

We can instead perform an optimistic update, where we immediately update the UI with the new item before the mutation is confirmed by the server.

```tsx
const mutation = useMutation({
  mutationFn: createItem,
  onSuccess: () => {
    queryClient.setQueryData(["items"], (oldData: ItemType[] | undefined) => {
      return oldData ? [...oldData, data] : [data];
    });
  },
});
```

There are several callbacks you can use with `useMutation`:

```tsx
const mutation = useMutation({
  mutationFn: createItem,
  onMutate: (variables) => {
    console.log("Mutation started with variables:", variables);
  },
  onSuccess: (data, variables, context) => {
    console.log("Item created successfully");
  },
  onError: (error, variables, context) => {
    console.error("Error creating item:", error);
  },
  onSettled: (data, error, variables, context) => {
    console.log("Mutation settled (either success or error)");
  },
});
```

If you don't want to use the callbacks, you can get the status of the mutation using the properties returned by `useMutation`. This allows you to handle loading states, success states, and error states in your component.

```tsx
const {
  mutate, // The function to call to perform the mutation
  isIdle, // The mutation is currently idle or in a fresh/reset state
  isPending, // The mutation is currently running
  isSuccess, // The mutation was successful and mutation data is available
  isError, // The mutation encountered an error
  error, // isError is true, this will contain the error object
  data, // isSuccess is true, this will contain the data returned from the mutation
} = useMutation({
  mutationFn: createItem,
});
```

There is a lot more to React Query; it sort of covers everything one might possibly need for managing server state in a React application. This means more complexity though, and potentially more boilerplate code. For example, what is the right way of fetching specific a specific resource? Let's say each item has a unique ID, and we want to fetch a specific item by its ID. You would typically use a query like this:

```tsx
const {
  data: item,
  isLoading,
  error,
} = useQuery({
  queryKey: ["items", itemId], // The query key includes the item ID
  queryFn: () => getItemById(itemId), // The function to fetch the item by ID
});
```

Notice the `queryKey` includes the `itemId`, which allows React Query to cache and manage the data for that specific item. I had several students who looked at my initial example of using React Query and tried to replicated it like this:

```tsx
const {
  data: item,
  isLoading,
  error,
} = useQuery({
  queryKey: ["item"],
  queryFn: () => getItemById(itemId),
});
```

They changed `items` to `item` in the query key, thinking it would work. However, this would not cache the data correctly for each item. If you show two items on the same page, the second item would overwrite the first one in the cache, because both queries would have the same key `["item"]`.

This is a common pitfall when using libraries like React Query. It gives you a lot of options and tries to cover every possible use case, which can lead to confusion if you're not familiar with how it works. Please refer to the [React Query documentation](https://tanstack.com/query/latest) for more details and advanced usage.

**Aside:** I like to wrap React Query's `useQuery` and `useMutation` hooks in custom hooks to keep my components clean and focused on rendering UI. This way, I can also integrate them with my global state management solution (like a store) if needed, or handle specific logic related to the data fetching and mutation in one place. And, if I get fed up with React Query, I can easily switch to another data fetching library without changing my components!

```tsx
export const useItems = () => {
  const items = useStore($items);

  const { isLoading, error, data } = useQuery({
    queryKey: ["items"],
    queryFn: getItems, // The function to fetch items from the server
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    // Keep the data in the store up to date
    if (data) {
      setItemsInStore(data);
    }
  }, [data]);

  return {
    items,
    isLoading,
    error,
  };
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: createItem, // The function to create a new item on the server
    onSuccess: (data) => {
      // Update the store directly for a more optimistic-feeling UI.
      addItemToStore(data);

      // And, manually update the cache for the 'items' query.
      queryClient.setQueryData(["items"], (oldData: ItemType[] | undefined) => {
        return oldData ? [...oldData, data] : [data];
      });
    },
  });

  return { mutate, isPending, isSuccess, error };
};
```

Here is my `ItemsPage` component using the custom hooks:

```tsx
const ItemsPage: React.FC = () => {
  const { items, isLoading, error: queryError } = useItems();
  const {
    mutate: createItem,
    isPending,
    error: mutationError,
  } = useCreateItem();
  const [inputItem, setInputItem] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createItem(inputItem);
    setInputItem("");
  };

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
```

## React Router

React Router is a library for managing navigation and routing in React applications. However, it evolved to do more than just routing; the latest version (v.7) includes a "data mode" that brings the core features of a sister library, Remix, into React Router. This allows you to use "loaders", "actions", "fetchers", etc., to handle AJAX patterns in your React application.

Let's look at how this works with our `ItemsPage` example. First, we'll just focus on fetching the items from the server when the page loads.

```tsx
import { useLoaderData } from "react-router";

export async function loader() {
  const items = await getItems();
  setItemsInStore(items); // optional: cache the data in the store
  return { items };
}

export const ItemsPage: React.FC = () => {
  const { items } = useLoaderData<{ items: ItemType[] }>();

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
```

Notice we have a `loader` function that fetches the items from the server. This function is called by React Router when the route is matched, and it returns the data that will be available in the component via `useLoaderData`.

```tsx
import { createBrowserRouter } from "react-router";
import { ItemsPage, loader as itemsLoader } from "./items-page"; 

createBrowserRouter([
  { 
    path: "/items", 
    Component: ItemsPage,
    loader: itemsLoader
  },
]);
```

Loaders are invoked by React Router before the corresponding route component is mounted. This means that the data fetching happens before the component's lifecycle begins, preventing the component from rendering without necessary data. This is not the case with `useEffect`, which runs after the component has mounted, which required us to handle loading states and potential empty content in the component if the data is not immediately available.

You can perform any side effects in the `loader` function. For instance, I used `setItemsInStore` to cache the data in a global store. As such, I could use `const items = useStore($items);` in the `ItemsPage` component to access the items from the store instead of fetching them again instead of `useLoaderData`.

Now, let's add the ability to create a new item using a form. 

```tsx
import { useLoaderData, Form } from "react-router";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const item = formData.get("item") as string;
  await createItem(item);
  return { status: "success" }; // You must return something from the action
}

export async function loader() {
  const items = await getItems();
  setItemsInStore(items); // optional: cache the data in the store
  return { items };
}

export const ItemsPage: React.FC = () => {
  const { items } = useLoaderData<{ items: ItemType[] }>();

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
```

Now update the router object to include the action for the `ItemsPage`:

```tsx
import { createBrowserRouter } from "react-router";
import { 
  ItemsPage, 
  loader as itemsLoader
  action as itemsAction 
} from "./items-page"; 

createBrowserRouter([
  { 
    path: "/items", 
    Component: ItemsPage,
    loader: itemsLoader,
    action: itemsAction
  },
]);
```

The `action` function is called when the form is submitted. It receives the `request` object, which contains the form data. We can then extract the item from the `formData` object and call the `createItem` function to send it to the server.

Notice I used a `Form` component from React Router, which is similar to the native HTML form but integrates with React Router's data handling. The `action` function is called when the form is submitted. It is possible to use the native HTML form instead, and invoke the `action` function through `useSubmit` or `useFetcher` hooks provided by React Router. See [this link](https://reactrouter.com/start/data/actions#calling-actions) for more details.

If you pay attention to the `action` function, you will notice that I have not updated the store after creating a new item. This is because React Router will automatically refetch the data (call the loader) after the action is completed, so the items will be up-to-date in the component. 

The `action` function must return something, even if it's just an empty object or null. This offers an opportunity to return additional data that can be used in the component, such as a success message or error information. You can access this data in the component using `useActionData`.

```tsx
import { useLoaderData, useActionData, Form } from "react-router";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const item = formData.get("item") as string;
  if (item.trim() === "") {
    return { error: "Item cannot be empty" }; // Return an error if the item is empty
  }
  await createItem(item);
  return { status: "success" }; // Return a success status
}

export async function loader() {
  // no changes here
}

export const ItemsPage: React.FC = () => {
  const { items } = useLoaderData<{ items: ItemType[] }>();
  const actionData = useActionData<{ status?: string; error?: string }>();

  return (
    <div>
      <Form method="post">
        <input placeholder="Add item" name="item" type="text" />
        <button type="submit">Save</button>
      </Form>
      {actionData?.error && <p>Error: {actionData.error}</p>}
      {actionData?.status === "success" && <p>Item created successfully!</p>}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
```

There is a lot more to React Router's data mode, including nested routes, loaders for parent routes, and more. You can read about these features in the [React Router documentation](https://reactrouter.com/start/data/installation).