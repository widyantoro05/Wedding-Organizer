import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import catering from "../../../../assets/utils/images/catering2.jpg";

class Catering extends Component {
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
      <div style={{ marginTop: "30px" }}>
        <Row>
          <Col md="6">
            <div>
              <h1
                className="text-right"
                style={{
                  fontFamily: "Dancing Script, cursive",
                }}
              >
                Catering
              </h1>
              <h5
                className="text-right"
                style={{
                  fontFamily: "Dosis, sans-serif",
                }}
              >
                The wedding catering is often the focal point of a reception.
                Whether you’re eyeing a classic catering decorated with fresh
                flowers or a more modern design, our professional wedding chefs
                can create a catering to suit your style.
              </h5>
            </div>
          </Col>
          <Col md="6">
            <img
              src={catering}
              alt="coba"
              style={style}
              onMouseEnter={this.toggleHover}
              onMouseLeave={this.toggleHover}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Catering;
