import { Form } from "react-router";
import { Button } from "@madooei/shadcn-all-in-one/button";
import { Textarea } from "@madooei/shadcn-all-in-one/textarea";

const AddNotePage: React.FC = () => {
  return (
    <Form method="post" navigate={false} className="flex flex-col gap-4 p-4">
      <h3>Add a new note!</h3>
      <Textarea placeholder="Add note" name="note" />
      <Button type="submit">Save</Button>
    </Form>
  );
};

export default AddNotePage;
