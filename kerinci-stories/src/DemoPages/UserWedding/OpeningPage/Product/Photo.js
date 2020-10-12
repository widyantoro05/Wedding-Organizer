import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import photo from "../../../../assets/utils/images/photo2.jpg";

class Photo extends Component {
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
              src={photo}
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
                Photography and Videography
              </h1>
              <h5
                className="text-left"
                style={{
                  fontFamily: "Dosis, sans-serif",
                }}
              >
                Finding a wedding photovideographer is not only about choosing a
                pro who takes great moments. Personality plays a big role in
                selecting a wedding photovideographer—you’re going to be
                spending a lot of time with your photovideographer on your big
                day! Browse these wedding photovideographers to see examples of
                their work.
              </h5>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Photo;
