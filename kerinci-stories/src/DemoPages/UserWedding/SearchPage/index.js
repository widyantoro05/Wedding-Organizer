import React, { Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

// import PageTitle from '../../../Layout/AppMain/PageTitle';

// import Tabs, { TabPane } from 'rc-tabs';
// import TabContent from 'rc-tabs/lib/SwipeableTabContent';
// import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

// Examples
// import CardsBasicExample from './Examples/Basic';
// import CardsColors from './Examples/Colors';
// import CardsBlockLoadingExample from './Examples/Loading';
import CardsAdvanced from './Examples/Advanced';
// import SingleSelect from './Examples/SingleSelect';
// import image from '../../../assets/utils/images/emptysearchlogo.png'

export default class SearchPage extends React.Component {
    state = {
        search: ""
    }
    constructor(props) {
        super(props);

        // console.log(this.props);
        // this.handlePassSearch();
        // console.log(this.props.passingSearch);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
    }

    componentDidMount() {
        this.handleChangeSearch();
    }

    handleChangeSearch = () => {
        console.log('masuk sini')
        // console.log(this.props.passingSearch);
        this.setState({ search: this.props.passingSearch }, () => console.log(this.state.search));
        // console.log(this.state.search);
    };

    render(props) {
        return (<div key={this.props.passingSearch}>
            <Fragment>
                <CSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    {/* <PageTitle
                        heading="Search"
                        subheading="Wide selection of cards with multiple styles, borders, actions and hover effects."
                        icon="pe-7s-stopwatch icon-gradient bg-happy-itmeo"
                    /> */}

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
                    {/* {this.props.passingSearch ?
                        <CardsAdvanced passingSearch={this.props.passingSearch} />
                        :
                        <div className="text-center">
                            <br /><br />
                            <img src={image} style={{ width: '60%', height: 'auto', alignSelf: 'center' }}>
                            </img>
                        </div>
                    } */}
                    <CardsAdvanced passingSearch={this.props.passingSearch} />

                    {/* <CardsBasicExample />
                    <CardsColors />
                    <CardsBlockLoadingExample /> */}
                </CSSTransitionGroup>
            </Fragment>
        </div>
        );
    }
}