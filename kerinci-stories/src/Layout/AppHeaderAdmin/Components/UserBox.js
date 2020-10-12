import React, { Fragment } from 'react';

// import Ionicon from 'react-ionicons';

// import { IoIosCalendar } from "react-icons/io";

// import PerfectScrollbar from 'react-perfect-scrollbar';

import {
    DropdownToggle, DropdownMenu,
   Button, UncontrolledButtonDropdown
} from 'reactstrap';

import {
    toast,
    Bounce
} from 'react-toastify';


// import {
//     faAngleDown, faUserCircle

// } from '@fortawesome/free-solid-svg-icons';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import city3 from '../../../assets/utils/images/dropdown-header/city3.jpg';
// import avatar1 from '../../../assets/utils/images/avatars/1.jpg';

import image1 from '../../../assets/utils/images/header1.jpg';

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };

    }

    notify2 = () => this.toastId = toast("You don't have any new items in your calendar for today! Go out and play!", {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'success'
    });


    render() {

        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="#76846A" className="p-0">
                                        {/* <img width={42} className="rounded-circle" src={avatar1} alt=""/> */}
                                        {/* <FontAwesomeIcon className="ml-2 opacity-8" icon={faUserCircle} size="3x" color="#76846A" />
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} /> */}
                                        <img className="rounded-circle d-block"
                                            src={`http://localhost:1212/v1/app/downloadFile/${window.localStorage.getItem('imageAdmin')}`}
                                            style={{ width: "42px", height: "42px", objectFit: "cover" }}
                                            alt="" />
                                        {/* <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} /> */}
                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                        <div className="dropdown-menu-header">
                                            <div className="dropdown-menu-header-inner" style={{ background: "#76846A" }}>
                                                <div className="menu-header-image opacity-2"
                                                    style={{
                                                        backgroundImage: 'url(' + image1 + ')'
                                                    }}
                                                />
                                                <div className="menu-header-content text-left">
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                                <img width={42} className="rounded-circle d-block"
                                                                    src={`http://localhost:1212/v1/app/downloadFile/${window.localStorage.getItem('imageAdmin')}`}
                                                                    style={{ width: "54px", height: "54px", objectFit: "cover" }}
                                                                    alt="" />
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">
                                                                    Admin
                                                                </div>
                                                                <div className="widget-subheading opacity-8">
                                                                    <p>{window.localStorage.getItem('nameAdmin')}</p>
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right mr-2">
                                                                <Button className="btn-pill btn-shadow btn-shine"
                                                                    style={{ backgroundColor: "#A2BE75", outlineColor: "#778A35", border: "none" }} onClick={(e) => {
                                                                        e.preventDefault();
                                                                        window.localStorage.setItem('loginstatus', 'false');
                                                                        localStorage.removeItem('nameAdmin');
                                                                        localStorage.removeItem('imageAdmin')
                                                                        window.location.href = '#/user/openingpage';
                                                                    }}>
                                                                    Logout
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="scroll-area-xs" style={{
                                            height: '150px'
                                        }}>
                                            <PerfectScrollbar>
                                                <Nav vertical>
                                                    <NavItem className="nav-item-header">
                                                        Activity
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="#">
                                                            Chat
                                                            <div className="ml-auto badge badge-pill badge-info">8</div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="#">Recover Password</NavLink>
                                                    </NavItem>
                                                    <NavItem className="nav-item-header">
                                                        My Account
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="#">
                                                            Settings
                                                            <div className="ml-auto badge badge-success">New</div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="#">
                                                            Messages
                                                            <div className="ml-auto badge badge-warning">512</div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="#">
                                                            Logs
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav>
                                            </PerfectScrollbar>
                                        </div>
                                        <Nav vertical>
                                            <NavItem className="nav-item-divider mb-0"/>
                                        </Nav>
                                        <div className="grid-menu grid-menu-2col">
                                            <Row className="no-gutters">
                                                <Col sm="6">
                                                    <Button
                                                        className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2"
                                                        outline color="warning">
                                                        <i className="pe-7s-chat icon-gradient bg-amy-crisp btn-icon-wrapper mb-2"> </i>
                                                        Message Inbox
                                                    </Button>
                                                </Col>
                                                <Col sm="6">
                                                    <Button
                                                        className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2"
                                                        outline color="danger">
                                                        <i className="pe-7s-ticket icon-gradient bg-love-kiss btn-icon-wrapper mb-2"> </i>
                                                        <b>Support Tickets</b>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                        <Nav vertical>
                                            <NavItem className="nav-item-divider"/>
                                            <NavItem className="nav-item-btn text-center">
                                                <Button size="sm" className="btn-wide" color="primary">
                                                    Open Messages
                                                </Button>
                                            </NavItem>
                                        </Nav> */}
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </div>
                            {/* <div className="widget-content-left  ml-3 header-user-info">
                                <div className="widget-heading">
                                    Alina Mclourd
                                </div>
                                <div className="widget-subheading">
                                    VP People Manager
                                </div>
                            </div> */}

                            {/* <div className="widget-content-right header-user-info ml-3">
                                <Button className="btn-shadow p-1" size="sm" onClick={this.notify2} color="info"
                                        id="Tooltip-1">
                                    <IoIosCalendar color="#ffffff" fontSize="20px" />
                                </Button>
                                <UncontrolledTooltip placement="bottom" target={'Tooltip-1'}>
                                    Click for Toastify Notifications!
                                </UncontrolledTooltip>
                            </div> */}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default UserBox;