import React, { Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// import Tabs, { TabPane } from 'rc-tabs';
// import TabContent from 'rc-tabs/lib/SwipeableTabContent';
// import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

// Examples
// import CardsBasicExample from './Examples/Basic';
// import CardsColors from './Examples/Colors';
// import CardsBlockLoadingExample from './Examples/Loading';
import CardsAdvanced from './Examples/Advanced';
// import SingleSelect from './Examples/SingleSelect';

export default class VenuePage extends React.Component {

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
                        heading="Venue"
                        subheading="Perfect place for your perfect day"
                        icon="lnr-map-marker"
                    //    className="nav-link-icon lnr-map-marker icon-gradient bg-slick-carbon"

                    />

                    {/* <SingleSelect /> */}
                    {/* <Tabs
                        defaultActiveKey="1"
                        renderTabBar={() => <ScrollableInkTabBar />}
                        renderTabContent={() => <TabContent />}
                    >
                        
                        <TabPane tab='Advanced' key="1"><CardsAdvanced /></TabPane>
                        <TabPane tab='Basic' key="2"><CardsBasicExample /></TabPane>
                        <TabPane tab='Color States' key="3"><CardsColors /></TabPane>
                        <TabPane tab='Block Loading' key="4"><CardsBlockLoadingExample /></TabPane>
                    </Tabs> */}
                    <CardsAdvanced />
                    {/* <CardsBasicExample />
                    <CardsColors />
                    <CardsBlockLoadingExample /> */}
                </CSSTransitionGroup>
            </Fragment>
        );
    }
}