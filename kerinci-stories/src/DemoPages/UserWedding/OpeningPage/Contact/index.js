import React from "react";
import Components from "./components/Components";

export default function index() {
  return (
    <div style={{ marginTop: "40px" }}>
      <h2
        className="text-center"
        style={{
          fontFamily: "Cinzel, serif",
          borderBottom: "1px dotted gray",
        }}
      >
        Don't have any plans yet ? Contact us
      </h2>
      <Components />
    </div>
  );
}
