import React, { Fragment } from 'react';

// import Ionicon from 'react-ionicons';
import { IoIosGrid } from "react-icons/io";

import {
    UncontrolledDropdown, DropdownToggle, DropdownMenu, Col, Row, Button
} from 'reactstrap';
// Dropdown Tabs Content
import image1 from '../../../assets/utils/images/header2.jpg';

class HeaderDots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };

    }

    render() {
        return (
            <Fragment>
                <div className="header-dots">
                    <UncontrolledDropdown>
                        <DropdownToggle className="p-0 mr-2" color="link">
                            <div className="icon-wrapper icon-wrapper-alt rounded-circle">
                                <div className="icon-wrapper-bg" style={{ background: "#C9C78B" }} />
                                <IoIosGrid color="#76846A" fontSize="23px" />
                            </div>
                        </DropdownToggle>
                        <DropdownMenu right className="dropdown-menu-xl rm-pointers">
                            <div className="dropdown-menu-header">
                                <div className="dropdown-menu-header-inner" style={{ background: "#76846A" }}>
                                    <div className="menu-header-image"
                                        style={{
                                            backgroundImage: 'url(' + image1 + ')'
                                        }}
                                    />
                                    <div className="menu-header-content text-white">
                                        <h5 className="menu-header-title" style={{ fontFamily: "Philosopher, sans-serif" }}>Menu</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="grid-menu grid-menu-2col">
                                <Row className="no-gutters">
                                    <Col sm="6">
                                        <Button className="btn-icon-vertical btn-transition " outline
                                            color="#6A6932" href="#/adminpage/bookedlist" >
                                            <i className="lnr-book icon-gradient bg-slick-carbon btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Booked List
                                                    </Button>
                                    </Col>
                                    <Col sm="6">
                                        <Button className="btn-icon-vertical btn-transition " outline
                                            color="#6A6932" href="#/adminpage/productinput">
                                            <i className="lnr-cloud-download icon-gradient bg-slick-carbon btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Product Input
                                                    </Button>
                                    </Col>
                                    <Col sm="6">
                                        <Button className="btn-icon-vertical btn-transition " outline
                                            color="#6A6932" href="#/adminpage/staff">
                                            <i className="lnr-users icon-gradient bg-slick-carbon btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                            Staff
                                                    </Button>
                                    </Col>
                                    <Col sm="6">
                                        <Button className="btn-icon-vertical btn-transition " outline
                                            color="#6A6932" href="#/adminpage/assignment">
                                            <i className="lnr-calendar-full icon-gradient bg-slick-carbon btn-icon-wrapper btn-icon-lg mb-3"> </i>
                                                        Staff Assignment
                                                    </Button>
                                    </Col>
                                </Row>
                            </div>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            </Fragment>
        )
    }
}

export default HeaderDots;
