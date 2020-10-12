import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import venue from "../../../../assets/utils/images/venue1.jpg";

class Venue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
    };
    this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover() {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    var style;
    if (this.state.hover) {
      style = {
        width: "100%",
        height: "100%",
        borderRadius: "40px",
        cursor: "pointer",
        transform: "scale(1.05)",
        transition: "transform .5s",
      };
    } else {
      style = {
        width: "100%",
        height: "100%",
        borderRadius: "40px",
        transition: "transform .5s",
        filter: "grayscale(60%)",
      };
    }
    return (
      <div>
        <Row>
          <Col md="6">
            <img
              src={venue}
              alt="coba"
              style={style}
              onMouseEnter={this.toggleHover}
              onMouseLeave={this.toggleHover}
            />
          </Col>
          <Col md="6">
            <div>
              <h1
                className="text-left"
                style={{
                  fontFamily: "Dancing Script, cursive",
                }}
              >
                Venue
              </h1>
              <h5
                className="text-left"
                style={{
                  fontFamily: "Dosis, sans-serif",
                }}
              >
                Browsing wedding venues is among the very first steps of
                planning your big day. But with so many wedding venues to choose
                from, how do you find The One? First, consider the style of
                venue you’d like: Garden or beach? Ballroom or barn? Then, read
                reviews of wedding venues in your desired city and select a few
                to tour in person. Happy venue hunting!
              </h5>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Venue;
