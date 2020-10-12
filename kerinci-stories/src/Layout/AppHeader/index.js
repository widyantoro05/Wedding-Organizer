import React, { Fragment } from 'react';
import cx from 'classnames';

import { connect } from 'react-redux';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import HeaderLogo from '../AppLogo';
//import KerinciLogo from './Components/KerinciStoriesLogo.png'

import SearchBox from './Components/SearchBox';
import MegaMenu from './Components/MegaMenu';
import UserBoxOut from './Components/UserBox';
import UserBoxIn from '../AppHeaderAdmin/Components/UserBox';
import HeaderRightDrawer from "./Components/HeaderRightDrawer";

import HeaderDots from "./Components/HeaderDots";

class Header extends React.Component {
    handlePassSearch = (search) => {
        this.props.passingSearch(search);
        console.log(search);
    };

    render() {
        let {
            headerBackgroundColor,
            enableMobileMenuSmall,
            enableHeaderShadow
        } = this.props;
        return (
            <Fragment>
                <CSSTransitionGroup
                    component="div"
                    className={cx("app-header", headerBackgroundColor, { 'header-shadow': enableHeaderShadow })}
                    transitionName="HeaderAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={false}
                    transitionLeave={false}>

                    <HeaderLogo />
                    {/* <KerinciLogo/> */}

                    <div className={cx(
                        "app-header__content",
                        { 'header-mobile-open': enableMobileMenuSmall },
                    )}>
                        <div className="app-header-left">
                            <SearchBox passingSearch={this.handlePassSearch} />
                            <MegaMenu />
                        </div>
                        <div className="app-header-right">
                            <HeaderDots />
                            {/* <UserBox/> */}
                            {(function () {
                                if (localStorage.getItem('loginstatus') === 'false') {
                                    return <UserBoxOut />;
                                } else {
                                    return <UserBoxIn />;
                                }
                            })()}
                            <HeaderRightDrawer />
                        </div>
                    </div>
                </CSSTransitionGroup>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
    closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
    headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
    enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);