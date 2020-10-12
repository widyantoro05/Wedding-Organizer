import React, { Component, Fragment } from 'react';

import {
    Breadcrumb, BreadcrumbItem
} from 'reactstrap';

import {
    faHome

} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class TitleComponent3 extends Component {

    render() {
        let { heading } = this.props;
        return (
            <Fragment>
                <Breadcrumb color="white">
                    <BreadcrumbItem><a href="#/user/openingpage" >
                        <FontAwesomeIcon icon={faHome} color="white" size="lg" /></a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <a href="#/user/openingpage" onClick={(e) => e.preventDefault()} style={{ color: "white", fontSize: "18px" }}>Home</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem active style={{ color: "white", fontSize: "18px" }}>{heading}</BreadcrumbItem>
                </Breadcrumb>
            </Fragment>
        );
    }
}