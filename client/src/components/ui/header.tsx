import React from "react";

import Navbar from "./navbar";

export default function Header() {
  return (
    <div id="header">
      <div id="nav_header" style={{ display: "flex", flexDirection: "column" }}>
        <Navbar />

        <div
          id="inspiring_div"
          style={{ marginTop: "auto", maxWidth: "540px" }}
        >
          <div style={{ fontWeight: "519", fontSize: "2rem" }}>
            Inspiring generations to co-exist
          </div>
          <div style={{ fontSize: "1.25rem" }}>
            recreation, education, conservation
          </div>
        </div>
      </div>
    </div>
  );
}
