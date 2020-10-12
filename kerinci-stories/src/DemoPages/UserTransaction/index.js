import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// USER PAGES
import User from './User/index';
import AppHeader from '../../Layout/AppHeader/';
import AppFooter from '../../Layout/AppFooter/';

// import ThemeOptions from '../../Layout/ThemeOptions/';

const UserTransaction = ({ match }) => (
    <Fragment>
        {/* <ThemeOptions /> */}
        <AppHeader />
        <div className="app-main">
            <div className="app-main__inner">

                <Route path={`${match.url}/user`} component={User} />
            </div>
         
            <AppFooter />
        </div>
    </Fragment>
);

export default UserTransaction;