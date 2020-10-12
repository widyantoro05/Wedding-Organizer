import React, { Component, Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {
    TabContent, TabPane, Nav, NavItem, NavLink,
    Card, CardBody, CardHeader, Container
} from 'reactstrap';

import classnames from 'classnames';

import TableInputVenue from './InputVenue/TableInputVenue';
import TableInputDecor from './InputDecor/TableInputDecor';
import TableInputDam from './InputDam/TableInputDam';
import TableInputCatering from './InputCatering/TableInputCatering';
import TableInputPhoto from './InputPhoto/TableInputPhoto';
import PageTitleAdmin from '../../../Layout/AppMain/PageTitleAdmin';


class ProductInput extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            showMore: true,
            transform: true,
            showInkBar: true,
            selectedTabKey: 0,
            transformWidth: 400,
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    
    render() {
        return (
            <Fragment>

                <CSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <PageTitleAdmin
                        heading="Product Input"
                        //subheading="Basic example of a React table with sort, search and filter functionality."
                        icon="lnr-cloud-download"
                    />
                    <Container fluid>
                        {/* <Row> */}
                        <Card tabs="true" className="mb-3">
                            <CardHeader>
                                <Nav justified>
                                    <NavItem>
                                        <NavLink href="#" style={{color:"#76846A"}}
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => {
                                                this.toggle('1');
                                            }}
                                        >
                                            Venue
                                                </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#" style={{color:"#76846A"}}
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => {
                                                this.toggle('2');
                                            }}
                                        >
                                            Decoration
                                                </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#" style={{color:"#76846A"}}
                                            className={classnames({ active: this.state.activeTab === '3' })}
                                            onClick={() => {
                                                this.toggle('3');
                                            }}
                                        >
                                            Dress, Attire, and Makeup
                                                </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#" style={{color:"#76846A"}}
                                            className={classnames({ active: this.state.activeTab === '4' })}
                                            onClick={() => {
                                                this.toggle('4');
                                            }}
                                        >
                                            Catering
                                                </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#" style={{color:"#76846A"}}
                                            className={classnames({ active: this.state.activeTab === '5' })}
                                            onClick={() => {
                                                this.toggle('5');
                                            }}
                                        >
                                            Photography & Videography
                                                </NavLink>
                                    </NavItem>
                                </Nav>
                            </CardHeader>
                            <CardBody>

                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <TableInputVenue />
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <TableInputDecor />
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <TableInputDam />
                                    </TabPane>
                                    <TabPane tabId="4">
                                        <TableInputCatering />
                                    </TabPane>
                                    <TabPane tabId="5">
                                        <TableInputPhoto />
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                        {/* </Row> */}
                    </Container>
                </CSSTransitionGroup>
            </Fragment>
        );
    }
}

export default ProductInput;
