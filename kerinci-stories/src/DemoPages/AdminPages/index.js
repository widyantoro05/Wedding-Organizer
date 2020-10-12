import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// Tables

import BookedList from './BookedList';
import ProductInput from './Product Input';
import Assignment from './Assignment';
import Staff from './Staff';
import AdminRegister from './AdminRegister';

// Layout

import AppHeaderAdmin from '../../Layout/AppHeaderAdmin/';
import AppFooter from '../../Layout/AppFooter/';
// import Coba from './coba';

// Theme Options

// import ThemeOptions from '../../Layout/ThemeOptions/';

const AdminPages = ({ match }) => (
    <Fragment>
        {/* <ThemeOptions /> */}
        <AppHeaderAdmin />
        <div className="app-main">

            <div className="app-main__inner">

                {/* AdminPages */}
                {(function () {
                    if (localStorage.getItem('loginstatus') === 'false') {
                        console.log(localStorage.getItem('loginstatus'))
                        return <h1>Access denied!! This is an admin page only. If you're an admin please <a href="#/admin/login">log in</a></h1>;
                    } else {
                        return (<>
                        <Route path={`${match.url}/bookedlist`} component={BookedList} />
                        <Route path={`${match.url}/productinput`} component={ProductInput} />
                        <Route path={`${match.url}/assignment`} component={Assignment} />
                        <Route path={`${match.url}/staff`} component={Staff} />
                        <Route path={`${match.url}/register`} component={AdminRegister} />
                        {/* <Route path={`${match.url}/coba`} component={Coba} /> */}
                        </>);
                    }
                })()}

            </div>
            <AppFooter />

        </div>
    </Fragment>
);

export default AdminPages;