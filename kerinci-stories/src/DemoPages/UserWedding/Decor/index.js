import React, {Fragment} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import PageTitle from '../../../Layout/AppMain/PageTitle';

import CardsAdvanced from './Examples/Advanced';

export default class DecorPage extends React.Component {

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
                        heading="Decoration"
                        subheading="Make your dream came true with our decoration."
                        icon="lnr-magic-wand"
                    />
                    <CardsAdvanced/>
                    {/* <Tabs
                        defaultActiveKey="1"
                        renderTabBar={() => <ScrollableInkTabBar/>}
                        renderTabContent={() => <TabContent/>}
                    >
                        <TabPane tab='Advanced' key="1"><CardsAdvanced/></TabPane>
                        <TabPane tab='Basic' key="2"><CardsBasicExample/></TabPane>
                        <TabPane tab='Color States' key="3"><CardsColors/></TabPane>
                        <TabPane tab='Block Loading' key="4"><CardsBlockLoadingExample/></TabPane>
                    </Tabs> */}
                </CSSTransitionGroup>
            </Fragment>
        );
    }
}