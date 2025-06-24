import * as React from "react";
import { ScrollArea } from "@madooei/shadcn-all-in-one/scroll-area";
import { Separator } from "@madooei/shadcn-all-in-one/separator";

const tags = Array.from({ length: 500 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

const ScrollAreaDemoPage: React.FC = () => {
  return (
    <ScrollArea className="h-full w-full">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ScrollAreaDemoPage;
