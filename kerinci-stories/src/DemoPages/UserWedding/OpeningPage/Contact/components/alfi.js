import React, { Component, Fragment } from "react";
import { Button } from "reactstrap";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import avatar4 from "../../../../../assets/utils/images/avatars/alfi.jpg";
import catering from "../../../../../assets/utils/images/catering2.jpg";

import { Card } from "reactstrap";

class Alfi extends Component {
  render() {
    return (
      <Fragment>
        <CSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Card className="mb-3 profile-block">
            <div className="dropdown-menu-header">
              <img src={catering} alt="" className="profile-blur opacity-9" />
              <div className="menu-header-content">
                <div className="avatar-icon-wrapper avatar-icon-lg">
                  <div className="avatar-icon rounded-circle btn-hover-shine mr-0">
                    <img src={avatar4} alt="Avatar 5" />
                  </div>
                </div>
                <h5 className="menu-header-title">Alfi</h5>
                <h6 className="menu-header-subtitle">Catering</h6>
                <div className="menu-header-btn-pane">
                  <Button
                    className="btn-icon btn-pill mr-2 btn-icon-only"
                    color="link"
                  >
                    <i className="lnr-inbox btn-icon-wrapper"> </i>
                  </Button>
                  <Button
                    className="btn-icon btn-pill btn-icon-only"
                    color="link"
                  >
                    <i className="lnr-camera btn-icon-wrapper"> </i>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}

export default Alfi;
