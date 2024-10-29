import React, { ReactElement, ReactNode } from "react";

export const PageCard = React.forwardRef(
  ({ children }: { children: ReactNode }, ref) => {
    return (
      <div className="mx-auto my-5 w-[95%] max-w-screen-2xl rounded-lg border-2 border-black p-5">
        {children}
      </div>
    );
  },
);

export default PageCard;
