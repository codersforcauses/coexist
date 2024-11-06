import React, { ReactElement, ReactNode } from "react";

export const PageCard = React.forwardRef(
  ({ children }: { children: ReactNode }, ref) => {
    return <div className="rounded-lg border border-black p-5">{children}</div>;
  },
);

export default PageCard;
