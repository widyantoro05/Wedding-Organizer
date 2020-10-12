import React, {Fragment} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import CardsAdvanced from './Examples/Advanced';

export default class PhotoPage extends React.Component {

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
                        heading="Photography & Videography"
                        subheading="Capture the precious moments of your wedding"
                        icon="lnr-camera"
                    />
                    <CardsAdvanced/>
                </CSSTransitionGroup>
            </Fragment>
        );
    }
}