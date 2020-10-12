import React, { Fragment } from 'react';

import {
    Nav, NavLink, NavItem
} from 'reactstrap';

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
                        <NavLink href="#/user/venue">
                            <i className="nav-link-icon lnr-map-marker icon-gradient bg-slick-carbon"> </i>
                            <span>Venue</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/user/decor">
                            <i className="nav-link-icon lnr-magic-wand icon-gradient bg-slick-carbon"> </i>
                            <span>Decoration</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/user/dam">
                            <i className="nav-link-icon lnr-shirt icon-gradient bg-slick-carbon"> </i>
                            <span>Dress, Attire, and Makeup</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/user/catering">
                            <i className="nav-link-icon lnr-dinner icon-gradient bg-slick-carbon"> </i>
                            <span>Catering</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/user/photo">
                            <i className="nav-link-icon lnr-camera icon-gradient bg-slick-carbon"> </i>
                            <span>Photography & Videography</span>
                        </NavLink>
                    </NavItem>
                </Nav>
            </Fragment>
        )
    }
}

export default MegaMenu;
