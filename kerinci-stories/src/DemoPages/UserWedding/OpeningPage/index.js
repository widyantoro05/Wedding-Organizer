import React, { Component } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Carousel from "./Carousel";
import About from "./About";
import Product from "./Product";
import Stories from "./Stories";
import Contact from "./Contact";
import { Container } from "reactstrap";

export default class OpeningPage extends Component {
  render() {
    return (
      <Container fluid>
        <CSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          {/* <PageTitle
                        heading="Main Page"
                        subheading="Maunya sih ini nanti dibikin opening page ala2 gitu"
                        icon="pe-7s-wristwatch icon-gradient bg-deep-blue"
                    /> */}
          {/* <UtilitiesAnimations />
                    <UtilitiesColors />
                    <UtilitiesHelpers /> */}
          <Carousel />
          <About />
          <Stories />
          <Product />
          <Contact />
          {/* <Footer /> */}
        </CSSTransitionGroup>
      </Container>
    );
  }
}
