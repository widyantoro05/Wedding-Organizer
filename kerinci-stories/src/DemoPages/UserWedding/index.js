import React, { Fragment, useState } from 'react';
import { Route } from 'react-router-dom';

// Pages

import DecorPage from './Decor/';
import VenuePage from './Venue';
import PhotoPage from './Photo';
import CateringPage from './Catering';
import DamPage from './Dam';
import SearchPage from './SearchPage';
import OpeningPage from './OpeningPage';


// Layout
import AppHeader from '../../Layout/AppHeader/';
import AppFooter from '../../Layout/AppFooter/';
import Footer from './OpeningPage/Footer';
import { Container } from 'reactstrap';
// Theme Options

// import ThemeOptions from '../../Layout/ThemeOptions/';


const UserPages = ({ match }) => {
    const [searchPass, setsearchPass] = useState('');
    // const handlePassSearch = async (search) => {
    //     // let searchPass = search;
    //     setsearchPass(search);
    //     console.log(searchPass);
    // };

    const handlePassSearch = (search) => {
        // let searchPass = search;
        setsearchPass(search);
        console.log(searchPass);
    };

    return (
        <Fragment>
            {/* <ThemeOptions /> */}
            <AppHeader passingSearch={handlePassSearch} />
            <div className="app-main">
                <div className="app-main__inner">

                    {/* UserPages or Products */}

                    <Route path={`${match.url}/decor`} component={DecorPage} />
                    <Route path={`${match.url}/venue`} component={VenuePage} />
                    <Route path={`${match.url}/dam`} component={DamPage} />
                    <Route path={`${match.url}/catering`} component={CateringPage} />
                    <Route path={`${match.url}/photo`} component={PhotoPage} />
                    <Route path={`${match.url}/searchpage`} render={(props) => <SearchPage
                        {...props} passingSearch={searchPass}
                    />} />
                    <Route path={`${match.url}/openingpage`} component={OpeningPage} />
                </div>


                <AppFooter />


            </div>
            <Container fluid>
                <Container fluid>
                    <Footer />
                </Container>
            </Container>
            <br />
        </Fragment>
    )
};

export default UserPages;