import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import dam from "../../../../assets/utils/images/dress2.jpg";

class Dam extends Component {
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
            <img
              src={dam}
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
                Dress, Attire and Makeup
              </h1>
              <h5
                className="text-left"
                style={{
                  fontFamily: "Dosis, sans-serif",
                }}
              >
                Look like a million bucks on your big day with the newest
                collections from top wedding dress designers, the latest trends
                in suits and tuxedos, the most stylish accessories, and
                bridesmaids’ looks your ladies will love. Don’t be surprised if
                the aisle feels more like a runway on your wedding day!
              </h5>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dam;
