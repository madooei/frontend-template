import { Form } from "react-router";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
