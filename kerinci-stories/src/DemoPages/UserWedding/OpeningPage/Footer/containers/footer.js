import React from "react";
import { Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarked,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCss3Alt,
  faFontAwesome,
  faGithub,
  faGitlab,
  faGoogle,
  faHtml5,
  faJava,
  faJsSquare,
  faReact,
  faSourcetree,
  faStackOverflow,
  faTelegramPlane,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Prosigmaka from "../../../../../assets/utils/images/prosigmaka.png";

export function FooterContainer() {
  return (
    <div
      style={{
        margin: "30px 0px",
        backgroundColor:"transparent",
        borderTop: "3px solid grey",
      }}
    >
      <Row style={{ marginTop: "20px" }}>
        <Col md="3">
          <h2
            style={{ fontFamily: "Philosopher, sans-serif" }}
            className="text-left"
          >
            kerinciStories
          </h2>
          <p style={{ fontFamily: "Philosopher, sans-serif" }}>
            We do not help to create the days, but rather the moments
          </p>
          <p>
            <FontAwesomeIcon icon={faMapMarked} /> Kerinci XII, Kebayoran Baru,
            South Jakarta
          </p>
          <p>
            <FontAwesomeIcon icon={faPhoneAlt} /> (021) 2521-7982
          </p>
          <p style={{ fontFamily: "Philosopher, sans-serif" }}>
            &copy; 2020 kerinciStories, Inc. All rights reserved.
          </p>
        </Col>
        <Col md="3">
          <h2
            style={{ fontFamily: "EB Garamond, serif" }}
            className="text-left"
          >
            Our Values
          </h2>
          <p>
            "The good life is one inspired by love and guided by KNOWLEDGE." -
            Bertrand Russell.
          </p>
          <p className="text-justify">
            We are inspired by love and guided by knowledge.{" "}
            <span style={{ fontFamily: "Philosopher, sans-serif" }}>
              kerinciStories
            </span>{" "}
            are a team made up of professionals of the industry, process,
            trends, and vendors. We will ensure that you have professional and
            dependable vendors who make your wedding day seamless.
          </p>
        </Col>
        <Col md="3">
          <h2
            style={{ fontFamily: "EB Garamond, serif" }}
            className="text-left"
          >
            Production House
          </h2>
          <h5>
            <img
              src={Prosigmaka}
              alt="prosigmaka"
              style={{ width: "50%", height: "30%" }}
            />
          </h5>
          <p className="text-justify">
            est. 2012. With experience in several industry sectors, a
            broad portfolio and technology platform as well as bringing a
            dedicated and highly qualified team, enabling the talent we provide
            to provide fast and responsive services, making it the best choice
            for companies that want to increase the usability of their
            businesses.
          </p>
        </Col>
        <Col md="3">
          <h2
            style={{ fontFamily: "EB Garamond, serif" }}
            className="text-left"
          >
            In Association with
          </h2>{" "}
          <h5>
            <FontAwesomeIcon icon={faJava} size="2x" />
            {"  "}
            <FontAwesomeIcon icon={faReact} size="2x" />
            {"  "}
            <FontAwesomeIcon icon={faJsSquare} size="2x" />
            {"  "}
            <FontAwesomeIcon icon={faHtml5} size="2x" />
            {"  "}
            <FontAwesomeIcon icon={faCss3Alt} size="2x" />
            {"  "}
            <FontAwesomeIcon icon={faStackOverflow} size="2x" />
            {"  "}
            <FontAwesomeIcon icon={faYoutube} size="2x" />
            {"  "}
          </h5>
          <h5>
            <FontAwesomeIcon icon={faGoogle} size="2x" />
            {"  "}
            <FontAwesomeIcon icon={faGithub} size="2x" />
            {"  "}
            <FontAwesomeIcon icon={faGitlab} size="2x" />
            {"  "}
            <FontAwesomeIcon icon={faSourcetree} size="2x" />
            {"  "}
            <FontAwesomeIcon icon={faFontAwesome} size="2x" />
            {"  "}
            <FontAwesomeIcon icon={faTelegramPlane} size="2x" />
            {"  "}
          </h5>
        </Col>
      </Row>
    </div>
  );
}
