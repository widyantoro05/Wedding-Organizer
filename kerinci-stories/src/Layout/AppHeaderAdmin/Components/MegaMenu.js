import React, { Fragment } from 'react';

import {
    Nav, NavLink,  NavItem
} from 'reactstrap';

// import PerfectScrollbar from 'react-perfect-scrollbar';

// import bg2 from '../../../assets/utils/images/dropdown-header/abstract2.jpg';
// import bg3 from '../../../assets/utils/images/dropdown-header/abstract3.jpg';

// import {
//     faAngleDown,

// } from '@fortawesome/free-solid-svg-icons';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MegaMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            popoverOpen: false,
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            popoverOpen: !this.state.popoverOpen

        });
    }

    state = {};

    render() {
        return (
            <Fragment>
                <Nav className="header-megamenu">
                    <NavItem>
                        <NavLink href="#/adminpage/bookedlist">
                            <i className="nav-link-icon lnr-book icon-gradient bg-slick-carbon"> </i>
                            <span>Booked List</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/adminpage/productinput">
                            <i className="nav-link-icon lnr-cloud-download icon-gradient bg-slick-carbon"> </i>
                            <span>Product Input</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/adminpage/staff">
                            <i className="nav-link-icon lnr-users icon-gradient bg-slick-carbon"> </i>
                            <span>Staff</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/adminpage/assignment">
                            <i className="nav-link-icon lnr-calendar-full icon-gradient bg-slick-carbon"> </i>
                            <span>Staff Assignment</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/adminpage/register">
                            <i className="nav-link-icon lnr-users icon-gradient bg-slick-carbon"> </i>
                            <span>Admin Register</span>
                        </NavLink>
                    </NavItem>
                    {/* <Popover className="rm-max-width" placement="bottom-start" fade={false} trigger="legacy" isOpen={this.state.popoverOpen} target="PopoverMegaMenu"
                        toggle={this.toggle}>
                        <div className="dropdown-mega-menu">
                            <div className="grid-menu grid-menu-col">
                                <Row className="no-gutters">
                                    <Col xl="4" sm="6">
                                        <Nav vertical>
                                            <NavItem className="nav-item-header">
                                                Menu
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#/user/venue">
                                                    <i className="nav-link-icon lnr-inbox"> </i>
                                                    <span>Venue</span>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#/user/decor">
                                                    <i className="nav-link-icon lnr-book"> </i>
                                                    <span>Decor</span>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#/user/dam">
                                                    <i className="nav-link-icon lnr-picture"> </i>
                                                    <span>Dress and Makeup</span>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#/user/catering">
                                                    <i className="nav-link-icon lnr-picture"> </i>
                                                    <span>Catering</span>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#/user/photo">
                                                    <i className="nav-link-icon lnr-picture"> </i>
                                                    <span>Photography</span>
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Popover> */}
                    {/* <UncontrolledButtonDropdown nav inNavbar>
                        <DropdownToggle nav>
                            <div className="badge badge-pill badge-danger ml-0 mr-2">4</div>
                            Settings
                            <FontAwesomeIcon className="ml-2 opacity-5" icon={faAngleDown} />
                        </DropdownToggle>
                        <DropdownMenu className="rm-pointers">
                            <div className="dropdown-menu-header">
                                <div className="dropdown-menu-header-inner bg-secondary">
                                    <div className="menu-header-image opacity-5"
                                        style={{
                                            backgroundImage: 'url(' + bg2 + ')'
                                        }}
                                    ></div>
                                    <div className="menu-header-content">
                                        <h5 className="menu-header-title">Overview</h5>
                                        <h6 className="menu-header-subtitle">Dropdown menus for everyone</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="scroll-area-xs" style={{
                                height: '150px'
                            }}>
                                <PerfectScrollbar>
                                    <DropdownItem header>Key Figures</DropdownItem>
                                    <DropdownItem>Service Calendar</DropdownItem>
                                    <DropdownItem>Knowledge Base</DropdownItem>
                                    <DropdownItem>Accounts</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Products</DropdownItem>
                                    <DropdownItem>Rollup Queries</DropdownItem>
                                </PerfectScrollbar>
                            </div>
                            <Nav vertical>
                                <NavItem className="nav-item-divider" />
                                <NavItem className="nav-item-btn">
                                    <Button size="sm" className="btn-wide btn-shadow"
                                        color="danger">
                                        Cancel
                                    </Button>
                                </NavItem>
                            </Nav>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown> */}
                    {/* <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav>
                            <i className="nav-link-icon pe-7s-settings"> </i>
                            Projects
                            <FontAwesomeIcon className="ml-2 opacity-5" icon={faAngleDown} />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-rounded dropdown-menu-lg rm-pointers">
                            <div className="dropdown-menu-header">
                                <div className="dropdown-menu-header-inner bg-success">
                                    <div className="menu-header-image opacity-1"
                                        style={{
                                            backgroundImage: 'url(' + bg3 + ')'
                                        }}
                                    ></div>
                                    <div className="menu-header-content text-left">
                                        <h5 className="menu-header-title">Overview</h5>
                                        <h6 className="menu-header-subtitle">Unlimited options</h6>
                                        <div className="menu-header-btn-pane">
                                            <Button size="sm" color="dark" className="mr-2">
                                                Settings
                                            </Button>
                                            <Button size="sm" className="btn-icon btn-icon-only" color="warning">
                                                <i className="pe-7s-config btn-icon-wrapper"> </i>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <DropdownItem>
                                <i className="dropdown-icon lnr-file-empty"> </i>
                                Graphic Design
                            </DropdownItem>
                            <DropdownItem>
                                <i className="dropdown-icon lnr-file-empty"> </i>
                                App Development
                            </DropdownItem>
                            <DropdownItem>
                                <i className="dropdown-icon lnr-file-empty"> </i>
                                Icon Design
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                <i className="dropdown-icon lnr-file-empty"> </i>
                                Miscellaneous
                            </DropdownItem>
                            <DropdownItem>
                                <i className="dropdown-icon lnr-file-empty"> </i>
                                Frontend Dev
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown> */}
                </Nav>
            </Fragment>
        )
    }
}

export default MegaMenu;
