import React from "react";
import { Col, Row } from "reactstrap";
import CarouselAfterwed from "./afterwed";
import CarouselParty from "./party";
import CarouselPrawed from "./prawed";
import CarouselSacred from "./sacred";

export default function Components() {
  return (
    <div style={{ marginTop: "20px" }}>
      <Row>
        <Col md="3">
          <h2
            className="text-center"
            style={{
              fontFamily: "Dancing Script, cursive",
            }}
          >
            Pre-Wedding
          </h2>
          <CarouselPrawed />
          <h6
            className="text-center"
            style={{
              fontFamily: "Dosis, sans-serif",
              marginTop: "10px",
            }}
          >
            First thing's first, you're engaged! Can you tell we’re excited?
            But, we also know better than anyone how overwhelming wedding
            planning can be and we’re here to help you every step of the way.
          </h6>
        </Col>
        <Col md="3">
          <h2
            className="text-center"
            style={{
              fontFamily: "Dancing Script, cursive",
            }}
          >
            Sacred Ceremony
          </h2>
          <CarouselSacred />
          <h6
            className="text-center"
            style={{
              fontFamily: "Dosis, sans-serif",
              marginTop: "10px",
            }}
          >
            The modern sacred love wedding ceremony that crafted by and for each
            individual couple. We include elements that will help the couple
            truly seize on the energy of the moment – such as creating a
            sanctified space that is like a sacred container for their love and
            vows.
          </h6>
        </Col>
        <Col md="3">
          <h2
            className="text-center"
            style={{
              fontFamily: "Dancing Script, cursive",
            }}
          >
            Party Moments
          </h2>
          <CarouselParty />
          <h6
            className="text-center"
            style={{
              fontFamily: "Dosis, sans-serif",
              marginTop: "10px",
            }}
          >
            Looking for the most gorgeous wedding dress? Exactly how to word a
            wedding invitation? Or wondering how to propose to your bridal
            party? You’ve come to the right place.
          </h6>
        </Col>
        <Col md="3">
          <h2
            className="text-center"
            style={{
              fontFamily: "Dancing Script, cursive",
            }}
          >
            After-Wedding
          </h2>
          <CarouselAfterwed />
          <h6
            className="text-center"
            style={{
              fontFamily: "Dosis, sans-serif",
              marginTop: "10px",
            }}
          >
            We make photographs to understand what lives mean to us. So get
            ready to cry tears of joy as you browse thousands of beautiful
            images of real weddings, real couples, and real emotional moments.
          </h6>
        </Col>
      </Row>
    </div>
  );
}
