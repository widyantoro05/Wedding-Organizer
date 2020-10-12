import React, { Component, Fragment } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
// import classnames from 'classnames';
// import Tabs from 'react-responsive-tabs';
// import icon from '../../../../assets/icon.css';
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';

import {
    Row, Col,
    Card, CardBody,
    CardFooter,
    Button, Container,
} from 'reactstrap';
// import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart,

} from '@fortawesome/free-solid-svg-icons';
import image from '../../../../assets/utils/images/emptysearchlogo.png'


class CardsAdvanced extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            selectedPrice: null,
            min: null,
            max: null,
            key: 0,
            grey: true,
            venues: [],
            decor: [],
            dam: [],
            photos: [],
            catering: []
        };
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
    }

    componentDidMount() {
        console.log(this.props.passingSearch)
        this.handleChangeSearch(this.props.passingSearch);
    }



    setDataVenue = (dat) => {
        if (localStorage.getItem('keyVenue') == dat.idVenue && localStorage.getItem('greyVenue') == 'true') {
            localStorage.removeItem('venue')
            localStorage.removeItem('keyVenue')
            localStorage.setItem('greyVenue', false)
            this.componentDidMount()
        } else {
            localStorage.removeItem('keyVenue')
            localStorage.removeItem('greyVenue')
            localStorage.removeItem('venue')
            localStorage.setItem('keyVenue', dat.idVenue)
            localStorage.setItem('greyVenue', true)
            localStorage.setItem('venue', JSON.stringify(dat))
            this.componentDidMount()
        }
    }
    setDataDecor = (dat) => {
        if (localStorage.getItem('keyDecor') == dat.idDecor && localStorage.getItem('greyDecor') == 'true') {
            localStorage.removeItem('decor')
            localStorage.removeItem('keyDecor')
            localStorage.setItem('greyDecor', false)
            this.componentDidMount()
        } else {
            localStorage.removeItem('keyDecor')
            localStorage.removeItem('greyDecor')
            localStorage.removeItem('decor')
            localStorage.setItem('keyDecor', dat.idDecor)
            localStorage.setItem('greyDecor', true)
            localStorage.setItem('decor', JSON.stringify(dat))
            this.componentDidMount()
        }
    }
    setDataDam = (dat) => {
        if (localStorage.getItem('keyDam') == dat.idDam && localStorage.getItem('greyDam') == 'true') {
            localStorage.removeItem('dam')
            localStorage.removeItem('keyDam')
            localStorage.setItem('greyDam', false)
            this.componentDidMount()
        } else {
            localStorage.removeItem('keyDam')
            localStorage.removeItem('greyDam')
            localStorage.removeItem('dam')
            localStorage.setItem('keyDam', dat.idDam)
            localStorage.setItem('greyDam', true)
            localStorage.setItem('dam', JSON.stringify(dat))
            this.componentDidMount()
        }
    }
    setDataPhoto = (dat) => {
        if (localStorage.getItem('keyPhoto') == dat.idPhoto && localStorage.getItem('greyPhoto') == 'true') {
            localStorage.removeItem('photo')
            localStorage.removeItem('keyPhoto')
            localStorage.setItem('greyPhoto', false)
            this.componentDidMount()
        } else {
            localStorage.removeItem('keyPhoto')
            localStorage.removeItem('greyPhoto')
            localStorage.removeItem('photo')
            localStorage.setItem('keyPhoto', dat.idPhoto)
            localStorage.setItem('greyPhoto', true)
            localStorage.setItem('photo', JSON.stringify(dat))
            this.componentDidMount()
        }
    }
    setDataCatering = (dat) => {
        if (
            localStorage.getItem("keyCatering") == dat.idCatering &&
            localStorage.getItem("greyCatering") == "true"
        ) {
            localStorage.removeItem("catering");
            localStorage.removeItem("keyCatering");
            localStorage.setItem("greyCatering", false);
            this.componentDidMount();
        } else {
            localStorage.removeItem("keyCatering");
            localStorage.removeItem("greyCatering");
            localStorage.removeItem("catering");
            localStorage.setItem("keyCatering", dat.idCatering);
            localStorage.setItem("greyCatering", true);
            localStorage.setItem("catering", JSON.stringify(dat));
            this.componentDidMount();
        }
    }


    searchAll = async (name) => {
        if (name !== "") {
            await axios
                .get("http://localhost:1212//v1/app/venue/randomname?nameVenue=" + name)
                .then((response) => response.data)
                .then((data) => {
                    this.setState({ venues: data.data });
                    console.log(this.state.venues)
                });
            await axios
                .get("http://localhost:1212//v1/app/decor/randomname?nameDecor=" + name)
                .then((response) => response.data)
                .then((data) => {
                    this.setState({ decor: data.data });
                    console.log(this.state.decor)
                });
            await axios
                .get("http://localhost:1212//v1/app/dam/randomname?nameDam=" + name)
                .then((response) => response.data)
                .then((data) => {
                    this.setState({ dam: data.data });
                    console.log(this.state.dam)
                });
            await axios
                .get("http://localhost:1212//v1/app/photo&video/randomname?namePhoto=" + name)
                .then((response) => response.data)
                .then((data) => {
                    this.setState({ photos: data.data });
                    console.log(this.state.photos)
                });
            await axios
                .get("http://localhost:1212//v1/app/catering/randomname?nameCatering=" + name)
                .then((response) => response.data)
                .then((data) => {
                    this.setState({ catering: data.data });
                    console.log(this.state.catering)
                });
        }
        // console.log(name + "isi")
        // console.log(this.state.venues)
    };

    handleChangeSearch = async (event) => {
        await this.setState({ search: event }, () => {
            this.searchAll(this.state.search);
        });
    };


    render() {
        const { venues, decor, dam, catering, photos } = this.state;
        return (
            <Fragment>
                <CSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Container>
                        <br />
                        {venues.length || decor.length || dam.length || catering.length || photos.lengths ?
                            <>
                                <Row>
                                    {/* Venue */}
                                    {
                                        this.state.venues ?
                                            this.state.venues.map(
                                                (venue, index) => (
                                                    <Col lg="3" md="6" sm="12" key={venue.idVenue} style={{ display: "inline-grid" }}>
                                                        <Card className="card-hover-shadow-2x mb-3">
                                                            <img className="d-block"
                                                                src={`http://localhost:1212/v1/app/downloadFile/${venue.imageVenue}`} alt={venue.nameVenue}
                                                                style={{ width: "100%", height: "255px", objectFit: "cover" }} />
                                                            <CardBody>
                                                                <h5 className='text-center' style={{ fontWeight: "500" }}>{venue.nameVenue}</h5>
                                                                <hr />
                                                                <p className='text-center'>
                                                                    <i className="nav-link-icon lnr-map-marker icon-gradient bg-slick-carbon "> </i>
                                                                    <span>{venue.location}</span></p>
                                                                <p className='text-center'>{venue.ambiance} </p>
                                                                <p className='text-center'>{venue.capacity} People</p>
                                                                <p className='text-center'>{venue.detailVenue}</p>
                                                            </CardBody>
                                                            <CardFooter className="d-block">
                                                                <div>
                                                                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                                                        <CurrencyFormat value={venue.priceVenue} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} />
                                                                    </span>
                                                                    <Button style={{ float: "right", backgroundColor: "transparent", border: "none" }} onClick={() => this.setDataVenue(venue)}>
                                                                        <FontAwesomeIcon icon={faHeart} color={venue.idVenue == parseInt(localStorage.getItem('keyVenue')) ? "red" : "grey"} size="lg" />
                                                                    </Button>
                                                                </div>
                                                            </CardFooter>
                                                        </Card>
                                                    </Col>
                                                )
                                            )
                                            : ""
                                    }
                                    {/* Decor */}
                                    {this.state.decor ?
                                        this.state.decor.map((decor, index) => (
                                            <Col lg="3" md="6" sm="12" key={decor.idDecor} style={{ display: "inline-grid" }}>
                                                <Card className="card-hover-shadow-2x mb-3">
                                                    <img className="d-block"
                                                        src={`http://localhost:1212/v1/app/downloadFile/${decor.imageDecor}`} alt={decor.nameDecor}
                                                        style={{ width: "100%", height: "255px", objectFit: "cover" }} />
                                                    <CardBody>
                                                        <h5 className='text-center' style={{ fontWeight: "500" }}>{decor.nameDecor}</h5>
                                                        <hr />
                                                        <p className='text-center'>Style: {decor.styleDecor}</p>
                                                        <p className='text-center'>{decor.detailDecor}</p>
                                                    </CardBody>
                                                    <CardFooter className="d-block">
                                                        <div>
                                                            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                                                <CurrencyFormat value={decor.priceDecor} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} />
                                                            </span>
                                                            <Button style={{ float: "right", backgroundColor: "transparent", border: "none" }} onClick={() => this.setDataDecor(decor)}>
                                                                <FontAwesomeIcon icon={faHeart} color={decor.idDecor == parseInt(localStorage.getItem('keyDecor')) ? "red" : "grey"} size="lg" />
                                                            </Button>
                                                        </div>
                                                    </CardFooter>
                                                </Card>
                                            </Col>
                                        )) : ""}
                                    {/* Dam */}
                                    {this.state.dam ?
                                        this.state.dam.map((dam, index) => (
                                            <Col lg="3" md="6" sm="12" key={dam.idDam} style={{ display: "inline-grid" }}>
                                                <Card className="card-hover-shadow-2x mb-3">
                                                    <img className="d-block"
                                                        src={`http://localhost:1212/v1/app/downloadFile/${dam.imageDam}`} alt={dam.nameDam}
                                                        style={{ width: "100%", height: "255px", objectFit: "cover" }} />
                                                    <CardBody>
                                                        <h5 className='text-center' style={{ fontWeight: "500" }}>{dam.nameDam}</h5>
                                                        <hr />
                                                        <p className='text-center'>Style: {dam.styleDam}</p>
                                                        <p className='text-center'>{dam.detailDam}</p>
                                                    </CardBody>
                                                    <CardFooter className="d-block">
                                                        <div>
                                                            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                                                <CurrencyFormat value={dam.priceDam} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} />
                                                            </span>
                                                            <Button style={{ float: "right", backgroundColor: "transparent", border: "none" }} onClick={() => this.setDataDam(dam)}>
                                                                <FontAwesomeIcon icon={faHeart} color={dam.idDam == parseInt(localStorage.getItem('keyDam')) ? "red" : "grey"} size="lg" />
                                                            </Button>
                                                        </div>
                                                    </CardFooter>
                                                </Card>
                                            </Col>
                                        )) : ""}
                                    {/* Photos&Videos */}
                                    {
                                        this.state.photos ?
                                            this.state.photos.map(
                                                (photo, index) => (
                                                    <Col lg="3" md="6" sm="12" key={index} style={{ display: "inline-grid" }}>
                                                        <Card className="card-hover-shadow-2x mb-3">
                                                            <img className="d-block"
                                                                src={`http://localhost:1212/v1/app/downloadFile/${photo.imagePhoto}`} alt="coba"
                                                                style={{ width: "100%", height: "255px", objectFit: "cover" }} />
                                                            <CardBody>
                                                                <h5 className='text-center' style={{ fontWeight: "500" }}>{photo.namePhoto}</h5>
                                                                <hr />
                                                                <p className='text-center'>Theme : {photo.themePhoto} </p>
                                                                <p className='text-center'>{photo.detailPhoto}</p>

                                                            </CardBody>
                                                            <CardFooter className="d-block">
                                                                <div>
                                                                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                                                        <CurrencyFormat value={photo.pricePhoto} displayType={'text'} thousandSeparator={true} prefix={'IDR. '} />
                                                                    </span>

                                                                    <Button style={{ float: "right", backgroundColor: "transparent", border: "none" }} onClick={() => this.setDataPhoto(photo)}>
                                                                        <FontAwesomeIcon icon={faHeart} color={photo.idPhoto == parseInt(localStorage.getItem('keyPhoto')) ? "red" : "grey"} size="lg" />
                                                                    </Button>
                                                                </div>
                                                            </CardFooter>
                                                        </Card>
                                                    </Col>
                                                )
                                            )
                                            : ""
                                    }
                                    {/* Catering */}
                                    {this.state.catering
                                        ? this.state.catering.map((c, index) => (
                                            <Col md="3" key={index}>
                                                <Card className="card-hover-shadow-2x mb-3">
                                                    <img
                                                        src={`http://localhost:1212/v1/app/downloadFile/${c.imageCatering}`}
                                                        alt={c.nameCatering}
                                                        style={{
                                                            width: "100%",
                                                            height: "255px",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                    <CardBody>
                                                        <h5
                                                            className="text-center"
                                                            style={{ fontWeight: "500" }}
                                                        >
                                                            {c.nameCatering}
                                                        </h5>
                                                        <hr />
                                                        <p className="text-center">{c.styleCatering}</p>
                                                        <hr />
                                                        <p className="text-center">
                                                            {c.portionCatering} Portions</p>
                                                        <p className="text-center">{c.detailCatering}</p>
                                                    </CardBody>
                                                    <CardFooter className="d-block">
                                                        <div>
                                                            <span
                                                                style={{ fontSize: "18px", fontWeight: "bold" }}
                                                            >
                                                                <CurrencyFormat
                                                                    value={c.priceCatering}
                                                                    displayType={"text"}
                                                                    thousandSeparator={true}
                                                                    prefix={"IDR. "}
                                                                />
                                                            </span>
                                                            <Button
                                                                style={{
                                                                    float: "right",
                                                                    backgroundColor: "transparent",
                                                                    border: "none",
                                                                }}
                                                                onClick={() => this.setData(c)}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={faHeart}
                                                                    color={
                                                                        c.idCatering ===
                                                                            parseInt(localStorage.getItem("keyCatering"))
                                                                            ? "red"
                                                                            : "grey"
                                                                    }
                                                                    size="lg"
                                                                />
                                                            </Button>
                                                        </div>
                                                    </CardFooter>
                                                </Card>
                                            </Col>
                                        ))
                                        : ""}
                                </Row>
                            </>
                            :
                            <div className="text-center">
                                <br /><br />
                                <img src={image} style={{ width: '60%', height: 'auto', alignSelf: 'center' }} alt="">
                                </img>
                            </div>
                        }
                    </Container>
                </CSSTransitionGroup>
                <br />
                <br />
                <br />
                <br />
            </Fragment>
        );
    }
}


export default CardsAdvanced;