import { ReactElement } from "react";

import Header from "./Header";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
