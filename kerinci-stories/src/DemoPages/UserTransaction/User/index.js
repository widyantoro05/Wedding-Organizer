import React, {Fragment} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import PageTitle from '../../../Layout/AppMain/PageTitle';

import {Col,Row} from 'reactstrap';

import FormUser from './componen/FormUser';
import UserPlanning from './componen/UserPlanning';

export default class User extends React.Component {

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
                    <PageTitle
                        heading="User Transaction"
                        subheading="Wide selection of cards with multiple styles, borders, actions and hover effects."
                        icon="pe-7s-id"
                    />
                    <Row>
                        <Col lg="6" md="12">
                            <UserPlanning/>
                        </Col>
                            
                        <Col lg="6" md="12">
                            <FormUser/>
                        </Col>
                    </Row>
                    
                </CSSTransitionGroup>
            </Fragment>
        );
    }
}