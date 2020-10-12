import React from "react";
import Components from "./components/Components";

export default function index() {
  return (
    <div style={{ marginTop: "40px" }}>
      <h2
        className="text-center"
        style={{
          fontFamily: "Cinzel, serif",
        }}
      >
        Write your Beautiful Stories with
      </h2>
      <h2
        className="text-center"
        style={{
          fontFamily: "Philosopher, sans-serif",
          borderBottom: "1px dotted gray",
        }}
      >
        kerinciStories
      </h2>
      <Components />
    </div>
  );
}
