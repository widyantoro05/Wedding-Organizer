import { Route, Redirect} from 'react-router-dom';
import React, {Suspense, lazy, Fragment} from 'react';
import Loader from 'react-loaders'

import {
    ToastContainer,
} from 'react-toastify';

const LoginPage= lazy(() => import('../../DemoPages/LoginPage'));
const UserPages = lazy(() => import('../../DemoPages/UserWedding'));
const AdminPages = lazy(() => import('../../DemoPages/AdminPages'));

const UserTransaction = lazy(() => import('../../DemoPages/UserTransaction'));
// const Dashboards = lazy(() => import('../../DemoPages/Dashboards'));

// const Widgets = lazy(() => import('../../DemoPages/Widgets'));
// const Elements = lazy(() => import('../../DemoPages/Elements'));
// const Components = lazy(() => import('../../DemoPages/Components'));
// const Charts = lazy(() => import('../../DemoPages/Charts'));
// const Forms = lazy(() => import('../../DemoPages/Forms'));
// const Tables = lazy(() => import('../../DemoPages/Tables'));

const AppMain = () => {

    return (
        <Fragment>

            {/* UserPages */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <div className="text-center">
                            <Loader type="semi-circle-spin"/>
                        </div>
                        <h6 className="mt-3">
                            Welcome to Kerinci Stories
                            <small>Please wait...</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/user" component={UserPages}/>
            </Suspense>

            {/* LoginPage */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <div className="text-center">
                            <Loader type="semi-circle-spin"/>
                        </div>
                        <h6 className="mt-3">
                            You're going to the login page
                            <small>Please wait...</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/admin" component={LoginPage}/>
            </Suspense>

            {/* AdminPages */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <div className="text-center">
                            <Loader type="semi-circle-spin"/>
                        </div>
                        <h6 className="mt-3">
                            You're entering admin page
                            <small>Please wait...</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/adminpage" component={AdminPages}/>
            </Suspense>
            
            {/* AdminPages */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <div className="text-center">
                            <Loader type="semi-circle-spin"/>
                        </div>
                        <h6 className="mt-3">
                            Your booking form will show up in a minute
                            <small>Please wait...</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/usertransaction" component={UserTransaction}/>
            </Suspense>



            <Route exact path="/" render={() => (
                <Redirect to="/user/openingpage"/>
            )}/>
            <ToastContainer/>
        </Fragment>
    )
};

export default AppMain;