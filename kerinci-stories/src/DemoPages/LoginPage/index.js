import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// USER PAGES

import Login from './Login';


const UserPages = ({match}) => (
    <Fragment>
        <div className="app-container">

            {/* User Pages */}

            <Route path={`${match.url}/login`} component={Login}/>
            
        </div>
    </Fragment>
);

export default UserPages;