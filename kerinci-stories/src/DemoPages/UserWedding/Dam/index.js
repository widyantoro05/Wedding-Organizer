import React, { Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import CardsAdvanced from './Examples/Advanced';

export default class DamPage extends React.Component {

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
                        heading="Dress, Attire, and Makeup"
                        subheading="Make them adore you."
                        icon="lnr-shirt"
                    />
                    <CardsAdvanced />
                </CSSTransitionGroup>
            </Fragment>
        );
    }
}