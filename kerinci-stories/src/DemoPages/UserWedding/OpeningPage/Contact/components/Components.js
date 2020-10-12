import React from "react";
import { Col, Row } from "reactstrap";
import Alfi from "./alfi";
import Dian from "./dian";
import Huma from "./huma";
import Ipeh from "./ipeh";
import Widy from "./widy";

export default function Components() {
  return (
    <div style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          <Huma />
        </Col>
        <Col style={{ marginLeft: "4.166666667%" }}>
          <Widy />
        </Col>
        <Col style={{ marginLeft: "4.166666667%" }}>
          <Dian />
        </Col>
        <Col style={{ marginLeft: "4.166666667%" }}>
          <Alfi />
        </Col>
        <Col style={{ marginLeft: "4.166666667%" }}>
          <Ipeh />
        </Col>
      </Row>
    </div>
  );
}
