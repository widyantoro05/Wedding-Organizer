import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import decor from "../../../../assets/utils/images/decor2.jpg";

class Decor extends Component {
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
                Decoration
              </h1>
              <h5
                className="text-right"
                style={{
                  fontFamily: "Dosis, sans-serif",
                }}
              >
                Wedding décor can truly take your event to the next level. From
                grand chandeliers to romantic twinkle lights, custom gobos to
                lanterns, wedding décor professionals can bring your vision to
                life. Build your dream décor.
              </h5>
            </div>
          </Col>
          <Col md="6">
            <img
              src={decor}
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

export default Decor;
