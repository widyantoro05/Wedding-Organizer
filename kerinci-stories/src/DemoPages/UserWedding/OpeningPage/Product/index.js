import React from "react";
import Venue from "./Venue";
import Decor from "./Decor";
import Dam from "./Dam";
import Catering from "./Catering";
import Photo from "./Photo";

export default function index() {
  return (
    <div style={{ marginTop: "40px" }}>
      <h2
        className="text-center"
        style={{
          marginBottom: "20px",
          fontFamily: "Cinzel, serif",
          borderBottom: "2px dotted grey",
        }}
      >
        Our Services
      </h2>
      <Venue />
      <Decor />
      <Dam />
      <Catering />
      <Photo />
    </div>
  );
}
